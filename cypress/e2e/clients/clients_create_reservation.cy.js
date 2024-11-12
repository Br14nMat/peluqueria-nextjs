describe('Pantalla de Inicio del Cliente', () => {
    beforeEach(() => {
      // Primero, hacer login antes de visitar la página de inicio
      cy.visit('/login'); // Visita la página de login
  
      // Completa el formulario de login
      cy.get('input').first().type('test@example.com');; // Asegúrate de usar un email válido
      cy.get('input').last().type('password123'); // Asegúrate de usar una contraseña válida
      cy.contains('button', 'Login').click(); // Haz clic en el botón de login
      // Espera la redirección a la página principal
      cy.url().should('include', '/');
      
      
      cy.contains('button', 'Reservar').click(); // Hace clic en el botón "Reservar"
      cy.url().should('include', '/servicios');// Verifica que redirige a la página principal
    });
  

  it('Debería permitir al cliente seleccionar un servicio y crear una reserva', () => {
    // Selecciona un servicio específico
    cy.get('[data-cy="reservar-button-Mullet"]').click();// Cambia el índice según la tarjeta que quieras seleccionar

    // Verifica que redirige al calendario
    cy.url().should('include', '/calendario');

    // Selecciona un peluquero
    cy.get('select#hairdresser').select('sebastian'); // Reemplaza con un nombre válido

    // Selecciona una fecha y hora en el calendario
    cy.get('.fc-timegrid-slot').eq(21).scrollIntoView().click();
 // Asegúrate de que esta clase coincida con los slots del calendario

    // Confirma la reserva
    cy.contains('button', 'Confirmar').click();

    // Verifica que la reserva fue creada exitosamente
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Reservación creada con exito!');
    });

    // Verifica que redirige a la página de reservas
    cy.url().should('include', '/reservas');
  });
});
