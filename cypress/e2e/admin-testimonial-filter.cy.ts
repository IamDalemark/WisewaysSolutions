describe("Admin Testimonials Filter Button E2E", () => {
  beforeEach(() => {

    cy.visit("http://localhost:3000/admin/testimonials");
    cy.window().then((win) => {
      win.localStorage.setItem("token", "dummy-token-for-testing");
    });
    cy.reload();

  });

  it("toggles filter dialog on button click", () => {
    cy.get("button[aria-haspopup='dialog']").as("filterBtn");
    cy.get("@filterBtn").click();
    cy.get("[role='dialog']").should("be.visible");
    cy.get("@filterBtn").click();
    cy.get("[role='dialog']").should("not.exist");
  });

  it("applies filters correctly", () => {
    cy.get("button[aria-haspopup='dialog']").click();

    cy.get("#name-filter").type("John Doe");

    cy.get("#status-filter").select("Accepted");

    cy.get("#rating-filter").select("5");

    cy.contains("button", "Apply").click();

    cy.get("[role='dialog']").should("not.exist");

    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row).within(() => {
        cy.get("td").first().should("contain.text", "John Doe");
        cy.get("td").contains("Accepted").should("exist");
        cy.get("td").contains("5").should("exist");
      });
    });
  });

it("resets filters correctly", () => {
  cy.get("button[aria-haspopup='dialog']").click();

  cy.get("#name-filter").type("Someone");
  cy.get("#status-filter").select("Declined");
  cy.get("#rating-filter").select("3");

  cy.contains("button", "Reset").click();

  cy.get("[role='dialog']").should("not.exist");
  cy.get("button[aria-haspopup='dialog']").click();

  cy.get("#name-filter").should("have.value", "");
  cy.get("#status-filter").should("have.value", "");
  cy.get("#rating-filter").should("have.value", "");

  cy.get("table tbody tr").should("have.length.greaterThan", 0);
});
});
