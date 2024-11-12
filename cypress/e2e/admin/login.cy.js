describe('Pantalla de Login', () => {
    beforeEach(() => {
      cy.visit('/login'); // Verifica que el servidor Next.js esté corriendo en el puerto configurado
    });
  
  
    it('Debería mostrar un mensaje de error si faltan el usuario o la contraseña', () => {
      cy.contains('button', 'Login').click();
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Please enter username');
      });
    });
  
    it('Debería redirigir a la página principal después de un login exitoso', () => {
      cy.get('input').first().type('admin');
      cy.get('input').last().type('admin');
      cy.contains('button', 'Login').click();
  
      cy.url().should('include', '/'); // Cambia '/' si la página principal tiene otra ruta
    });
  
    it('Debería mostrar un mensaje de error si el login falla', () => {
      cy.get('input').first().type('incorrect@example.com');
      cy.get('input').last().type('wrongpassword');
      cy.contains('button', 'Login').click();
  
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Login error');
      });
    });
  });
  