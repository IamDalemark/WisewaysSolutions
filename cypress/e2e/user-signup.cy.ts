describe("User SignUp Test", () => {
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
    // Navigate to signup modal from login modal
    cy.get('[data-cy="signup-link"]').click();
    cy.get('[data-cy="signup-modal"]').should("be.visible");
    cy.wait(300);
  });

  describe("Modal Display and UI Elements", () => {
    it("should display all required UI elements", () => {
      // Check modal title
      cy.contains("Create Account").should("be.visible");

      // Check form fields
      cy.get('[data-cy="username-input"]').should("be.visible");
      cy.get('[data-cy="email-input"]').should("be.visible");
      cy.get('[data-cy="password-input"]').should("be.visible");
      cy.get('[data-cy="confirm-password-input"]').should("be.visible");

      // Check labels
      cy.contains("Username").should("be.visible");
      cy.contains("Email").should("be.visible");
      cy.contains("Password").should("be.visible");
      cy.contains("Confirm Password").should("be.visible");

      // Check buttons and links
      cy.get('[data-cy="signup-submit-btn"]').should("be.visible");
      cy.get('[data-cy="terms-link"]').should("be.visible");
      cy.get('[data-cy="login-link"]').should("be.visible");
      cy.get('[data-cy="close-signup-modal"]').should("be.visible");

      // Check terms checkbox
      cy.get('[data-cy="terms-checkbox"]').should("be.visible");
    });

    it("should have correct placeholder text", () => {
      cy.get('[data-cy="username-input"]').should(
        "have.attr",
        "placeholder",
        "Enter username"
      );
      cy.get('[data-cy="email-input"]').should(
        "have.attr",
        "placeholder",
        "Enter email"
      );
      cy.get('[data-cy="password-input"]').should(
        "have.attr",
        "placeholder",
        "Enter password"
      );
      cy.get('[data-cy="confirm-password-input"]').should(
        "have.attr",
        "placeholder",
        "Confirm password"
      );
    });

    it("should close modal when X button is clicked", () => {
      cy.wait(300);
      cy.get('[data-cy="close-signup-modal"]').click();
      cy.get('[data-cy="signup-modal"]').should("not.exist");
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
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.get('[data-cy="username-error"]').should(
        "contain",
        "Username is required."
      );
      cy.get('[data-cy="email-error"]').should("contain", "Email is required.");
      cy.get('[data-cy="password-error"]').should(
        "contain",
        "Password is required."
      );
      cy.get('[data-cy="confirm-password-error"]').should(
        "contain",
        "Please confirm your password."
      );
      cy.get('[data-cy="terms-error"]').should(
        "contain",
        "You need to accept the terms."
      );
    });

    it("should show validation error for invalid email format", () => {
      cy.wait(300);
      cy.get('[data-cy="username-input"]').type("testuser");
      cy.get('[data-cy="email-input"]').type("invalid-email");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="confirm-password-input"]').type("password123");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.get('[data-cy="email-error"]').should(
        "contain",
        "Please enter a valid email address."
      );
    });

    it("should show validation error for short password", () => {
      cy.wait(300);
      cy.get('[data-cy="username-input"]').type("testuser");
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("123");
      cy.get('[data-cy="confirm-password-input"]').type("123");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.get('[data-cy="password-error"]').should(
        "contain",
        "Password must be at least 6 characters."
      );
    });

    it("should show validation error for mismatched passwords", () => {
      cy.wait(300);
      cy.get('[data-cy="username-input"]').type("testuser");
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="confirm-password-input"]').type("password456");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.get('[data-cy="confirm-password-error"]').should(
        "contain",
        "Passwords do not match."
      );
    });

    it("should clear validation errors when user starts typing", () => {
      cy.wait(300);
      // Trigger validation errors first
      cy.get('[data-cy="signup-submit-btn"]').click();
      cy.get('[data-cy="username-error"]').should("exist");

      // Start typing in username field
      cy.wait(300);
      cy.get('[data-cy="username-input"]').type("t");
      cy.get('[data-cy="username-error"]').should("not.exist");

      // Test email field
      cy.get('[data-cy="email-input"]').type("t");
      cy.get('[data-cy="email-error"]').should("not.exist");
    });

    it("should accept valid credentials", () => {
      cy.wait(300);
      cy.get('[data-cy="username-input"]').type("testuser123");
      cy.get('[data-cy="email-input"]').type("testuser123@example.com");
      cy.get('[data-cy="password-input"]').type("testing123");
      cy.get('[data-cy="confirm-password-input"]').type("testing123");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="signup-submit-btn"]').click();

      // Should not show validation errors
      cy.wait(300);
      cy.get('[data-cy="username-error"]').should("not.exist");
      cy.get('[data-cy="email-error"]').should("not.exist");
      cy.get('[data-cy="password-error"]').should("not.exist");
      cy.get('[data-cy="confirm-password-error"]').should("not.exist");
      cy.get('[data-cy="terms-error"]').should("not.exist");
    });
  });

  describe("Terms and Conditions", () => {
    it("should open terms modal when terms link is clicked", () => {
      cy.get('[data-cy="terms-link"]').click();
      cy.get('[data-cy="terms-modal"]').should("be.visible");
      cy.contains("Terms and Conditions").should("be.visible");
    });

    it("should accept terms from terms modal", () => {
      cy.get('[data-cy="terms-link"]').click();
      cy.get('[data-cy="terms-modal"]').should("be.visible");
      cy.get('[data-cy="accept-terms-btn"]').click();

      cy.get('[data-cy="terms-modal"]').should("not.exist");
      cy.get('[data-cy="terms-checkbox"]').should("be.checked");
    });

    it("should cancel terms from terms modal", () => {
      cy.get('[data-cy="terms-link"]').click();
      cy.get('[data-cy="terms-modal"]').should("be.visible");
      cy.get('[data-cy="cancel-terms-btn"]').click({ force: true });

      cy.get('[data-cy="terms-modal"]').should("not.exist");
      cy.get('[data-cy="terms-checkbox"]').should("not.be.checked");
    });

    it("should require terms acceptance for form submission", () => {
      cy.wait(300);
      cy.get('[data-cy="username-input"]').type("testuser");
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="confirm-password-input"]').type("password123");

      cy.get('[data-cy="signup-submit-btn"]').click();
      cy.get('[data-cy="terms-error"]').should(
        "contain",
        "You need to accept the terms."
      );
    });
  });

  describe("Form Submission and Loading States", () => {
    it("should show loading state during submission", () => {
      cy.get('[data-cy="username-input"]').type("testuser");
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="confirm-password-input"]').type("password123");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.get('[data-cy="signup-submit-btn"]').should("be.disabled");
      cy.get('[data-cy="signup-submit-btn"]').should(
        "contain",
        "Creating Account..."
      );
      cy.get('[data-cy="loading-spinner"]').should("be.visible");

      cy.wait(500);
    });

    it("should handle successful signup", () => {
      cy.get('[data-cy="username-input"]').type("newuser123");
      cy.get('[data-cy="email-input"]').type("bebete4495@acedby.com");
      cy.get('[data-cy="password-input"]').type("testing123");
      cy.get('[data-cy="confirm-password-input"]').type("testing123");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.wait(300);
      cy.get('[data-cy="signup-modal"]').should("not.exist");
    });

    it("should handle signup errors", () => {
      cy.get('[data-cy="username-input"]').type("existinguser");
      cy.get('[data-cy="email-input"]').type("existing@example.com");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="confirm-password-input"]').type("password123");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.wait(500);

      // Modal should remain open
      cy.get('[data-cy="signup-modal"]').should("be.visible");
    });
  });

  describe("Navigation Links", () => {
    it("should navigate to login modal", () => {
      cy.get('[data-cy="login-link"]').click();

      cy.get('[data-cy="signup-modal"]').should("not.exist");
      cy.get('[data-cy="login-modal"]').should("be.visible");
    });
  });

  describe("Responsive Design", () => {
    it("should display correctly on mobile devices", () => {
      cy.viewport("iphone-6");

      cy.get('[data-cy="signup-modal"]').should("be.visible");
      cy.get('[data-cy="username-input"]').should("be.visible");
      cy.get('[data-cy="email-input"]').should("be.visible");
      cy.get('[data-cy="password-input"]').should("be.visible");
      cy.get('[data-cy="confirm-password-input"]').should("be.visible");
      cy.get('[data-cy="signup-submit-btn"]').should("be.visible");
    });

    it("should display correctly on tablet devices", () => {
      cy.viewport("ipad-2");

      cy.get('[data-cy="signup-modal"]').should("be.visible");
      cy.get('[data-cy="username-input"]').should("be.visible");
      cy.get('[data-cy="email-input"]').should("be.visible");
      cy.get('[data-cy="password-input"]').should("be.visible");
      cy.get('[data-cy="confirm-password-input"]').should("be.visible");
      cy.get('[data-cy="signup-submit-btn"]').should("be.visible");
    });
  });

  describe("Data Persistence", () => {
    it("should maintain form data when validation fails", () => {
      const username = "testuser";
      const email = "test@example.com";
      const password = "short";
      const confirmPassword = "short";

      cy.get('[data-cy="username-input"]').type(username);
      cy.get('[data-cy="email-input"]').type(email);
      cy.get('[data-cy="password-input"]').type(password);
      cy.get('[data-cy="confirm-password-input"]').type(confirmPassword);
      cy.get('[data-cy="signup-submit-btn"]').click();

      cy.get('[data-cy="username-input"]').should("have.value", username);
      cy.get('[data-cy="email-input"]').should("have.value", email);
      cy.get('[data-cy="password-input"]').should("have.value", password);
      cy.get('[data-cy="confirm-password-input"]').should(
        "have.value",
        confirmPassword
      );
    });

    it("should clear form when modal is reopened after closing", () => {
      cy.get('[data-cy="username-input"]').type("testuser");
      cy.get('[data-cy="email-input"]').type("test@example.com");
      cy.get('[data-cy="password-input"]').type("password123");
      cy.get('[data-cy="confirm-password-input"]').type("password123");

      cy.get('[data-cy="close-signup-modal"]').click();

      cy.wait(300);
      cy.get('[data-cy="navbar-appointment-button"]')
        .find('[data-cy="appointment-button"]')
        .should("be.visible")
        .click({ force: true });
      cy.wait(300);
      cy.get('[data-cy="signup-link"]').click();
      cy.wait(300);

      cy.get('[data-cy="username-input"]').should("have.value", "");
      cy.get('[data-cy="email-input"]').should("have.value", "");
      cy.get('[data-cy="password-input"]').should("have.value", "");
      cy.get('[data-cy="confirm-password-input"]').should("have.value", "");
      cy.get('[data-cy="terms-checkbox"]').should("not.be.checked");
    });
  });

  describe("Form Interactions", () => {
    it("should toggle terms checkbox when clicked", () => {
      cy.get('[data-cy="terms-checkbox"]').should("not.be.checked");
      cy.get('[data-cy="terms-checkbox"]').check();
      cy.get('[data-cy="terms-checkbox"]').should("be.checked");
      cy.get('[data-cy="terms-checkbox"]').uncheck();
      cy.get('[data-cy="terms-checkbox"]').should("not.be.checked");
    });
  });
});
