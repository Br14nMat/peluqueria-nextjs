describe('Pantalla de Inicio del Cliente', () => {
    beforeEach(() => {
      
      cy.visit('/login'); 
  
      
      cy.get('input').first().type('test@example.com'); 
      cy.get('input').last().type('password123'); 
      cy.contains('button', 'Login').click(); 
  
      
      cy.url().should('include', '/');

      cy.contains('Peluqueros').click();
  
      
      cy.url().should('include', '/peluqueros');
    });
  
    it('debería permitir al cliente dejar un comentario para un peluquero', () => {
        // Selecciona un peluquero de la lista
        cy.get('[data-cy="reseñar-button-sebastian"]').click()

        // Asegúrate de que la URL cambie a la página de comentarios
        cy.url().should('include', '/comentarios');

        // Escribe un comentario
        cy.get('textarea').type('¡Excelente servicio! Muy profesional.');

        // Selecciona una calificación
        cy.get('select#rating').select('5');

        // Envía el comentario
        cy.contains('button', 'Agregar').click();

        
        
    });
  
  
  });
  