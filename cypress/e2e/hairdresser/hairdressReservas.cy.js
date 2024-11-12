describe('Pantalla de Inicio del Cliente', () => {
    beforeEach(() => {
      // Primero, hacer login antes de visitar la página de inicio
      cy.visit('/login'); // Visita la página de login
  
      // Completa el formulario de login
      cy.get('input').first().type('peluquero'); // Asegúrate de usar un email válido
      cy.get('input').last().type('peluquero'); // Asegúrate de usar una contraseña válida
      cy.contains('button', 'Login').click(); // Haz clic en el botón de login
  
      // Espera la redirección a la página principal
      cy.url().should('include', '/hairdresser'); // Verifica que redirige a la página principal
    });
  

    it('Debería mostrar la imagen de fondo', () => {
      cy.get('img[alt="Background"]').should('be.visible'); // Verifica que la imagen de fondo esté visible
    });
  
    it('Debería navegar a la página de Peluqueros desde el menú de navegación', () => {
      // Hacer clic en el enlace "Peluqueros" desde la barra de navegación
      cy.contains('Reservas').click();
  
      // Verifica que la URL cambió a la página de peluqueros
      cy.url().should('include', '/reservas');
  
     
    });
  });
  