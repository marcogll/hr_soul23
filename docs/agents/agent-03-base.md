# Bitácora del Agente 3 – Base de Datos & Modelado

Este documento registra las decisiones, cambios y observaciones del **Agente 3**.

Su propósito es mantener un historial claro y auditable de las tareas y soluciones implementadas.

---

## Entradas de Bitácora

### 2024-07-29 - Creación del Sistema de Migraciones y Esquema Inicial

*   **Contexto:** La tarea principal del Agente 3 es establecer la base de datos como la "fuente única de verdad". Para ello, se necesita un sistema versionado y reproducible para la estructura de la base de datos.
*   **Acción/Implementación:**
    1.  Se inicializó un proyecto Node.js con `npm init`.
    2.  Se instalaron las dependencias `knex` y `pg`.
    3.  Se creó el archivo de configuración `knexfile.js` para definir la conexión a la base de datos.
    4.  Se generó la primera migración (`..._initial_schema.js`) utilizando el CLI de `knex`.
    5.  Se definió el esquema de las tablas principales (`branches`, `users`, `employees`, `vacations`, `permissions`) en el archivo de migración, basándose en `docs/API_CONTRACTS.md`.
*   **Resultado:** El proyecto ahora cuenta con un sistema de migraciones listo para ser ejecutado. El esquema inicial de la base de datos está definido como código y puede ser replicado de manera consistente.
*   **Observaciones:** Se añadió un archivo `.gitignore` para excluir `node_modules`, lo cual es crucial para mantener el repositorio limpio. La conexión en `knexfile.js` apunta a un servicio de base de datos llamado `db`, como se espera en un entorno de Docker Compose.

---
