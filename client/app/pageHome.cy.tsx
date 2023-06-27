import React from 'react'
import Home from './page'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />)
  })
})

describe('App component', () => {
  let itemCount;

  beforeEach(() => {
    cy.intercept('http://localhost:5000/api/sCharacters', { fixture: 'testItems.json' });
    cy.mount(<Home />);
  });

  it('renders the header', () => {
    cy.contains('My React App'); // Assuming 'My React App' is the text inside the header
  });

  it('displays a list of items', () => {
    cy.get('.item').its('length').then((length) => {
      itemCount = length;
      expect(length).to.be.greaterThan(0);
    });
  });

  it('adds a new item on button click', () => {
    cy.get('.add-button').click();
    cy.get('.item').should('have.length', itemCount + 1);
  });
});




