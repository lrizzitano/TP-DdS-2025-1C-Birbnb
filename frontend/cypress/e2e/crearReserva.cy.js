describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    cy.get('.contenedorCardsAlojamiento > div img').should('be.visible');

    cy.get('.contenedorCardsAlojamiento > div:nth-child(1) a > div > div').invoke('text').then((textoExtraido) => {
      let nombreAlojamiento = textoExtraido.trim();

      expect(nombreAlojamiento).to.not.be.empty;

      cy.get('.contenedorCardsAlojamiento > div:nth-child(1) a')
      .invoke('removeAttr', 'target') // para que no se abra en otra tab, asi podemos testear
      .click(); // nos vamos al alojamiento especifico
  
  
      cy.get('.contenedorAlojamiento .tituloAlojamiento h4').should('contain', nombreAlojamiento);
      cy.get('.contenedorAlojamiento .dataAlojamiento img').should('be.visible')
      
      cy.get('.contenedorAlojamiento .dataAlojamiento a').click()
    });
  })
})