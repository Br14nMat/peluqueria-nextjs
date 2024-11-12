# Informe de Funcionalidades de la Aplicación Peluquería Hair Vibe

## Descripción General
"**Hair Vibe**" es una aplicación de peluquería diseñada para gestionar la agenda de citas de manera eficiente, tanto para clientes como para peluqueros y administradores. Los clientes pueden reservar citas para distintos servicios, seleccionar el peluquero de su preferencia, y calificar la experiencia. Los peluqueros y administradores tienen acceso a funcionalidades específicas que permiten la gestión de citas y la organización de sus agendas. La autenticación y autorización aseguran que solo los usuarios autorizados puedan acceder a las funcionalidades según su rol.

### Roles de Usuario
La aplicación cuenta con tres tipos de usuarios, cada uno con un conjunto de funcionalidades específicas:
1. **Cliente**: Puede explorar y reservar servicios, listar peluqueros y dejar reseñas.
2. **Peluquero**: Puede gestionar las reservas de su agenda.
3. **Admin**: Tiene control completo sobre la gestión de usuarios, reservas y servicios.

---

## Funcionalidades por Rol de Usuario

### Funcionalidades para el Cliente
- **Exploración de Servicios**: Los clientes pueden ver todos los servicios disponibles y seleccionar el que desean reservar.
- **Reserva de Citas**: Al seleccionar un servicio, el cliente puede acceder a un calendario interactivo para elegir la fecha y hora de la cita. La hora de finalización se ajusta automáticamente en función de la duración prevista del servicio. Además, el cliente puede seleccionar al peluquero con quien desea tener la cita. Una vez confirmada, la reserva se genera exitosamente.
- **Listado de Peluqueros**: Los clientes pueden ver el perfil de cada peluquero, incluyendo su nombre, correo y calificación promedio. En la misma página pueden dejar una reseña y calificar el servicio con un puntaje de 1 a 5.
- **Gestión de Reservas**: Los clientes pueden ver la lista de todas sus reservas, incluyendo detalles de fecha, hora, servicio y peluquero asignado. Tienen la opción de cancelar cualquier reserva, eliminándola de su lista.

### Funcionalidades para el Peluquero
- **Gestión de Reservas**: Los peluqueros pueden listar todas sus reservas y, en caso de ser necesario, pueden modificar detalles como la fecha y hora o cancelar una reserva. Esta flexibilidad les permite manejar cambios en la agenda y disponibilidad.
- **Visualización en Calendario**: Las reservas de los peluqueros se reflejan en su calendario, lo que les facilita la visualización y organización de citas diarias y semanales.

### Funcionalidades para el Administrador
- **Gestión de Usuarios**: El administrador puede listar tanto a los clientes como a los peluqueros registrados en la aplicación.
- **Visualización de Agendas**: Puede ver la agenda completa de todos los usuarios y peluqueros, permitiendo una supervisión integral de las citas programadas.
- **Gestión de Reservas**: El administrador tiene acceso completo a las reservas de usuarios y peluqueros, y puede editar o cancelar citas cuando sea necesario.
- **Gestión de Servicios**: Puede crear, editar y gestionar los servicios disponibles en la peluquería, asegurándose de que estén actualizados y disponibles para los clientes.
- **Visualización de Reseñas**: El administrador puede ver las reseñas que los clientes han dejado para los peluqueros, lo que le permite monitorear la satisfacción de los usuarios.

---

## Implementación de Autenticación y Autorización

### Autenticación
La autenticación en **Hair Vibe** se maneja a través de JSON Web Tokens (JWT), proporcionando una forma segura y eficiente de validar la identidad de los usuarios en cada solicitud. En el método `loginUser()`, los usuarios se autentican usando su correo electrónico y contraseña. Una vez autenticado, el backend genera un token JWT que se envía al cliente. Este token es luego incluido en las solicitudes posteriores, lo que permite verificar la autenticidad del usuario en cada interacción.

### Autorización
La autorización se implementa mediante decoradores y un guard que limitan el acceso a ciertas rutas según el rol del usuario.

1. **@Auth()**: Este decorador asegura que solo los usuarios con los roles adecuados puedan acceder a rutas específicas. Se define el rol permitido para cada ruta, asegurando que, por ejemplo, solo un administrador pueda gestionar usuarios o editar servicios.
   
2. **RoleProtected()**: Almacena los roles requeridos en los metadatos de cada ruta y es invocado por `@Auth()` para verificar los permisos adecuados. Este enfoque garantiza que el acceso a las rutas esté restringido a los roles autorizados.
   
3. **UserRoleGuard**: Este guard controla que el usuario tenga el rol necesario para acceder a una ruta protegida. Si el usuario intenta acceder a una ruta sin los permisos requeridos, el acceso se le deniega automáticamente.

### Gestión de Estado y Protección de Rutas en el Frontend

En el **frontend de Next.js**, la autenticación y autorización se mantienen en cada solicitud gracias al token JWT recibido desde el backend. Este token se almacena y se incluye en los headers de cada solicitud, lo cual permite al backend verificar los permisos en cada interacción.

Para proteger las rutas, **se utiliza un middleware** que intercepta todas las solicitudes y determina si el usuario está autenticado y qué rol tiene en la aplicación:
- **Redirección al Login**: Si el usuario intenta acceder a una ruta sin estar autenticado, el middleware redirige automáticamente al login.
- **Redirección según el Rol**: Si un usuario autenticado intenta acceder a una ruta que no le corresponde (por ejemplo, un cliente accediendo a rutas de administrador), el middleware redirige al usuario al inicio de su rol correspondiente.

Este enfoque asegura que cada usuario tenga acceso únicamente a las funcionalidades de su rol, garantizando una experiencia de usuario segura y fluida.

---