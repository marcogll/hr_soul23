# Bitácora del Agente 1 – Infraestructura & DevOps

## Fecha: 2023-10-27

### Cambios Realizados

*   **Creación de `Dockerfile`:**
    *   Se ha añadido un `Dockerfile` para construir la imagen del servicio de Node.js.
    *   La imagen se basa in `node:18-alpine` para mantenerla ligera.
    *   Se exponen el puerto 3011 y se define el comando de inicio `node src/index.js`.

*   **Creación de `docker-compose.yml`:**
    *   Se ha creado un archivo `docker-compose.yml` para orquestar los servicios de la aplicación.
    *   Define dos servicios: `api` (el backend de Node.js) y `db` (una base de datos PostgreSQL).
    *   Configura una red `app-network` para la comunicación entre servicios.
    *   Se define un volumen `postgres-data` para la persistencia de los datos de la base de datos.

*   **Creación de `.env.example`:**
    *   Se ha añadido un archivo `.env.example` con las variables de entorno necesarias para la configuración de la base de datos y la aplicación.
