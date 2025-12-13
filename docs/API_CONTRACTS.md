# Contratos de API y Modelos de Datos – HR Platform

Este documento define los **contratos formales** para la API REST y las estructuras de datos del sistema. Sirve como la **fuente única de verdad** para los agentes de Backend (Agente 2), Frontend (Agente 10) y Testing (Agente 11).

Cualquier desviación de este contrato debe ser discutida y aprobada por el Agente 0 (Arquitectura).

---

## 1. Modelos de Datos Principales

### 1.1 Socia (`Employee`)

Representa a un miembro del personal.

```json
{
  "id": "s-a8b7c6d5",
  "firstName": "Ana",
  "lastName": "García",
  "email": "ana.garcia@example.com",
  "hireDate": "2023-01-15T10:00:00Z",
  "branchId": "b-f2e1d0c9",
  "isActive": true,
  "createdAt": "2023-01-10T09:00:00Z",
  "updatedAt": "2023-01-10T09:00:00Z"
}
```

### 1.2 Vacación (`Vacation`)

Representa una solicitud de vacaciones.

```json
{
  "id": "v-1a2b3c4d",
  "employeeId": "s-a8b7c6d5",
  "startDate": "2024-08-01",
  "endDate": "2024-08-05",
  "daysUsed": 5,
  "status": "APPROVED", // PENDING, APPROVED, REJECTED
  "cycleYear": 2024,
  "requestedAt": "2024-06-10T11:00:00Z",
  "approvedBy": "u-d9e8f7g6",
  "approvedAt": "2024-06-11T15:30:00Z"
}
```

### 1.3 Permiso (`Permission`)

Representa una solicitud de permiso (ausencia no vacacional).

```json
{
  "id": "p-5e6f7g8h",
  "employeeId": "s-a8b7c6d5",
  "permissionDate": "2024-07-20",
  "hours": 4, // 0 si es día completo
  "reason": "Cita médica",
  "status": "APPROVED", // PENDING, APPROVED, REJECTED
  "requestedAt": "2024-07-18T09:00:00Z"
}
```

### 1.4 Sucursal (`Branch`)

Representa una ubicación física.

```json
{
  "id": "b-f2e1d0c9",
  "name": "Sucursal Centro",
  "address": "Av. Principal 123, Ciudad"
}
```

### 1.5 Usuario (`User`)

Representa un usuario del sistema con permisos.

```json
{
  "id": "u-d9e8f7g6",
  "username": "admin_juan",
  "role": "ADMIN", // ROOT, ADMIN, USER
  "permissions": [
    "socias.read",
    "vacaciones.approve",
    "permisos.read"
  ]
}
```

---

## 2. Contratos de API (Endpoints)

Todos los endpoints siguen el prefijo `/api/v1`.

### 2.1 Health Check

*   **Endpoint:** `GET /health`
*   **Descripción:** Verifica el estado del servicio.
*   **Respuesta Exitosa (200 OK):**
    ```json
    {
      "status": "ok",
      "timestamp": "2024-01-01T12:00:00Z"
    }
    ```

### 2.2 Gestión de Socias (`/employees`)

*   **`GET /employees`**
    *   **Descripción:** Obtiene una lista de todas las socias.
    *   **Respuesta:** `200 OK` con un array de objetos `Socia`.

*   **`GET /employees/{id}`**
    *   **Descripción:** Obtiene una socia por su ID.
    *   **Respuesta:** `200 OK` con un objeto `Socia`.

*   **`POST /employees`**
    *   **Descripción:** Crea una nueva socia.
    *   **Request Body:** Objeto `Socia` (sin `id`, `createdAt`, `updatedAt`).
    *   **Respuesta:** `201 Created` con el objeto `Socia` completo.

*   **`PUT /employees/{id}`**
    *   **Descripción:** Actualiza una socia existente.
    *   **Request Body:** Objeto `Socia` con los campos a actualizar.
    *   **Respuesta:** `200 OK` con el objeto `Socia` actualizado.

### 2.3 Gestión de Vacaciones (`/vacations`)

*   **`GET /employees/{employeeId}/vacations`**
    *   **Descripción:** Obtiene el historial de vacaciones de una socia.
    *   **Respuesta:** `200 OK` con un array de objetos `Vacacion`.

*   **`POST /employees/{employeeId}/vacations`**
    *   **Descripción:** Solicita nuevas vacaciones para una socia.
    *   **Request Body:** `{ "startDate": "YYYY-MM-DD", "endDate": "YYYY-MM-DD" }`
    *   **Respuesta:** `201 Created` con el objeto `Vacacion` creado.

*   **`PUT /vacations/{vacationId}/status`**
    *   **Descripción:** Aprueba o rechaza una solicitud de vacaciones (solo Admins).
    *   **Request Body:** `{ "status": "APPROVED" }`
    *   **Respuesta:** `200 OK` con el objeto `Vacacion` actualizado.

---

Este documento evolucionará. Los cambios serán comunicados y registrados por el Agente 0.
