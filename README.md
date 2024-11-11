# Proyecto "Peluquería Hair Vibe"

## Descripción del Proyecto

**Hair Vibe** es una aplicación desarrollada en **Next.js** para la gestión de reservas de servicios en una peluquería. Los usuarios pueden navegar por los servicios, reservar citas y calificar el servicio recibido. La aplicación cuenta con tres tipos de usuarios: **clientes**, **peluqueros** y **administradores**, cada uno con funcionalidades específicas adaptadas a sus necesidades dentro del sistema.

---

## Instrucciones para Ejecutar la Aplicación

Sigue los pasos a continuación para ejecutar la aplicación localmente.

### Clonar el Repositorio

1. Clona el repositorio desde GitHub para obtener el código fuente:

   ```bash
   git clone https://github.com/Br14nMat/peluqueria-nextjs.git
   cd peluqueria-nextjs

## Instalar Dependencias

2. Instala las dependencias del proyecto usando npm. Asegúrate de utilizar la opción `--legacy-peer-deps`:

    ```bash
    npm install --legacy-peer-deps

## Configurar Variables de Entorno

3. Configura la URL del backend en el archivo `next.config.ts` usando la variable de entorno `BACKEND_URL`:

    ```typescript
    module.exports = {
    env: {
        BACKEND_URL: "<URL_de_tu_Backend>"
    }
    }

## Iniciar la Aplicación

4. Una vez completados los pasos anteriores, inicia la aplicación en modo de desarrollo con el siguiente comando:

    ```bash
    npm run dev

La aplicación estará disponible en http://localhost:3000

