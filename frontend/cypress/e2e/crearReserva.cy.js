describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')

    // cambiando el div:nth-child(n) se hace la prueba completa sobre otro alojamiento
    cy.get('.contenedorCardsAlojamiento > div:nth-child(1) img').should('be.visible');

    // continuo el test dentro de then pq la busqueda del texto es asincrona y los demas chequeos dependen de ese texto
    cy.get('.contenedorCardsAlojamiento > div:nth-child(1) a > div > div').invoke('text').then((textoExtraido) => {
      let nombreAlojamiento = textoExtraido.trim();

      expect(nombreAlojamiento).to.not.be.empty;

      cy.get('.contenedorCardsAlojamiento > div:nth-child(1) a')
      .invoke('removeAttr', 'target') // para que no se abra en otra tab, asi podemos testear
      .click(); // nos vamos al alojamiento especifico

      cy.get('.contenedorAlojamiento .tituloAlojamiento h4').should('contain', nombreAlojamiento);
      cy.get('.contenedorAlojamiento .dataAlojamiento img').should('be.visible')
      
      cy.contains('a', 'Reservar')
      .click()

      cy.contains('button', 'Confirmar Reserva')
      .click();

      cy.get('[role="dialog"]') // agarro el modal de MUI
      .contains('Reserva confirmada');

      cy.contains('button', 'Ir a mis reservas').click()

      cy.get('[data-testid="ExpandMoreIcon"]').first().click();

      cy.get('.reservasContainer').first().find('div').first().find('p').contains(nombreAlojamiento)
    });
  })
})