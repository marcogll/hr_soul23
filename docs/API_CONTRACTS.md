# API & Data Contracts

Este documento es la **única fuente de verdad** para los modelos de datos y las APIs del sistema. Todos los agentes (backend, frontend, testing) deben adherirse a estos contratos.

---

## Modelos de Datos (Tablas)

### `socias`

Almacena la información de las empleadas.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `nombre` | `VARCHAR(255)` | Nombre de la socia |
| `apellido` | `VARCHAR(255)` | Apellido de la socia |
| `fecha_ingreso`| `DATE` | Fecha de ingreso a la empresa |
| `id_sucursal` | `INTEGER` | FK a `sucursales.id` |
| `activo` | `BOOLEAN` | `true` si está activa, `false` si no |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | Fecha de última modificación |

### `sucursales`

Almacena las diferentes sucursales o centros de trabajo.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `nombre` | `VARCHAR(255)` | Nombre de la sucursal |
| `direccion` | `TEXT` | Dirección física de la sucursal |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | Fecha de última modificación |

### `vacaciones`

Registra las solicitudes y periodos de vacaciones.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `id_socia` | `INTEGER` | FK a `socias.id` |
| `fecha_inicio` | `DATE` | Inicio del periodo vacacional |
| `fecha_fin` | `DATE` | Fin del periodo vacacional |
| `dias_tomados` | `INTEGER` | Cantidad de días hábiles |
| `estado` | `VARCHAR(50)` | `solicitada`, `aprobada`, `rechazada` |
| `ciclo_anual` | `VARCHAR(10)`| Ciclo al que corresponden, ej: "2023-2024" |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | Fecha de última modificación |

### `permisos`

Registra ausencias justificadas que no son vacaciones.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `id_socia` | `INTEGER` | FK a `socias.id` |
| `fecha` | `DATE` | Fecha del permiso |
| `horas` | `INTEGER` | `NULL` si es por día completo |
| `dias` | `INTEGER` | `NULL` si es por horas |
| `motivo` | `TEXT` | Razón del permiso |
| `estado` | `VARCHAR(50)` | `solicitado`, `aprobado`, `rechazado` |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | Fecha de última modificación |

### `eventos`

Log de eventos para webhooks.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `tipo_evento` | `VARCHAR(100)`| Ej: `vacaciones.solicitada` |
| `payload` | `JSON` | Datos del evento |
| `endpoint_url` | `VARCHAR(255)`| URL a la que se envió el webhook |
| `estado_entrega`| `VARCHAR(50)` | `pendiente`, `enviado`, `fallido` |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |

### `configuraciones`

Almacena configuraciones clave-valor para el sistema.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `clave` | `VARCHAR(100)`| Clave única de configuración |
| `valor` | `TEXT` | Valor de la configuración |
| `descripcion` | `TEXT` | Para qué sirve la configuración |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | Fecha de última modificación |

### `usuarios`

Usuarios que pueden acceder al sistema.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `nombre` | `VARCHAR(255)` | Nombre del usuario |
| `email` | `VARCHAR(255)`| Email único para login |
| `password_hash`| `VARCHAR(255)`| Hash de la contraseña |
| `rol` | `VARCHAR(50)` | `root`, `admin`, `user` |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | Fecha de última modificación |

### `permisos_granulares`

Define permisos específicos por usuario y recurso.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | `INTEGER` | PK, Auto-increment |
| `id_usuario` | `INTEGER` | FK a `usuarios.id` |
| `recurso` | `VARCHAR(100)`| Ej: `socias`, `vacaciones` |
| `accion` | `VARCHAR(50)` | `crear`, `leer`, `actualizar`, `eliminar` |
| `permitido` | `BOOLEAN` | `true` si tiene el permiso |
| `created_at` | `TIMESTAMP` | Fecha de creación del registro |
| `updated_at` | `TIMESTAMP` | Fecha de última modificación |

---
