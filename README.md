<div align="center">

<a href="https://soul23.mx">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/marcogll/mg_data_storage/refs/heads/main/soul23/logo/soul23_logo_wh.png">
  <img src="https://raw.githubusercontent.com/marcogll/mg_data_storage/refs/heads/main/soul23/logo/soul23_logo_blk.png" alt="Soul23" width="110">
</picture>
</a>

</div>

# Hr Soul23

Sistema de recursos humanos y gestión de personal 👥

<p>
  <img src="https://img.shields.io/badge/español-111111?style=flat-square&logo=googletranslate&logoColor=white" alt="Español">
</p>

---

<h1 align="center">hr_soul23.git</h1>




## 1. Descripción general

Este proyecto es una **plataforma profesional de gestión de recursos humanos (HR)** enfocada en la administración de socias y personal operativo. El sistema está diseñado para operar como un servicio web desacoplado, desplegado mediante contenedores Docker y accesible a través del subdominio `hr.soul23.cloud`.

La plataforma centraliza información crítica del personal, automatiza procesos administrativos (vacaciones, permisos) y emite eventos hacia sistemas externos mediante webhooks. Desde su diseño base, el sistema está preparado para escalar funcionalmente e integrarse con agentes de inteligencia artificial.

Este README define el **alcance funcional, técnico y operativo** del proyecto.

---

## 2. Alcance (Scope)

El sistema cubre:

* Gestión centralizada de socias.
* Importación automatizada de datos desde Google Sheets.
* Base de datos como fuente única de verdad.
* Búsqueda incremental de personal.
* Gestión de vacaciones conforme a la Ley Federal del Trabajo (México).
* Gestión de permisos.
* Emisión de eventos vía webhooks.
* Arquitectura lista para integración de control de asistencias.

Quedan fuera de este alcance inicial:

* Nómina.
* Evaluaciones de desempeño.
* Autenticación avanzada (SSO).

---

## 3. Principios técnicos

* **Node.js como runtime principal.**
* **API REST** como interfaz de comunicación.
* **Configuración sobre código** (no hardcodeo).
* **Persistencia transaccional** en base de datos.
* **Historial inmutable** de eventos.
* **Contenerización completa** para entornos reproducibles.

---

## 4. Arquitectura de alto nivel

### 4.1 Frontend

* Aplicación web.
* Consumo de API vía HTTP.
* Búsqueda incremental (autocomplete).
* Formularios dinámicos.

### 4.2 Backend (Node.js)

* Servidor HTTP escuchando en puerto **3011**.
* Framework recomendado: Express / Fastify.
* Capa de servicios para reglas de negocio.
* Capa de controladores (API).
* Capa de integración (Google Sheets, webhooks).

### 4.3 Base de datos

Entidades principales:

* Socias
* Sucursales
* Antigüedad / contratos
* Vacaciones
* Permisos
* Eventos emitidos
* Asistencias (fase futura)

---

## 5. Despliegue

### 5.1 Docker Compose

El sistema se desplegará exclusivamente mediante **Docker Compose**.

Características:

* Un contenedor para el backend Node.js.
* Un contenedor para la base de datos.
* Red interna privada.
* Variables de entorno definidas en `.env`.

Pasos rápidos (local):

1. Copia `.env.example` a `.env` y ajusta credenciales si es necesario.
2. Ejecuta `docker-compose up --build`.
3. El contenedor de API aplica migraciones y seeds automáticamente antes de arrancar.

El servicio Node.js expone:

* **Puerto interno:** 3011
* **Puerto externo:** 3011

---

### 5.2 Acceso

El servicio será accesible en:

```
https://hr.soul23.cloud
```

El balanceo, SSL y DNS se manejan fuera del scope de esta aplicación.

---

## 6. Importación desde Google Sheets

### Objetivo

Usar Google Sheets como **entrada temporal de datos**, no como sistema.

### Comportamiento

* Lectura vía Google Sheets API.
* Mapeo dinámico de columnas.
* Normalización de valores vacíos (ej. "en trámite").
* Identificación de registros por claves lógicas.
* Logs de sincronización.

---

## 7. Gestión de socias

Cada socia incluye:

* ID interno.
* Fecha de ingreso (campo crítico).
* Datos personales y laborales.
* Asociación a sucursal.

La fecha de ingreso gobierna la lógica de vacaciones.

### 7.1 Endpoints de socias

* `GET /api/v1/socias`: lista todas las socias (filtrable por `active=true|false` y por `q` para coincidencias parciales).
* `GET /api/v1/socias/{id}`: devuelve una socia por su identificador.
* `POST /api/v1/socias`: crea una socia nueva. El cuerpo debe incluir `nombre`, `apellido`, `fechaIngreso` (YYYY-MM-DD) e `idSucursal`.
* `PUT /api/v1/socias/{id}`: actualiza campos individuales; acepta las mismas claves que el POST y también `activo`.
* `DELETE /api/v1/socias/{id}`: elimina el registro de la socia confirmada.

Las respuestas exponen `fechaIngreso`, `idSucursal`, `sucursal` (nombre de la sucursal asociada) y los timestamps `createdAt`/`updatedAt`.

---

## 8. Vacaciones

### 8.1 Marco legal

Las vacaciones se calculan conforme a la **Ley Federal del Trabajo (México)**.

La tabla de días por antigüedad:

* Existe como **configuración editable**.
* No se hardcodea.
* Puede actualizarse sin cambios de código.

