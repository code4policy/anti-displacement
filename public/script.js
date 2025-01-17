// DOM Elements
const renterBtn = document.getElementById('renterBtn');
const homeownerBtn = document.getElementById('homeownerBtn');
const renterSection = document.getElementById('renterSection');
const homeownerSection = document.getElementById('homeownerSection');

// Data for accordion items
const renterData = [
  {
    title: 'Knowing My Rights',
    items: [
      '<a href="https://www.boston.gov/departments/housing/top-ten-things-tenants-and-landlords-need-know" class="hover-bold">Know Your Rights</a>: If you are planning on leasing an apartment in Boston, or becoming a landlord for the first time, this guide can give you an overview of what to expect.',
      '<a href="https://www.boston.gov/calendar/office-housing-stability-virtual-legal-clinic" class="hover-bold">Free Legal Clinics</a>: At this free, virtual clinic, hosted by the Office of Housing Stability, you can speak with attorneys, a landlord tenant mediator, and OHS staff. This staff can assist you with applying for the Rental Relief Fund.'
    ]
  },
  {
    title: 'Stopping Eviction',
    items: [
      '<a href="https://www.boston.gov/departments/housing/office-housing-stability/help-tenants-facing-eviction" class="hover-bold">Help For Tenants Facing Eviction</a>: If you\'ve been threatened with eviction or already received an eviction notice, resources are available to help.'
    ]
  },
  {
    title: 'Financial Assistance',
    items: [
      'Financial Assistance Programs for Renters: Programs are available to provide financial assistance to renters in Boston who are facing a housing crisis.'
    ]
  },
  {
    title: 'Finding an Immediate Place to Live',
    items: [
      '<a href="https://search.boston.gov/departments/housing/services-those-experiencing-homeless" class="hover-bold">Emergency Shelter and Services</a>: If you are homeless or someone you know is homeless, you can contact these organizations for help. Specific services available for veterans, youth, and families.'
    ]
  },
  {
    title: 'Finding a Place to Rent',
    items: [
      '<a href="https://www.boston.gov/metrolist" class="hover-bold">Metrolist</a>: Boston\'s primary resource for income-restricted housing',
      '<a href="https://housingnavigatorma.org/" class="hover-bold">Housing Navigator MA</a>: Search for affordable (income-restricted) rentals across the Commonwealth.',
      '<a href="https://publichousingapplication.ocd.state.ma.us/" class="hover-bold">CHAMP (Common Housing Application for Massachusetts Programs)</a>: Using this site, you will be able to apply for state-aided public housing and state-funded rental vouchers.'
    ]
  },
  {
    title: 'Buying a Home',
    items: [
      '<strong>Financial Support? Yes</strong>',
      '- <a href="https://www.boston.gov/departments/housing/boston-home-center/one-boston-homebuyer-program" class="hover-bold">One+ Boston</a>: This homebuyer program provides low interest mortgages to qualified Boston homebuyers.',
      '- <a href="https://mahahome.org/STASH" class="hover-bold">STASH First-Gen Home</a>: A matched savings program for first-generation first-time homebuyers in Massachusetts.',
      '- <a href="https://www.bostonhousing.org/en/For-Section-8-Leased-Housing/Resident-Information/BHA-First-Home-Program.aspx" class="hover-bold">BHA First Home</a>: An extension of the Section 8 to Homeownership Program.',
      '<strong>Financial Support? No</strong>',
      '- <a href="https://www.boston.gov/departments/housing/first-time-homebuyer-program" class="hover-bold">First Time Homebuyer Program</a>: This program provides eligible home buyers with a grant towards a down payment.',
      '- <a href="https://www.boston.gov/departments/housing/boston-home-center/boston-home-center-classes" class="hover-bold">Homebuyer 101</a>: This class certificate qualifies you to get home financing help through the City.',
      '- <a href="https://www.urbanedge.org/program/credit-counseling-boot-camp/" class="hover-bold">Credit Booster Program</a>: A 3 hour intensive, instructor lead class on credit basics that covers the essentials of credit'
    ]
  },
  {
    title: 'Needing More Money',
    items: [
      '<strong>Job Training & Career Services</strong>',
      '- <a href="https://www.boston.gov/departments/workforce-development/city-academy" class="hover-bold">City Academy</a>: The training pipeline for Boston residents which provides access to entry-level City positions.',
      '- <a href="https://www.boston.gov/departments/workforce-development/powercorpsbos" class="hover-bold">PowerCorps BOS</a>: Training Boston\'s young adults for jobs in the green industry.',
      '- <a href="https://www.boston.gov/departments/workforce-development/greater-boston-equitable-apprenticeship-pathways" class="hover-bold">Greater Boston Equitable Apprenticeship Pathways</a>: Connecting residents to apprenticeship opportunities.',
      '- <a href="https://www.boston.gov/departments/workforce-development/good-jobs-metro-boston-coalition" class="hover-bold">Good Jobs Metro Boston Coalition</a>: Connecting residents to quality, good-paying job opportunities in child care, clean energy, and healthcare.'
    ]
  },
  {
    title: 'Financial Education to Support Wealth-building',
    items: [
      '<a href="https://www.boston.gov/departments/center-working-families/roxbury-center-financial-empowerment/financial-coaching" class="hover-bold">1 on 1 Financial Coaching</a>: The City of Boston offers free financial coaching to help you start your journey to financial success.',
      '<a href="https://www.boston.gov/departments/center-working-families/roxbury-center-financial-empowerment/roxbury-center-financial-workshops" class="hover-bold">Financial Workshops</a>: The Center for Working Families offers free workshops every month on topics important to financial well-being and growth.'
    ]
  }
];

