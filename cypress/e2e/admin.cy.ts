describe("Admin Login Flow", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/admin");
  });

  it("should display the login form correctly", () => {
    cy.get("h2").should("contain.text", "Admin Log In");
    cy.get("input[name='email']").should("be.visible");
    cy.get("input[name='password']").should("be.visible");
    cy.get("button[type='submit']").should("contain.text", "Log In");
    cy.get("input[type='checkbox']").should("be.visible");
    cy.get("label").should("contain.text", "Show password");
  });

  it("should validate required fields", () => {
    cy.get("button[type='submit']").click();
    
    cy.get("p").should("contain.text", "Email is required.");
    cy.get("p").should("contain.text", "Password is required.");
  });

  it("should validate email format", () => {
    cy.get("input[name='email']").type("invalid-email");
    cy.get("button[type='submit']").click();
    
    cy.get("p").should("contain.text", "Email is invalid.");
  });

  it("should validate password length", () => {
    cy.get("input[name='email']").type("admin@test.com");
    cy.get("input[name='password']").type("123");
    cy.get("button[type='submit']").click();
    
    cy.get("p").should("contain.text", "Password must be at least 6 characters.");
  });

  it("should toggle password visibility", () => {
    cy.get("input[name='password']").should("have.attr", "type", "password");
    
    cy.get("input[type='checkbox']").check();
    cy.get("input[name='password']").should("have.attr", "type", "text");
    
    cy.get("input[type='checkbox']").uncheck();
    cy.get("input[name='password']").should("have.attr", "type", "password");
  });

  it("should handle successful login and show Calendly options", () => {
    cy.intercept("POST", "/api/adminlogin", {
      statusCode: 200,
      body: {
        success: true,
        token: "test-token-123",
        message: "Logged in successfully"
      }
    }).as("loginRequest");

    cy.get("input[name='email']").type("wisewaysadmin@test.com");
    cy.get("input[name='password']").type("wiseways@admin123");
    cy.get("button[type='submit']").click();

    cy.wait("@loginRequest");
    
    cy.get("div").should("contain.text", "Login successful!");
    cy.get("h3").should("contain.text", "Connect Calendly Account");
    cy.get("button").should("contain.text", "Connect Calendly");
    cy.get("button").should("contain.text", "Skip for now");
    
    cy.window().its("localStorage").invoke("getItem", "token").should("eq", "test-token-123");
  });

  it("should handle login failure", () => {
    cy.intercept("POST", "/api/adminlogin", {
      statusCode: 400,
      body: {
        success: false,
        error: "Invalid email or password"
      }
    }).as("loginRequest");

    cy.get("input[name='email']").type("admin@wiseways.com");
    cy.get("input[name='password']").type("wrongpassword");
    cy.get("button[type='submit']").click();

    cy.wait("@loginRequest");
  });

  it("should show loading state during login", () => {
    cy.intercept("POST", "/api/adminlogin", {
      statusCode: 200,
      body: {
        success: true,
        token: "test-token-123"
      },
      delay: 1000
    }).as("loginRequest");

    cy.get("input[name='email']").type("admin@wiseways.com");
    cy.get("input[name='password']").type("password123");
    cy.get("button[type='submit']").click();

    cy.get("button").should("contain.text", "Logging In...");
    cy.get("button").should("be.disabled");
    
    cy.wait("@loginRequest");
  });

  it("should navigate to testimonials when Skip for now is clicked", () => {
    cy.intercept("POST", "/api/adminlogin", {
      statusCode: 200,
      body: {
        success: true,
        token: "test-token-123"
      }
    }).as("loginRequest");

    cy.get("input[name='email']").type("admin@wiseways.com");
    cy.get("input[name='password']").type("password123");
    cy.get("button[type='submit']").click();
    cy.wait("@loginRequest");

    // Click Skip for now
    cy.get("button").contains("Skip for now").click();
    
    cy.url().should("include", "/admin/testimonials");
  });
});


describe("Admin Authentication Guard", () => {
  it("should redirect unauthenticated users to login", () => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/admin/testimonials");
    cy.url().should("include", "/admin");
  });

  it("should allow authenticated users to access admin pages", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", "test-admin-token");
    });
    
    cy.visit("http://localhost:3000/admin/testimonials");
    
    cy.url().should("include", "/admin/testimonials");
  });

  it("should logout and redirect to login when logout is clicked", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("token", "test-admin-token");
    });
    
    cy.visit("http://localhost:3000/admin/testimonials");
    
    cy.get("[data-testid='logout-button']").click();
    
    cy.window().its("localStorage").invoke("getItem", "token").should("be.null");
    cy.url().should("include", "/admin");
  });
});