---

### 8.2 Ciclo

* Cada socia inicia con 12 días en su primer ciclo.
* El ciclo se calcula desde la fecha de ingreso.
* Los días pueden tomarse en uno o varios periodos.

---

### 8.3 Caducidad

* Los días generados en un ciclo **caducan al iniciar el siguiente ciclo**.
* No existe acumulación indefinida.

El sistema debe calcular:

* Saldo disponible.
* Días consumidos.
* Días vencidos.

---

### 8.4 Registro

Cada solicitud guarda:

* Socia.
* Fechas.
* Días utilizados.
* Ciclo.
* Estado.
* Timestamp.

El historial es inmutable.

### 8.5 API de vacaciones

La lógica de vacaciones se alimenta desde la configuración `dias_vacaciones_por_anio` y genera ciclos anuales cerrados desde la fecha de ingreso. La API expone:

* `GET /api/v1/vacaciones`: lista las solicitudes enviadas; `idSocia`, `estado` y `ciclo` se pueden usar como filtros.
* `GET /api/v1/vacaciones/{id}`: devuelve el detalle de una solicitud (incluye datos de la socia y la sucursal).
* `POST /api/v1/vacaciones`: crea una solicitud (cuerpo: `idSocia`, `fechaInicio`, `fechaFin`). El sistema valida que las fechas estén en el ciclo correcto, que la socia esté activa y que no supere los días disponibles.
* `GET /api/v1/vacaciones/ciclos/{idSocia}`: agrega el historial de ciclos (`label`, `diasGenerados`, `diasConsumidos`, `diasDisponibles`, `activo` y `caducado`). Se puede pasar `asOf=YYYY-MM-DD` para calcular los ciclos hasta una fecha distinta al día de hoy.

Las respuestas ya calculan automáticamente `cicloAnual`, `diasTomados`, `estado` (por defecto `solicitada`) y metadata de disponibilidad para cada período, lo que respalda el principio de caducidad automática.

---

## 9. Permisos

* Permisos por horas o días.
* Motivo configurable.
* Historial permanente.
* Relación directa con asistencias futuras.

### API de permisos

* `GET /api/v1/permisos`: lista permisos (filtros: `idSocia`, `estado`, `fecha`).
* `GET /api/v1/permisos/{id}`: detalle incluyendo socia y sucursal.
* `POST /api/v1/permisos`: crea un permiso (horas **o** días, no ambos).
* `PUT /api/v1/permisos/{id}/estado`: cambia estado a `solicitado`, `aprobado` o `rechazado`.

---

## 10. Webhooks

### 10.1 Principio

Vacaciones y permisos generan **eventos de salida**.

---

### 10.2 Endpoints

Existen únicamente dos endpoints:

* `/webhook/vacaciones/{token}`
* `/webhook/permisos/{token}`

---

### 10.3 Token

* Token aleatorio de **11 caracteres**.
* Forma parte de la URL.
* Identifica el destino.
* No es autenticación.

### 10.4 Implementación actual

* Los tokens y URLs se gestionan en `configuraciones` (`webhook_token_*`, `webhook_url_*`); si falta token se genera en caliente.
* Cada evento se registra en la tabla `eventos` con estado `pendiente` y payload serializado.
* API interna de monitoreo: `GET /api/v1/eventos` permite filtrar por `tipo` o `estado_entrega` para auditar el backlog.

---

## 11. Agentes de Inteligencia Artificial

Los agentes operan sobre:

* Datos estructurados.
* Reglas configuradas.
* Historial real.

No definen reglas nuevas.

---

## 12. Seguridad

* Variables sensibles vía entorno.
* Control de acceso (fase futura).
* Bitácora de eventos.

---

## 13. Estado del proyecto

* Diseño funcional: ✅
* Diseño técnico: ✅
* Implementación: ⏳

---

## 14. Flujo de Trabajo Basado en Agentes

Este proyecto se desarrolla siguiendo una metodología de **agentes especializados**, donde cada agente (ya sea humano o IA) tiene un conjunto de responsabilidades bien definidas.

### 14.1 Documentos Clave

*   **`TASKS.md`**: Define el rol y las tareas de cada agente. Este es el punto de partida para cualquier contribución.
*   **`docs/CONVENTIONS.md`**: Establece las reglas técnicas y de estilo que todos los agentes deben seguir. La consistencia es fundamental.
*   **`docs/agents/`**: Contiene las bitácoras individuales de cada agente. Es **obligatorio** que cada agente documente sus decisiones, progreso y bloqueos en su archivo correspondiente.

### 14.2 Proceso de Trabajo

1.  **Consultar `TASKS.md`**: Identifica tu rol de agente y las tareas asignadas.
2.  **Revisar `docs/CONVENTIONS.md`**: Asegúrate de que tu trabajo se alinee con las convenciones del proyecto.
3.  **Ejecutar Tareas**: Implementa la funcionalidad o realiza la tarea asignada.
4.  **Actualizar Bitácora**: Documenta lo que hiciste, por qué y cuál fue el resultado en tu archivo de bitácora en `docs/agents/`.
5.  **Enviar Cambios**: Sigue las convenciones de nomenclatura de ramas y mensajes de commit.

Este proceso estructurado garantiza la trazabilidad, facilita la colaboración y permite la orquestación eficiente del trabajo.

---

## 15. Nota final

Este README es el **contrato técnico y funcional** del sistema.

Si una implementación contradice este documento, la implementación está mal.