const homeownerData = [
  {
    title: 'Home Improvement',
    items: [
      '<a href="https://www.boston.gov/departments/housing/boston-home-center/quick-guide-home-repair-programs" class="hover-bold">Home Repair Loan Programs</a>: Learn about the home repair programs offered by the Office of Housing, whether or not you may qualify, and how to apply.',
      '<a href="https://www.boston.gov/departments/housing/accessory-dwelling-units-adus-boston" class="hover-bold">Accessory Dwelling Units (ADU)</a>: Learn more about ADUs including what\'s possible for your property, and what to consider in the design process.'
    ]
  },
  {
    title: 'Stopping a Foreclosure',
    items: [
      '<a href="https://www.boston.gov/housing/foreclosure-prevention-and-intervention" class="hover-bold">Foreclosure Prevention</a>: The Boston Home Center offers free and confidential foreclosure prevention and intervention counseling and home preservation services.',
      '<a href="https://www.boston.gov/departments/assessing/hardship-exemption-clause-18" class="hover-bold">Hardship Tax Exemption</a>: The hardship exemption is discretionary. You may be eligible for this exemption if the Board of Assessors determines you can\'t pay your real estate taxes because of your age, infirmity, and financial condition.'
    ]
  },
  {
    title: 'I\'m a Senior and Need Support',
    items: [
      '<a href="https://www.boston.gov/departments/neighborhood-development/boston-home-center/how-join-seniors-save-program" class="hover-bold">New Heating System</a>: The Seniors Save program helps seniors replace failing heating systems to ensure they are ready for winter. We encourage you to apply if you\'re over the age of 60 and need help replacing your heating system.',
      '<a href="https://www.boston.gov/departments/housing/how-apply-senior-home-repair" class="hover-bold">Senior Home Repair</a>: The Boston Home Center works with several neighborhood agencies that will assist you with applying for minor to larger repairs for your home.',
      '<a href="https://www.boston.gov/departments/age-strong-commission/senior-property-tax-work" class="hover-bold">Property Tax Work Off</a>: Qualified homeowners can work-off up to $2,000 on their property tax bill by offering volunteer services to the City of Boston'
    ]
  },
  {
    title: 'Needing More Money',
    items: [
      '<strong>Job Training & Career Services</strong>',
      '- <a href="https://www.boston.gov/departments/workforce-development/city-academy" class="hover-bold">City Academy</a>: The training pipeline for Boston residents which provides access to entry-level City positions.',
      '- <a href="https://www.boston.gov/departments/workforce-development/powercorpsbos" class="hover-bold">PowerCorps BOS</a>: Training Boston\'s young adults for jobs in the green industry.',
      '- <a href="https://www.boston.gov/departments/workforce-development/greater-boston-equitable-apprenticeship-pathways" class="hover-bold">Greater Boston Equitable Apprenticeship Pathways</a>: Connecting residents to apprenticeship opportunities.',
      '- <a href="https://www.boston.gov/departments/workforce-development/good-jobs-metro-boston-coalition" class="hover-bold">Good Jobs Metro Boston Coalition</a>: Connecting residents to quality, good-paying job opportunities in child care, clean energy, and healthcare.'
    ]
  }
];


// Accordion Functions
function populateAccordion(container, data) {
  container.innerHTML = data.map(category => `
    <div class="accordion-item">
      <button class="accordion-header">${category.title}</button>
      <div class="accordion-content">
        ${category.items.map(item => `<p>${item}</p>`).join('')}
      </div>
    </div>
  `).join('');

  // Add click handlers for accordion items
  container.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        content.classList.toggle('show');
      });
  });
}

function resetAccordions(section) {
  const accordions = section.querySelectorAll('.accordion-content');
  accordions.forEach(acc => {
    acc.style.maxHeight = null;
    acc.previousElementSibling.classList.remove('active');
  });
}

// Event Listeners
renterBtn.addEventListener('click', () => {
  if (renterSection.style.display === 'block') {
    renterSection.style.display = 'none';
  } else {
    renterSection.style.display = 'block';
    homeownerSection.style.display = 'none';
    resetAccordions(renterSection);
    populateAccordion(renterSection.querySelector('.accordion'), renterData);
  }
});

homeownerBtn.addEventListener('click', () => {
  if (homeownerSection.style.display === 'block') {
    homeownerSection.style.display = 'none';
  } else {
    homeownerSection.style.display = 'block';
    renterSection.style.display = 'none';
    resetAccordions(homeownerSection);
    populateAccordion(homeownerSection.querySelector('.accordion'), homeownerData);
  }
});

function redirectToPage() {
    // Redirects to the target page
    window.location.href = '4p-pages/4-p.html';
  }

  function redirectToSuccessPage() {
    window.location.href = 'storypage/index.html';
}