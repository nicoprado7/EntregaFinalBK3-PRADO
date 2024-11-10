# Entrega Final - Curso de Backend III
Este es el backend de un sistema de adopciones de mascotas. La API permite gestionar usuarios, mascotas y adopciones, proporcionando endpoints para crear, consultar y actualizar estos recursos.
# Proyecto de Adopciones
# Autor: Nicolás Prado


## Tecnologías empleadas
- Node.js: Entorno de ejecución del servidor.
- Express.js: Framework para la creación de la API REST.
- MongoDB: Base de datos NoSQL.
- Swagger: Documentación interactiva de la API.
- JWT (JSON Web Tokens): Autenticación de usuarios.
- Chai / Supertest: Herramientas para pruebas funcionales.

## EndPoints de la API
- Autenticación y Usuarios
POST /api/sessions/register: Registro de un nuevo usuario.
POST /api/sessions/login: Iniciar sesión.
GET /api/sessions/current: Obtener la información del usuario actual.
- Usuarios
GET /api/users: Obtener todos los usuarios.
GET /api/users/:uid: Obtener un usuario por su ID.
POST /api/users: Crear un nuevo usuario.
PUT /api/users/:uid: Actualizar un usuario.
DELETE /api/users/:uid: Eliminar un usuario.
- Mascotas
GET /api/pets: Obtener todas las mascotas.
POST /api/pets: Crear una nueva mascota.
PUT /api/pets/:pid: Actualizar una mascota.
DELETE /api/pets/:pid: Eliminar una mascota.
- Adopciones
GET /api/adoptions: Obtener todas las adopciones.
GET /api/adoptions/:aid: Obtener una adopción por su ID.
POST /api/adoptions/:uid/:pid: Crear una adopción.

## Documentación de la API

La API está documentada usando Swagger. Puedes acceder a la documentación de la API de manera interactiva en el siguiente enlace cuando el servidor esté corriendo:

http://localhost:8080/api-docs

## Docker
- Esta es la imagen de Docker para el proyecto Adoption. Puedes descargarla con el siguiente comando:

    docker pull nicoprado7/adoption1:1.0.0


## Instalación
- Clona el repositorio: git clone https://github.com/nicoprado7/EntregaFinalBK3-PRADO
- Instala las dependencias: npm install
- Inicia el servidor: npm run dev