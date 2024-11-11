# Informe de Funcionalidades de la Aplicación Peluquería Hair Vibe

## Descripción General
**"Hair Vibe"** es una aplicación de peluquería desarrollada para gestionar la reserva de citas de manera eficiente, tanto para los clientes como para los peluqueros y administradores. Su objetivo es optimizar el flujo de trabajo en el salón, permitiendo a los clientes reservar servicios específicos, seleccionar a su peluquero de preferencia y dejar reseñas. Cada tipo de usuario (cliente, peluquero y administrador) tiene un conjunto de funcionalidades que facilita la gestión y administración de citas y usuarios. Además, la aplicación implementa un sistema seguro de autenticación y autorización, garantizando que solo los usuarios autorizados puedan acceder a las funcionalidades correspondientes.

### Roles de Usuario
La aplicación cuenta con tres roles de usuario, cada uno con permisos específicos:
1. **Cliente**: Puede explorar y reservar servicios, así como dejar reseñas.
2. **Peluquero**: Gestiona las reservas de su agenda y recibe reseñas.
3. **Admin**: Supervisa la gestión completa de usuarios, reservas y servicios.

---

## Funcionalidades por Rol de Usuario

### Funcionalidades para el Cliente
Los clientes tienen acceso a varias funcionalidades que les permiten interactuar de manera fluida con los servicios de la peluquería:

- **Exploración de Servicios**: Los clientes pueden ver todos los servicios que ofrece la peluquería, con información detallada de cada uno. Esta sección facilita la selección del servicio deseado antes de realizar una reserva.

- **Reserva de Citas**: Al seleccionar un servicio, el cliente puede acceder a una página de reservas donde se presenta un calendario interactivo. Aquí, el cliente elige la fecha y la hora de inicio de la cita. La hora de finalización se ajusta automáticamente en función de la duración prevista del servicio. Adicionalmente, el cliente tiene la opción de elegir el peluquero con quien desea realizar el servicio, lo que garantiza una experiencia personalizada. Si el cliente confirma la cita, la reserva se crea y se agrega a su lista de reservas.

- **Listado de Peluqueros y Reseñas**: En la página de peluqueros, los clientes pueden ver el perfil de cada peluquero, incluyendo su nombre, correo electrónico y calificación promedio. Esta sección permite a los clientes seleccionar al peluquero más adecuado para su cita. En la misma página, los clientes pueden crear una reseña calificando el servicio con una puntuación de 1 a 5. También se muestran los comentarios más recientes que otros clientes han dejado, permitiendo una evaluación de la calidad del servicio.

- **Gestión de Reservas**: Los clientes tienen acceso a una lista completa de todas sus reservas, donde pueden ver detalles como la fecha y hora de la cita, el servicio seleccionado y el peluquero asignado. Además, el cliente puede cancelar cualquiera de sus reservas si lo desea, eliminándola de su lista.

### Funcionalidades para el Peluquero
Los peluqueros pueden gestionar sus citas y ver las reseñas que los clientes han dejado sobre sus servicios:

- **Gestión de Reservas**: Los peluqueros tienen acceso a una lista de todas sus citas, lo que les permite organizar su agenda de manera efectiva. Una vez completada una cita, el peluquero puede cambiar el estado de la reserva a "completada", indicando que el servicio ha sido realizado.

- **Visualización de Reseñas**: Los peluqueros pueden ver los comentarios y reseñas que han recibido, así como su calificación general. Esto les permite conocer el nivel de satisfacción de sus clientes y hacer mejoras en sus servicios si es necesario.

### Funcionalidades para el Administrador
El administrador tiene acceso completo a todas las funcionalidades y puede gestionar usuarios, reservas y servicios:

- **Gestión de Usuarios**: El administrador puede ver la lista completa de clientes y peluqueros registrados en la aplicación. Además, puede crear nuevos usuarios con rol de peluquero o administrador, otorgando los permisos necesarios para cada función.

- **Gestión de Servicios**: El administrador puede crear y editar los servicios ofrecidos por la peluquería, asegurando que la oferta de servicios esté actualizada y sea atractiva para los clientes.

- **Visualización de Reseñas**: El administrador puede ver todas las reseñas de los peluqueros, lo que le permite supervisar la calidad del servicio y garantizar la satisfacción del cliente.

