describe('template spec', () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
    cy.viewport(1920, 1080);
});
it("Click on the map", () => {
  cy.get('#map-img').click(550, 550); 


  cy.get('#marker').invoke('attr', 'data-latitude').then((latitude) => {
    console.log(latitude);
    expect(latitude).to.equal('43.78');
  });
});
})
