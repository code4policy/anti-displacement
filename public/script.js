// State management
let currentState = {
  userType: null,
  openSection: null,
  previousSteps: [],
  currentStep: 'initial'
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

// Toggle dropdown sections
function toggleSection(section) {
  if (!currentState.openSections) {
    currentState.openSections = new Set();
  }
  
  // Close all other sections when opening a new one
  if (!currentState.openSections.has(section)) {
    currentState.openSections.clear();
    currentState.openSections.add(section);
  } else {
    currentState.openSections.delete(section);
  }
  updateView();
}

// Close specific section
function closeSection(section) {
  if (currentState.openSections && currentState.openSections.has(section)) {
    currentState.openSections.delete(section);
    updateView();
  }
}

// Update view based on current state
function updateView() {
  if (currentState.userType === null) {
    showInitialScreen();
    return;
  }

  if (currentState.userType === 'renter') {
    showRenterMainConcern();
  } else {
    showHomeownerMainConcern();
  }
}

// User Type Selection
function selectUserType(type) {
  currentState.userType = type;
  currentState.previousSteps.push('initial');
  currentState.currentStep = 'mainConcern';
  updateView();
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
    <div class="dropdown-container">
      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('knowingRights')">
            Knowing My Rights
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('knowingRights')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('knowingRights') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link">Know Your Rights</a>
            <a href="#" class="resource-link">Free Legal Clinics</a>
          </div>
        </div>
      </div>

      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('stoppingEviction')">
            Stopping Eviction
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('stoppingEviction')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('stoppingEviction') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link">Help for Tenants Facing Eviction</a>
          </div>
        </div>
      </div>

      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('findingPlace')">
            Finding a Place to Live
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('findingPlace')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('findingPlace') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link" onclick="showHousingOption('emergencyShelter')">Emergency Shelter</a>
            <a href="#" class="resource-link" onclick="showHousingOption('findingRent')">Finding a Place to Rent</a>
          </div>
        </div>
      </div>

      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('buyingHome')">
            Buying a Home
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('buyingHome')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('buyingHome') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link" onclick="showFinancialSupport(true)">Yes, I need financial support</a>
            <a href="#" class="resource-link" onclick="showFinancialSupport(false)">No, I don't need financial support</a>
          </div>
        </div>
      </div>

      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('needingMoney')">
            Needing More $
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('needingMoney')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('needingMoney') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link">Job Training</a>
            <a href="#" class="resource-link">1-on-1 Financial Coaching</a>
            <a href="#" class="resource-link">Financial Workshops</a>
          </div>
        </div>
      </div>
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
      <div class="links-container">
        <a href="#" class="resource-link" onclick="showHousingOption('emergencyShelter')">Emergency Shelter</a>
        <a href="#" class="resource-link" onclick="showHousingOption('findingRent')">Finding a Place to Rent</a>
      </div>
      ${renderBackButton()}
    `,
    buyingHome: `
      <h2>Buying a Home</h2>
      <div class="links-container">
        <a href="#" class="resource-link" onclick="showFinancialSupport(true)">Yes, I need financial support</a>
        <a href="#" class="resource-link" onclick="showFinancialSupport(false)">No, I don't need financial support</a>
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
    <div class="dropdown-container">
      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('homeImprovement')">
            Home Improvement
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('homeImprovement')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('homeImprovement') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link">Home Repair Loans</a>
            <a href="#" class="resource-link">Additional Dwelling Unit</a>
          </div>
        </div>
      </div>

      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('stoppingForeclosure')">
            Stopping a Foreclosure
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('stoppingForeclosure')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('stoppingForeclosure') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link">Foreclosure Prevention</a>
            <a href="#" class="resource-link">Hardship Tax Exemption</a>
          </div>
        </div>
      </div>

      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('seniorSupport')">
            I'm a Senior and Need Support
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('seniorSupport')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSections && currentState.openSections.has('seniorSupport') ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link">New Heating System</a>
            <a href="#" class="resource-link">Senior Home Repair</a>
            <a href="#" class="resource-link">Property Tax Work-Off</a>
          </div>
        </div>
      </div>

      <div class="dropdown-section">
        <div class="dropdown-header">
          <button class="dropdown-toggle" onclick="toggleSection('needingMoney')">
            Needing More $
            <span class="arrow">▼</span>
          </button>
          <span class="close-arrow" onclick="closeSection('needingMoney')">×</span>
        </div>
        <div class="dropdown-content ${currentState.openSection === 'needingMoney' ? 'open' : ''}">
          <div class="links-container">
            <a href="#" class="resource-link">Job Training</a>
            <a href="#" class="resource-link">1-on-1 Financial Coaching</a>
            <a href="#" class="resource-link">Financial Workshops</a>
          </div>
        </div>
      </div>
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