- **Gestión de Reservas**: El administrador tiene acceso a todas las reservas realizadas en la aplicación y puede modificar o cancelar cualquier reserva según sea necesario. Esta funcionalidad asegura que el administrador pueda gestionar cualquier eventualidad y coordinar los horarios de la peluquería de manera eficiente.

---

## Implementación de Autenticación y Autorización

### Autenticación
La autenticación de **Hair Vibe** se gestiona mediante JSON Web Tokens (JWT), proporcionando una forma segura y confiable de validar la identidad de los usuarios en cada solicitud. Este proceso se desarrolla en el backend de la aplicación, implementado con **NestJS**.

1. **Inicio de Sesión**: Cuando un usuario se autentica con su correo electrónico y contraseña, el backend genera un token JWT, que luego se envía al frontend (Next.js) del cliente.
  
2. **Almacenamiento y Reutilización del Token**: Este token JWT se almacena de forma segura en el frontend y se envía automáticamente en las cabeceras de las solicitudes posteriores al backend. De esta manera, cada solicitud que el cliente envía está acompañada del token, lo que permite al backend verificar de manera continua la identidad del usuario y gestionar sus permisos.

Este enfoque con JWT permite una autenticación sin estado, manteniendo la seguridad de las sesiones sin requerir almacenamiento en el servidor.

### Autorización
La autorización se controla mediante decoradores y guards en el backend de NestJS, asegurando que solo los usuarios con los permisos adecuados puedan acceder a ciertas funcionalidades.

1. **@Auth()**: Este decorador protege las rutas y verifica que el usuario esté autenticado antes de permitirle el acceso.
  
2. **RoleProtected()**: Define roles específicos que pueden acceder a una ruta en particular. Este decorador permite al administrador, por ejemplo, gestionar usuarios y reservas sin que los clientes o peluqueros tengan acceso a estas funcionalidades.

3. **UserRoleGuard**: Este guard se encarga de verificar el rol del usuario para cada solicitud protegida. Si un usuario intenta acceder a una ruta para la cual no tiene los permisos necesarios, el acceso le es denegado. Esto garantiza que cada usuario interactúe únicamente con las funcionalidades permitidas por su rol, promoviendo así la seguridad y estabilidad de la aplicación.

---

## Gestión del Estado de la Aplicación

El estado global de la aplicación se gestiona a través de **Redux**, lo que permite un control centralizado de los datos y facilita la sincronización entre los diferentes componentes y vistas. En **Hair Vibe**, el store de Redux se utiliza para manejar los siguientes estados clave:

1. **Usuarios**: Se controla el estado de los datos de los usuarios, incluyendo su información personal, rol y autenticación.
2. **Comentarios**: Los comentarios y reseñas de los clientes hacia los peluqueros se almacenan y gestionan en el estado de Redux, facilitando su visualización y actualización.
3. **Servicios**: Los detalles de los servicios disponibles en la peluquería se almacenan en el store de Redux, lo que permite que los clientes vean siempre la información actualizada de los servicios.
4. **Reservas**: Todas las reservas se mantienen en el estado de Redux, permitiendo a los clientes, peluqueros y administradores consultar y modificar la información de las citas en tiempo real.

El uso de Redux facilita el acceso y actualización de la información en diferentes partes de la aplicación, promoviendo la consistencia de los datos y evitando problemas de sincronización.

---

## Protección de Rutas en el Frontend

En el **frontend de Next.js**, la gestión de estado y la autorización se llevan a cabo de la siguiente forma:

1. **Uso del Token JWT**: Una vez autenticado, el token JWT recibido del backend se almacena y se incluye en las cabeceras de cada solicitud. Esto permite al backend verificar la identidad y permisos del usuario en cada interacción.

2. **Protección de Rutas mediante Middleware**: Un middleware intercepta todas las solicitudes en el frontend para asegurar que los usuarios solo accedan a rutas correspondientes a su rol y nivel de autorización.
   - **Redirección al Login**: Si un usuario intenta acceder a una ruta protegida sin estar autenticado, el middleware lo redirige automáticamente a la página de inicio de sesión.
   - **Redirección según el Rol del Usuario**: Si un usuario autenticado intenta acceder a una ruta no autorizada para su rol (por ejemplo, un cliente intentando acceder a funciones de administrador), el middleware lo redirige al inicio correspondiente a su rol, previniendo así accesos no autorizados.

Este enfoque de seguridad garantiza que solo los usuarios con el rol adecuado puedan interactuar con las rutas correspondientes, proporcionando una experiencia segura y controlada.

