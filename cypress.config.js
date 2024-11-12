const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://peluqueria-nest.onrender.com',
    setupNodeEvents(on, config) {},
  },
}) 