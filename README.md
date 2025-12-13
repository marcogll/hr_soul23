# Sistema de Gestión de Socias – HR Platform

**FQDN:** `hr.soul23.cloud`
**Puerto:** `3011`
**Stack principal:** Node.js
**Despliegue:** Docker Compose

---

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

---

## 9. Permisos

* Permisos por horas o días.
* Motivo configurable.
* Historial permanente.
* Relación directa con asistencias futuras.

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
