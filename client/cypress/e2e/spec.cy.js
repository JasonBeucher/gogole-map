describe('template spec', () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.viewport(1920, 1080);
});
it("Click on the map", () => {
  cy.get('#map-img').click(550, 550); 
});
})