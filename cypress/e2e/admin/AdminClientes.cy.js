describe('Pantalla de Inicio del Cliente', () => {
  beforeEach(() => {
    // Primero, hacer login antes de visitar la página de inicio
    cy.visit('/login'); // Visita la página de login

    // Completa el formulario de login
    cy.get('input').first().type('admin');; // Asegúrate de usar un email válido
    cy.get('input').last().type('admin'); // Asegúrate de usar una contraseña válida
    cy.contains('button', 'Login').click(); // Haz clic en el botón de login

    // Espera la redirección a la página principal
    cy.url().should('include', '/admin'); // Verifica que redirige a la página principal
  });

  it('Debería mostrar los elementos principales', () => {
    cy.contains('h1', 'Hair Vibe').should('be.visible'); // Verifica el título principal
    
    cy.get('nav').should('be.visible'); // Verifica que la barra de navegación esté visible
  });

  it('Debería mostrar la imagen de fondo', () => {
    cy.get('img[alt="Background"]').should('be.visible'); // Verifica que la imagen de fondo esté visible
  });

  it('Debería redirigir a la página de servicios al hacer clic en "clientes"', () => {
    cy.contains('button', 'Clientes').click(); // Hace clic en el botón "Reservar"
    cy.url().should('include', '/clientes'); // Verifica que la URL contenga "/servicios"
  });
});
