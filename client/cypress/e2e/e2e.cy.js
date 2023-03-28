Cypress.Cookies.debug(true)

// login command in order to get a token
Cypress.Commands.add('login', (email, password) => {
  console.log("IS THE LOGIN CUSTOM COMMAND BEING USED")
  // make login call to endpoint
  cy.visit('/')
  cy.request({
    method: 'POST',
    url: 'api/login',
    body: {"email": email, "password": password}
  }).then((response) => {
    let body = response['body']['token']
    cy.setCookie('token', body)
  })
})

// Landing page view test
describe('Landing page view', () => {
  it('Landing can be viewed', () => {
    cy.visit('http://localhost:3000/');
    // landing page should contain the text BluCollar
    cy.contains('BluCollar');
    // search page should contain two buttons: Login and Sign Up
    cy.contains('button', 'Login');
    cy.contains('button', 'Sign Up');
  });
});

// Search page view test
describe('Search page view', () => {
  it('Search can be viewed', () => {
    cy.visit('http://localhost:3000/search');
    // search page should contain navbar with links to profile and sign out
    cy.contains('button', 'Search')
    cy.contains('button', 'Profile')
    cy.contains('button', 'Sign Out')
    // search page should contain a search bar/text input to search for services
    cy.get('[id$=search]')
    // search page should contain a sample listing containing a service type
    cy.contains('plumber')
  });
});

// Sign in page can be viewed
describe('Sign in page view', () => {
  it('Sign In can be viewed', () => {
    cy.visit('http://localhost:3000/signin');
    // sign in page contains the text Email and Password
    cy.contains('Email')
    cy.contains('Password')
    // sign in page should have text inputs for both the email and password
    cy.get('input[id="email"]')
    cy.get('input[id="password"]')
    // sign in page should have a button to login
    cy.contains('button', 'Sign In')
  });
});

// Sign up page can be viewed
describe('Sign up page view', () => {
  it('Sign Up can be viewed', () => {
    cy.visit('http://localhost:3000/signup');
    // signup page should have various inputs for all the information needed to signup
    cy.contains('Email')
    cy.contains('Password')
    cy.contains('Confirm Password')
    // signup page should contain a button to Sign Up
    cy.contains('button', 'Sign Up')
  });
});

// Profile page view test
describe('Profile page view', () => {
  it('Profile can be viewed', () => {
    let email = "test@user.com"
    let password = "pass"
    cy.login(email, password)
    cy.visit('/profile');
    cy.get('input[id="first"]').should('have.value', "Test")
    cy.get('input[id="last"]').should('have.value', "User")
    cy.contains('Edit Profile')
  });
});

// Navigate from Search to Profile
describe('Nav from Search to Profile', () => {
  it('Search to Profile Page', () => {
    let email = "test@user.com"
    let password = "pass"
    cy.login(email, password)
    cy.visit('http://localhost:3000/search');
    cy.contains('Profile').click()
    cy.url().should('equal', 'http://localhost:3000/profile')
  });
});

// Navigate from Profile to Search
describe('Nav from Profile to Search', () => {
  it('Profile to Search Page', () => {
    let email = "test@user.com"
    let password = "pass"
    cy.login(email, password)
    cy.visit('http://localhost:3000/profile');
    cy.contains('Search').click()
    cy.url().should('equal', 'http://localhost:3000/search')
  });
});

// Navigate from Search to Signout
describe('Sign Out from Search', () => {
  it('Signout Successful from Search Page', () => {
    let email = "test@user.com"
    let password = "pass"
    cy.login(email, password)
    cy.visit('http://localhost:3000/search');
    cy.contains('Sign Out').click()
    cy.url().should('equal', 'http://localhost:3000/')
    cy.getCookie('token').should('be.null')
  });
});

// Navigate from Profile to Signout
describe('Sign Out from Profile', () => {
  it('Signout Successful from Profile Page', () => {
    let email = "test@user.com"
    let password = "pass"
    cy.login(email, password)
    cy.visit('http://localhost:3000/profile');
    cy.contains('Sign Out').click()
    cy.url().should('equal', 'http://localhost:3000/')
    cy.getCookie('token').should('be.null')
  });
});

// Click on Listing Goes to Provider Profile Page 
describe('Listing Leads to Provider Profile', () => {
  it('Clicking Listing Goes to Profile', () => {
    let email = "test@user.com"
    let password = "pass"
    cy.login(email, password)
    cy.visit('/search');
    cy.contains('Ammar Siddiqui').click()
    cy.url().should('contain', 'http://localhost:3000/profiles/1')
  });
});

// Signing in takes you to the search page
describe('Sign In Flow using UI', () => {
  it('Signing In Takes you to Search Page', () => {
    cy.visit('http://localhost:3000/');
    cy.contains('Login').click()
    cy.get('input[id="email"]').type('test@user.com')
    cy.get('input[id="email"]').should('have.value', 'test@user.com')
    cy.get('input[id="password"]').type('pass')
    cy.get('input[id="password"]').should('have.value', 'pass')
    cy.get('button[id="signin"]').click()
    cy.url().should('equal', 'http://localhost:3000/search')
  });
});
  // inbox page works
  describe('Inbox page can be viewed', () => {
    it('Inbox page can be viewed', () => {
      let email = "test@user.com"
      let password = "pass"
      cy.login(email, password)
      cy.visit('/inbox')
      cy.contains("Inbox")
    });
  });
  // can create a service request
  describe('Service Request can be created', () => {
    it('Service Request can be created', () => {
      let email = "test@user.com"
      let password = "pass"
      cy.login(email, password)
      cy.visit('/profiles/1')
      cy.contains('Create service request').click()
    });
  });
