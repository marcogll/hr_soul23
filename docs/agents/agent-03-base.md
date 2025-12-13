# Bitácora del Agente 3 – Base de Datos & Modelado

Este documento registra las decisiones, cambios y observaciones del **Agente 3**.

Su propósito es mantener un historial claro y auditable de las tareas y soluciones implementadas.

---

## Entradas de Bitácora

### [Fecha] - Tarea/Decisión

*   **Contexto:** Se necesitaba una base de datos y un modelo de datos para poder continuar con el desarrollo de la aplicación.
*   **Acción/Implementación:**
    * Se ha definido un contrato de datos en `docs/API_CONTRACTS.md` que servirá como única fuente de verdad para los modelos de datos.
    * Se ha seleccionado `knex.js` con `sqlite3` como sistema de base de datos para el desarrollo inicial.
    * Se ha configurado la conexión a la base de datos y un sistema de migraciones.
    * Se han creado las migraciones iniciales para todas las tablas requeridas.
    * Se han creado seeds para poblar la base de datos con datos de prueba.
*   **Resultado:** La base de datos está lista y poblada con datos iniciales. El esquema está versionado a través de migraciones.
*   **Observaciones:** El uso de `sqlite3` es temporal para facilitar el desarrollo. Se deberá migrar a una base de datos más robusta como PostgreSQL para producción.

---
