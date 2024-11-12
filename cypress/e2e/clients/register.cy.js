describe('Pantalla de Registro', () => {
  beforeEach(() => {
    cy.visit('/register'); // Ajusta la URL si es diferente en tu proyecto
  });

  it('Debería mostrar los elementos principales', () => {
    cy.contains('h1', 'Hair Vibe').should('be.visible');
    cy.get('input[placeholder="Nombre completo"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Contraseña"]').should('be.visible');
    cy.contains('button', 'Register').should('be.visible');
  });

  it('Debería mostrar un mensaje de error si falta el email o la contraseña', () => {
    cy.get('input[placeholder="Nombre completo"]').type('Nombre Prueba');
    cy.contains('button', 'Register').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Incorrect email or password');
    });
  });


});
