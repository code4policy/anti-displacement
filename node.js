require("dotenv").config();
const path = require('path');
const express = require('express');
const OpenAI = require('openai');

// const {OPENAI_API_KEY, ASSISTANT_ID } = process.env;

// Hardcode your credentials here
const OPENAI_API_KEY = "xxxx"; // put your actual key
const ASSISTANT_ID   = "xxx"; // your assistant ID

//const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//const ASSISTANT_ID   = process.env.ASSISTANT_ID;

const app = express();

// Body parsing for form data (since jQuery sends data by default as x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the "public" directory:
app.use(express.static(path.join(__dirname, 'public')));

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// In your code, you used a direct string for the key. Ideally, store in .env:
const assistantId = ASSISTANT_ID;

// We'll store our interval in a variable to clear it later
let pollingInterval;

// =====================
//  Helper Functions
// =====================
async function createThread() {
  console.log('Creating a new thread...');
  const thread = await openai.beta.threads.create();
  return thread;
}

async function addMessage(threadId, message) {
  console.log('Adding user message to thread:', threadId);
  return await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
}

async function runAssistant(threadId) {
  console.log('Running assistant for thread:', threadId);
  return await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
}

async function checkingStatus(res, threadId, runId) {
  console.log('Checking status for run:', runId);
  const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

  const status = runObject.status;
  console.log('Current status:', status);

  if (status === 'completed') {
    clearInterval(pollingInterval);

    // Retrieve all messages from this thread
    const messagesList = await openai.beta.threads.messages.list(threadId);

    // ─────────────────────────────
    // PRINT OUT THE RAW MESSAGES
    // ─────────────────────────────
    console.log("messagesList.body.data:", messagesList.body.data); 
    messagesList.body.data.forEach((m, idx) => {
      console.log(`Message #${idx}: role=${m.role}, content="${m.content}"`);
    });

    /// 2) If your target is always the first message in data[0]:
    const targetMessage = messagesList.body.data[0];
    console.log("Target message is:", JSON.stringify(targetMessage, null, 2));
    //    (adjust if you want a different message, e.g. the most recent one)

    // 3) Extract the first content piece
    const piece = targetMessage.content[0];
    console.log("First content piece is:", JSON.stringify(piece, null, 2));

    // 4) Convert piece.text.value to integer
    //    (like int(...) in Python)
    const finalText = piece.text.value;
    console.log("finalText is:", finalText);

    // 5) Send back as JSON
    //    (Your front-end expects an array of messages, so we’ll wrap it in an array)
    res.json({ messages: [ finalText ] });
  }
}

// ==========================
//         Routes
// ==========================

// 1. Create or get a new thread
app.get('/thread', async (req, res) => {
  try {
    const thread = await createThread();
    res.json({ threadId: thread.id });
  } catch (error) {
    console.error('Error creating thread:', error);
    res.status(500).json({ error: 'Failed to create thread' });
  }
});

// 2. Post a message & get the assistant reply
app.post('/message', async (req, res) => {
  const { message, threadId } = req.body;
  console.log('POST /message => threadId:', threadId, 'message:', message);

  try {
    // Step 1: Add user message
    const newMessage = await addMessage(threadId, message);
    console.log('New user message ID:', newMessage.id);

    // Step 2: Run assistant
    const runResponse = await runAssistant(threadId);
    const runId = runResponse.id;

    // Step 3: Poll for completion every 3s
    pollingInterval = setInterval(() => {
      checkingStatus(res, threadId, runId);
    }, 3000);

  } catch (error) {
    console.error('Error while sending message:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

// ==========================
//    Start the server
// ==========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
