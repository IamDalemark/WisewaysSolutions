describe("User Login Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.wait(300);
    cy.get('[data-cy="navbar-appointment-button"]')
      .find('[data-cy="appointment-button"]')
      .should("be.visible")
      .click({ force: true });
    cy.wait(300);
    cy.get('[data-cy="login-modal"]').should("be.visible");
    cy.wait(300);
  });

  describe("Modal Display and UI Elements", () => {
    it("should display all required UI elements", () => {
      // Check modal title
      cy.contains("Log In").should("be.visible");

      // Check form fields
      cy.get('[data-cy="email-input"]').should("be.visible");
      cy.get('[data-cy="password-input"]').should("be.visible");

      // Check labels
      cy.contains("Email").should("be.visible");
      cy.contains("Password").should("be.visible");

      // Check buttons
      cy.get('[data-cy="login-submit-btn"]').should("be.visible");
      cy.get('[data-cy="forgot-password-btn"]').should("be.visible");
      cy.get('[data-cy="signup-link"]').should("be.visible");
      cy.get('[data-cy="close-login-modal"]').should("be.visible");
    });

    it("should have correct placeholder text", () => {
      cy.get('[data-cy="email-input"]').should(
        "have.attr",
        "placeholder",
        "Enter Email"
      );
      cy.get('[data-cy="password-input"]').should(
        "have.attr",
        "placeholder",
        "Enter Password"
      );
    });

    it("should close modal when X button is clicked", () => {
      cy.wait(300);
      cy.get('[data-cy="close-login-modal"]').click();
      cy.get('[data-cy="login-modal"]').should("not.exist");
      cy.wait(300);
      cy.get('[data-cy="navbar-appointment-button"]')
        .find('[data-cy="appointment-button"]')
        .should("be.visible")
        .click({ force: true });
      cy.wait(300);
    });
  });

  describe("Form Validation", () => {
    it("should show validation errors for empty fields", () => {
      cy.wait(300);
      cy.get('[data-cy="login-submit-btn"]').click();

      cy.get('[data-cy="email-error"]').should("contain", "Email is required.");
      cy.get('[data-cy="password-error"]').should(
        "contain",
        "Password is required."
      );
    });

    it("should show validation error for invalid email format", () => {
      cy.wait(300);
      cy.get('[data-cy="email-input"]').type("invalid-email");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="login-submit-btn"]').click();

      cy.get('[data-cy="email-error"]').should("contain", "Email is invalid.");
    });

    it("should show validation error for short password", () => {
      cy.wait(300);
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("123");
      cy.get('[data-cy="login-submit-btn"]').click();

      cy.get('[data-cy="password-error"]').should(
        "contain",
        "Password must be at least 6 characters."
      );
    });

    it("should clear validation errors when user starts typing", () => {
      cy.wait(300);
      // Trigger validation errors first
      cy.get('[data-cy="login-submit-btn"]').click();
      cy.get('[data-cy="email-error"]').should("exist");

      // Start typing in email field
      cy.wait(300);
      cy.get('[data-cy="email-input"]').type("t");
      cy.get('[data-cy="email-error"]').should("not.exist");
    });

    it("should accept valid credentials", () => {
      cy.wait(300);
      cy.get('[data-cy="email-input"]').type("bebete4495@acedby.com");
      cy.get('[data-cy="password-input"]').type("testing123");
      cy.get('[data-cy="login-submit-btn"]').click();

      // Should not show validation errors
      cy.wait(300);
      cy.get('[data-cy="email-error"]').should("not.exist");
      cy.get('[data-cy="password-error"]').should("not.exist");
      cy.wait(300);
      cy.visit("http://localhost:3000/");
      cy.wait(300);
      cy.get('[data-cy="navbar-appointment-button"]')
        .find('[data-cy="appointment-button"]')
        .should("be.visible")
        .click({ force: true });
    });
  });

  describe("Form Submission and Loading States", () => {
    it("should show loading state during submission", () => {
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="login-submit-btn"]').click();

      cy.get('[data-cy="login-submit-btn"]').should("be.disabled");
      cy.get('[data-cy="login-submit-btn"]').should("contain", "Logging In...");
      cy.get('[data-cy="loading-spinner"]').should("be.visible");

      cy.wait(500);
    });

    it("should handle successful login", () => {
      cy.get('[data-cy="email-input"]').type("bebete4495@acedby.com");
      cy.get('[data-cy="password-input"]').type("testing123");
      cy.get('[data-cy="login-submit-btn"]').click();

      cy.wait(300);
      cy.get('[data-cy="login-modal"]').should("not.exist");

      cy.url().should("include", "/booking");
      cy.wait(300);
    });

    it("should handle login errors", () => {
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("wrongpassword");
      cy.get('[data-cy="login-submit-btn"]').click();

      cy.wait(500);

      // Should show error message
      cy.get('[data-cy="general-error"]').should(
        "contain",
        "Invalid login credentials"
      );

      // Modal should remain open
      cy.get('[data-cy="login-modal"]').should("be.visible");
    });
  });

  describe("Navigation Links", () => {
    it("should navigate to forgot password flow", () => {
      cy.get('[data-cy="forgot-password-btn"]').click();

      cy.url().should("include", "/resetpassword");
    });

    it("should navigate to signup modal", () => {
      cy.get('[data-cy="signup-link"]').click();

      cy.get('[data-cy="login-modal"]').should("not.exist");
      cy.get('[data-cy="signup-modal"]').should("be.visible");
    });
  });

  describe("Responsive Design", () => {
    it("should display correctly on mobile devices", () => {
      cy.viewport("iphone-6");

      cy.get('[data-cy="login-modal"]').should("be.visible");
      cy.get('[data-cy="email-input"]').should("be.visible");
      cy.get('[data-cy="password-input"]').should("be.visible");
      cy.get('[data-cy="login-submit-btn"]').should("be.visible");
    });

    it("should display correctly on tablet devices", () => {
      cy.viewport("ipad-2");

      cy.get('[data-cy="login-modal"]').should("be.visible");
      cy.get('[data-cy="email-input"]').should("be.visible");
      cy.get('[data-cy="password-input"]').should("be.visible");
      cy.get('[data-cy="login-submit-btn"]').should("be.visible");
    });
  });

  describe("Data Persistence", () => {
    it("should maintain form data when validation fails", () => {
      const email = "test@example.com";
      const password = "short";

      cy.get('[data-cy="email-input"]').type(email);
      cy.get('[data-cy="password-input"]').type(password);
      cy.get('[data-cy="login-submit-btn"]').click();

      cy.get('[data-cy="email-input"]').should("have.value", email);
      cy.get('[data-cy="password-input"]').should("have.value", password);
    });

    it("should clear form when modal is reopened after closing", () => {
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("password123");

      cy.get('[data-cy="close-login-modal"]').click();

      cy.wait(300);
      cy.get('[data-cy="navbar-appointment-button"]')
        .find('[data-cy="appointment-button"]')
        .should("be.visible")
        .click({ force: true });
      cy.wait(300);

      cy.get('[data-cy="email-input"]').should("have.value", "");
      cy.get('[data-cy="password-input"]').should("have.value", "");
    });
  });
});
