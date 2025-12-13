# Bitácora del Agente 0 – Arquitectura & Orquestación

Este documento registra las decisiones, cambios y observaciones del **Agente 0**.

Su propósito es mantener un historial claro y auditable de las directrices arquitectónicas que gobiernan el proyecto.

---

## Entradas de Bitácora

### 2024-07-29 - Definición de Contratos de API y Datos

*   **Contexto:** Para asegurar un desarrollo coherente y desacoplado entre los agentes de backend, frontend y testing, era necesario establecer una fuente única de verdad para las estructuras de datos y las interfaces de la API.
*   **Decisión/Acción:** Se creó el documento `docs/API_CONTRACTS.md`.
*   **Justificación:** Este documento previene la ambigüedad y reduce la fricción entre agentes. Define los modelos de datos principales (Socia, Vacación, Permiso) y los endpoints RESTful iniciales, permitiendo que el desarrollo en paralelo comience sobre una base sólida y acordada.
*   **Impacto:** Afecta principalmente a:
    *   **Agente 2 (Backend):** Tiene una especificación clara de qué construir.
    *   **Agente 10 (Frontend):** Sabe qué datos esperar y cómo interactuar con la API.
    *   **Agente 11 (Testing):** Tiene una referencia para escribir los casos de prueba.

### 2024-07-29 - Creación de Estructura Inicial

*   **Contexto:** El repositorio inicial carecía de una estructura para guiar el trabajo de los agentes de IA/humanos.
*   **Decisión/Acción:** Se creó la estructura de directorios (`src`, `docs/agents`), los archivos de bitácora para cada agente y el documento de convenciones (`docs/CONVENTIONS.md`).
*   **Justificación:** Esta estructura establece un flujo de trabajo claro, promueve la documentación consistente y asegura que todos los agentes operen bajo las mismas reglas.
*   **Impacto:** Afecta a todos los agentes.

---
