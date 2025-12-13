# Convenciones del Proyecto – HR Platform

Este documento define las **convenciones técnicas y de estilo** que deben seguir todos los agentes que contribuyan al proyecto.

Su objetivo es asegurar la **consistencia, legibilidad y mantenibilidad** del código y la documentación.

---

## 1. Nomenclatura (Naming Conventions)

### 1.1 General

*   **Idioma:** Inglés para todo el código (variables, funciones, clases). Español para documentación y comentarios si es necesario aclarar un término de negocio específico de la región.
*   **Claridad sobre brevedad:** `calculateAnnualLeave` es mejor que `calcLev`.

### 1.2 Variables y Funciones

*   **Estilo:** `camelCase`.
    *   Ejemplo: `const currentUser = ...;`
    *   Ejemplo: `function calculateSalary(...)`

### 1.3 Clases y Tipos

*   **Estilo:** `PascalCase` (o `UpperCamelCase`).
    *   Ejemplo: `class EmployeeService { ... }`
    *   Ejemplo: `interface UserProfile { ... }`

### 1.4 Constantes

*   **Estilo:** `UPPER_CASE` con guiones bajos.
    *   Ejemplo: `const MAX_LOGIN_ATTEMPTS = 5;`

### 1.5 Archivos

*   **Componentes/Módulos:** `PascalCase.js` (ej. `EmployeeCard.js`)
*   **Servicios/Rutas/Config:** `kebab-case.js` (ej. `user-routes.js`, `database-config.js`)

---

## 2. Estilo de Código (Code Style)

### 2.1 JavaScript/Node.js

*   **Formateador:** Prettier con la configuración por defecto.
*   **Linter:** ESLint con un conjunto de reglas estándar (ej. `eslint:recommended`).
*   **Módulos:** Usar `import`/`export` (ES Modules) en lugar de `require`/`module.exports` (CommonJS) siempre que sea posible.
*   **Punto y coma:** Obligatorio.

### 2.2 Comentarios

*   **Cuándo:** Comentar lógica de negocio compleja, no código obvio.
*   **Cómo:** Usar JSDoc para funciones y módulos para describir propósito, parámetros y valores de retorno.

---

## 3. Contratos de API (API Contracts)

### 3.1 Endpoints

*   **Formato:** RESTful. Usar sustantivos en plural para las colecciones.
    *   `GET /api/v1/employees` (Obtener todos los empleados)
    *   `GET /api/v1/employees/{id}` (Obtener un empleado)
    *   `POST /api/v1/employees` (Crear un empleado)
    *   `PUT /api/v1/employees/{id}` (Actualizar un empleado)
    *   `DELETE /api/v1/employees/{id}` (Eliminar un empleado)

### 3.2 Versionado

*   Incluir el número de versión en la URL: `/api/v1/...`

### 3.3 Payloads (Request/Response)

*   **Formato:** JSON.
*   **Estilo de claves:** `camelCase`.
*   **Respuestas de error:** Usar una estructura consistente.
    ```json
    {
      "error": {
        "code": "VALIDATION_ERROR",
        "message": "El campo 'email' es inválido.",
        "details": [
          { "field": "email", "issue": "Formato incorrecto" }
        ]
      }
    }
    ```

---

## 4. Commits en Git

### 4.1 Mensajes de Commit

*   **Formato:** Conventional Commits.
    *   `feat: Implementar login de usuarios`
    *   `fix: Corregir cálculo de vacaciones en años bisiestos`
    *   `docs: Actualizar README con instrucciones de despliegue`
    *   `style: Formatear código con Prettier`
    *   `refactor: Mover lógica de negocio a capa de servicio`
    *   `test: Añadir pruebas unitarias para el módulo de permisos`
    *   `chore: Actualizar dependencias de npm`

### 4.2 Ramas

*   `main`: Rama principal, representa el estado de producción.
*   `develop`: Rama de integración para el trabajo en curso.
*   `test`: Rama de pruebas.
*   **Ramas de feature:** `feature/nombre-corto-del-feature` (ej. `feature/user-auth`)
*   **Ramas de bugfix:** `fix/descripcion-corta-del-bug` (ej. `fix/login-error`)

---

## 5. Documentación

*   **Bitácoras de Agente:** Cada agente debe registrar sus decisiones y progreso en su archivo correspondiente en `docs/agents/`.
*   **READMEs:** Cualquier nuevo módulo complejo debe tener su propio `README.md` explicando su propósito y uso.

---

Este documento es una guía viva y puede ser actualizado por el **Agente 0 (Arquitectura)** según las necesidades del proyecto.
