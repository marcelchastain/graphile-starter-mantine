/// <reference types="Cypress" />

context("HomePage", () => {
  it("renders correctly", () => {
    // Setup
    cy.visit(Cypress.env("FRONTEND_URL"));

    // Action

    // Assertions
    cy.location("pathname").should("equal", "/");
    cy.getCy("header-login-button").should("exist");
    cy.getCy("homepage-header").should("exist");
  });
});
