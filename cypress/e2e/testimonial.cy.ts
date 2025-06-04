/// <reference types="cypress" />
describe("Testimonial", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("navigates to the testimonial page from the landingpage", () => {
    cy.get("[data-cy='testimonial-section-submit']").click();
    cy.url().should("include", "/testimonial");
  });

  describe("Valid Form Submission", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/testimonial");
    });
    it("fills out the testimonial form", () => {
      cy.get("[data-testid='form-name']").type("John Doe");
      cy.get("[data-testid='form-email']").type("john@example.com");
      cy.get("[data-testid='form-title']").type("CEO");
      cy.get("[data-testid='form-rating-5']").click();
      cy.get("[data-testid='form-testimonial']").type("It is very nice");
      cy.get("[data-testid='form-button'").click();

      cy.get("[data-testid='back-to-homepage']").click();
      cy.url().should("eq", "http://localhost:3000/");
    });
  });
  describe("Form Validation", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/testimonial");
    });

    it("displays validation errors for empty required fields", () => {
      // Try to submit an empty form
      cy.get("[data-testid='form-button']").click();

      cy.get("[data-testid='form-name-error']").should(
        "have.text",
        "Name is required"
      );
      cy.get("[data-testid='form-email-error']").should(
        "have.text",
        "Email is required"
      );
      cy.get("[data-testid='form-title-error']").should(
        "have.text",
        "Title is required"
      );
      cy.get("[data-testid='form-testimonial-error']").should(
        "have.text",
        "Testimonial is required"
      );
      cy.get("[data-testid='form-rating-error']").should(
        "have.text",
        "Rating is required"
      );
    });

    it("validates email format", () => {
      cy.get("[data-testid='form-name']").type("John Doe");
      cy.get("[data-testid='form-email']").type("invalid-email");
      cy.get("[data-testid='form-testimonial']").type("Test message");
      cy.get("[data-testid='form-title']").type("CEO");
      cy.get("[data-testid='form-rating-5']").click();
      cy.get("[data-testid='form-button']").click();
      cy.get("[data-testid='form-email-error']").should(
        "have.text",
        "Email is invalid"
      );
    });
  });
});
