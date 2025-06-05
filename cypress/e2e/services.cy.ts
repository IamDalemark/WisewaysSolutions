describe("Service navigation from landing page", () => {
  const services = [
    {
      label: "Accounting & Bookkeeping",
      href: "/services/accountingAndBookkeeping",
      heading: "Accounting and Bookkeeping",
    },
    {
      label: "Content Creation",
      href: "/services/contentCreation",
      heading: "Content Creation",
    },
    {
      label: "Customer Support",
      href: "/services/customerSupport",
      heading: "Customer Support",
    },
    {
      label: "Data Entry & Processing",
      href: "/services/dataEntryAndProcessing",
      heading: "Data Entry and Processing",
    },
    {
      label: "Digital Marketing",
      href: "/services/digitalMarketing",
      heading: "Digital Marketing",
    },
    {
      label: "Graphic & Web Design",
      href: "/services/graphicAndWebDesign",
      heading: "Graphic and Web Design",
    },
    {
      label: "IT Support & Help Desk",
      href: "/services/itSupportAndHelpDesk",
      heading: "IT Support and Help Desk",
    },
    {
      label: "Recruitment & HR",
      href: "/services/recruitmentAndHr",
      heading: "Recruitment and HR Services",
    },
    {
      label: "Software Development",
      href: "/services/softwareDevelopment",
      heading: "Software Development",
    },
    {
      label: "Virtual Assistance",
      href: "/services/virtualAssistance",
      heading: "Virtual Assistance",
    },
  ];

  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit("http://localhost:3000");
    cy.contains("button", "SERVICES").click();
  });

  it("should open the Services dropdown and navigate to each service page", () => {
    services.forEach(({ label, href, heading }) => {
      cy.contains("a", label).click();
      cy.url().should("include", href);
      cy.get("h1").should("contain.text", heading);
      cy.visit("http://localhost:3000");
      cy.contains("button", "SERVICES").click();
    });
  });
});
