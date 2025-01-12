// State management
let currentState = {
  userType: null,
  currentStep: 'initial',
  previousSteps: []
};

// DOM Elements
const flowContainer = document.querySelector('.flow-container');

// Initial State
function showInitialScreen() {
  flowContainer.innerHTML = `
    <h2>Who are you?</h2>
    <div class="button-group">
      <button onclick="selectUserType('renter')">Renter</button>
      <button onclick="selectUserType('homeowner')">Homeowner</button>
    </div>
  `;
}

// User Type Selection
function selectUserType(type) {
  currentState.userType = type;
  currentState.previousSteps.push('initial');
  currentState.currentStep = 'mainConcern';
  showMainConcernScreen();
}

// Main Concern Screens
function showMainConcernScreen() {
  if (currentState.userType === 'renter') {
    showRenterMainConcern();
  } else {
    showHomeownerMainConcern();
  }
}

// Renter Flow
function showRenterMainConcern() {
  flowContainer.innerHTML = `
    <h2>What's on your mind?</h2>
    <div class="button-group">
      <button onclick="showRenterSection('knowingRights')">Knowing My Rights</button>
      <button onclick="showRenterSection('stoppingEviction')">Stopping Eviction</button>
      <button onclick="showRenterSection('findingPlace')">Finding a Place to Live</button>
      <button onclick="showRenterSection('buyingHome')">Buying a Home</button>
      <button onclick="showRenterSection('needingMoney')">Needing More $</button>
    </div>
    ${renderBackButton()}
  `;
}

function showRenterSection(section) {
  currentState.previousSteps.push('mainConcern');
  currentState.currentStep = section;
  
  const sections = {
    knowingRights: `
      <h2>Knowing My Rights</h2>
      <div class="links-container">
        <a href="#" class="resource-link">Know Your Rights</a>
        <a href="#" class="resource-link">Free Legal Clinics</a>
      </div>
      ${renderBackButton()}
    `,
    stoppingEviction: `
      <h2>Stopping Eviction</h2>
      <div class="links-container">
        <a href="#" class="resource-link">Help for Tenants Facing Eviction</a>
      </div>
      ${renderBackButton()}
    `,
    findingPlace: `
      <h2>Finding a Place to Live</h2>
      <div class="button-group">
        <button onclick="showHousingOption('emergencyShelter')">Emergency Shelter</button>
        <button onclick="showHousingOption('findingRent')">Finding a Place to Rent</button>
      </div>
      ${renderBackButton()}
    `,
    buyingHome: `
      <h2>Buying a Home</h2>
      <div class="button-group">
        <button onclick="showFinancialSupport(true)">Yes, I need financial support</button>
        <button onclick="showFinancialSupport(false)">No, I don't need financial support</button>
      </div>
      ${renderBackButton()}
    `,
    needingMoney: `
      <h2>Needing More $</h2>
      <div class="links-container">
        <a href="#" class="resource-link">Job Training</a>
        <a href="#" class="resource-link">1-on-1 Financial Coaching</a>
        <a href="#" class="resource-link">Financial Workshops</a>
      </div>
      ${renderBackButton()}
    `
  };
  
  flowContainer.innerHTML = sections[section];
}

// Homeowner Flow
function showHomeownerMainConcern() {
  flowContainer.innerHTML = `
    <h2>What's on your mind?</h2>
    <div class="button-group">
      <button onclick="showHomeownerSection('homeImprovement')">Home Improvement</button>
      <button onclick="showHomeownerSection('stoppingForeclosure')">Stopping a Foreclosure</button>
      <button onclick="showHomeownerSection('seniorSupport')">I'm a Senior and Need Support</button>
      <button onclick="showHomeownerSection('needingMoney')">Needing More $</button>
    </div>
    ${renderBackButton()}
  `;
}

function showHomeownerSection(section) {
  currentState.previousSteps.push('mainConcern');
  currentState.currentStep = section;
  
  const sections = {
    homeImprovement: `
      <h2>Home Improvement</h2>
      <div class="links-container">
        <a href="#" class="resource-link">Home Repair Loans</a>
        <a href="#" class="resource-link">Additional Dwelling Unit</a>
      </div>
      ${renderBackButton()}
    `,
    stoppingForeclosure: `
      <h2>Stopping a Foreclosure</h2>
      <div class="links-container">
        <a href="#" class="resource-link">Foreclosure Prevention</a>
        <a href="#" class="resource-link">Hardship Tax Exemption</a>
      </div>
      ${renderBackButton()}
    `,
    seniorSupport: `
      <h2>Senior Support</h2>
      <div class="links-container">
        <a href="#" class="resource-link">New Heating System</a>
        <a href="#" class="resource-link">Senior Home Repair</a>
        <a href="#" class="resource-link">Property Tax Work-Off</a>
      </div>
      ${renderBackButton()}
    `,
    needingMoney: `
      <h2>Needing More $</h2>
      <div class="links-container">
        <a href="#" class="resource-link">Job Training</a>
        <a href="#" class="resource-link">1-on-1 Financial Coaching</a>
        <a href="#" class="resource-link">Financial Workshops</a>
      </div>
      ${renderBackButton()}
    `
  };
  
  flowContainer.innerHTML = sections[section];
}

// Helper Functions
function renderBackButton() {
  return `<button class="back-btn" onclick="goBack()">← Back</button>`;
}

function goBack() {
  if (currentState.previousSteps.length > 0) {
    const previousStep = currentState.previousSteps.pop();
    currentState.currentStep = previousStep;
    
    if (previousStep === 'initial') {
      showInitialScreen();
    } else if (previousStep === 'mainConcern') {
      showMainConcernScreen();
    }
  }
}

// Initialize
showInitialScreen();
