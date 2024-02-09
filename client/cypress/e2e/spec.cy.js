describe('template spec', () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  // Fonction pour vérifier les valeurs des filtres
  function checkCitiesValue(){
    cy.get('.city-marker').its('length').should('be.greaterThan', 0);

    cy.get('#citiesNum').invoke('val').then((citiesNum) => {
      cy.get('.city-marker').its('length').should('be.lessThan', Number(citiesNum)+1);
    });

    cy.get('#population').invoke('val').then((populationFilter) => {
      cy.get('#rangeKm').invoke('val').then((radiusFilter) => {
    
          // Vérifier chaque marqueur de ville
          cy.get('.city-marker').each(($marker) => {
              // Obtenir les données de la ville
              const population = parseInt($marker.attr('data-population'));
              const distance = parseFloat($marker.attr('data-distance'));
    
              // Vérifier que la population est supérieure au filtre
              expect(population).to.be.at.least(parseInt(populationFilter));
    
              // Vérifier que la distance est inférieure au filtre
              expect(distance).to.be.at.most(parseFloat(radiusFilter));
          });
      });
    });
  }


  it("Basic test, click on the map", () => {
    cy.get('#map-img').then(($img) => {
      // Obtenir les dimensions de l'image
      const width = $img.width();
      const height = $img.height();

      // Calculer les coordonnées en pourcentage
      const x = width * 0.5; // 50% de la largeur
      const y = height * 0.2; // 20% de la hauteur

      // Cliquer sur l'image aux coordonnées calculées
      cy.get('#map-img').click(x, y);
    });


    checkCitiesValue();
  });


  it("Change filter value", () => {
    // Changer les valeurs des filtres
    cy.get('#population').invoke('val').then((populationFilter) => {
      cy.get('#population').invoke('val', parseInt(populationFilter) + 100000).trigger('input');
    });
    cy.get('#rangeKm').invoke('val').then((radiusFilter) => {
      cy.get('#rangeKm').invoke('val', parseInt(radiusFilter) + 100).trigger('input');
    });
    cy.get('#citiesNum').invoke('val').then((citiesNum) => {
      cy.get('#citiesNum').invoke('val', parseInt(citiesNum) + 100).trigger('input');
    });

    cy.get('#map-img').then(($img) => {
      // Obtenir les dimensions de l'image
      const width = $img.width();
      const height = $img.height();

      // Calculer les coordonnées en pourcentage
      const x = width * 0.5; // 50% de la largeur
      const y = height * 0.2; // 20% de la hauteur

      // Cliquer sur l'image aux coordonnées calculées
      cy.get('#map-img').click(x, y);
    });

    checkCitiesValue();

  });


  it("Change regions", () => {
    cy.get('#regionFilter').select('Île-de-France');

    cy.get('#map-img').then(($img) => {
      // Obtenir les dimensions de l'image
      const width = $img.width();
      const height = $img.height();

      // Calculer les coordonnées en pourcentage
      const x = width * 0.55; // 55% de la largeur
      const y = height * 0.3; // 30% de la hauteur

      // Cliquer sur l'image aux coordonnées calculées
      cy.get('#map-img').click(x, y);
    });

    checkCitiesValue();


    cy.get('#map-img').then(($img) => {
      // Obtenir les dimensions de l'image
      const width = $img.width();
      const height = $img.height();

      // Calculer les coordonnées en pourcentage
      const x = width * 0.6; // 50% de la largeur
      const y = height * 0.4; // 20% de la hauteur

      // Cliquer sur l'image aux coordonnées calculées
      cy.get('#map-img').click(x, y);
    });

    cy.get('.city-marker').should('not.exist');

  });

});