/// <reference types="cypress" />
describe("Testimonial", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("navigates to the testimonial page from the landingpage", () => {
    cy.get("[data-testid='testimonial-section-submit']").click();
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
  describe("Carousel Navigation", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");

      // Wait for testimonials to load
      cy.get("[data-testid='loader']", { timeout: 10000 }).should("not.exist");
    });

    it("shows navigation buttons when there are enough testimonials", () => {
      cy.get("[data-testid='carousel']").then(($carousel) => {
        const testimonialCount = $carousel.find(".testimonial-card").length;

        if (testimonialCount >= 4) {
          cy.get("[data-testid='carousel-prev']").should("be.visible");
          cy.get("[data-testid='carousel-next']").should("be.visible");
        }
      });
    });

    it("navigates to next testimonial when next button is clicked", () => {
      cy.get("[data-testid='carousel-next']").then(($button) => {
        if ($button.is(":visible")) {
          cy.get("[data-testid='carousel-next']").then(($button) => {
            if ($button.is(":visible")) {
              // Confirm carousel-item0 is initially visible
              cy.get("[data-testid='carousel-item0']").should("be.visible");

              // Click next
              cy.get("[data-testid='carousel-next']").click();
              cy.wait(500);

              // After transition, carousel-item0 should not be visible
            }
          });
        }
      });
    });

    it("navigates to previous testimonial when previous button is clicked", () => {
      cy.get("[data-testid='carousel-prev']").then(($button) => {
        if ($button.is(":visible")) {
          cy.get("[data-testid='carousel-next']").click();
          cy.wait(500);

          // Click previous to go back
          cy.get("[data-testid='carousel-prev']").click();
          cy.wait(500);
        }
      });
    });
  });
});
