# TASKS – Roadmap de Implementación

Este documento define las **tareas técnicas y funcionales** necesarias para construir el sistema **HR Platform** descrito en el README principal.

El objetivo es permitir ejecutar un **staging funcional completo**, con una interfaz limpia usando la paleta **Catppuccin Latte**, manteniendo consistencia visual y técnica.

---

## 1. Setup inicial del proyecto

### 1.1 Repositorio

* Crear repositorio Git.
* Definir rama `main` y `develop`.
* Configurar `.gitignore` para Node.js y Docker.

---

### 1.2 Base Node.js

* Inicializar proyecto Node.js.

* Definir estructura base:

  * `src/`
  * `src/server`
  * `src/modules`
  * `src/config`
  * `src/routes`
  * `src/services`
  * `src/webhooks`

* Configurar servidor HTTP en **puerto 3011**.

* Health check endpoint (`/health`).

---

## 2. Docker y entorno

### 2.1 Dockerfile

* Crear Dockerfile para backend Node.js.
* Uso de variables de entorno.
* Build reproducible.

---

### 2.2 Docker Compose

* Crear `docker-compose.yml` con:

  * Servicio `api` (Node.js).
  * Servicio `db`.
* Red interna.
* Volúmenes persistentes.

---

### 2.3 Variables de entorno

* Crear `.env.example` con:

  * Puerto
  * DB host / user / password
  * Google Sheets credentials
  * Webhook base URLs

---

## 3. Base de datos

### 3.1 Modelo inicial

* Definir tablas:

  * socias
  * sucursales
  * vacaciones
  * permisos
  * eventos
  * configuraciones

---

### 3.2 Migraciones

* Sistema de migraciones.
* Seeds básicos (configuración inicial).

---

## 4. Importación desde Google Sheets

### 4.1 Integración API

* Conexión segura a Google Sheets API.
* Manejo de credenciales por entorno.

---

### 4.2 Lógica de sincronización

* Mapeo dinámico de columnas.
* Identificación de registros.
* Normalización de campos vacíos.
* Prevención de duplicados.

---

### 4.3 Logs

* Registro de ejecuciones.
* Errores y advertencias.

---

## 5. Gestión de socias

* Endpoint CRUD básico.
* Validaciones de datos.
* Asociación a sucursal.
* Campo crítico: fecha de ingreso.

---

## 6. Vacaciones

### 6.1 Configuración legal

* Tabla configurable de días por antigüedad.
* Editable sin cambios de código.

---

### 6.2 Cálculo de ciclos

* Cálculo automático por fecha de ingreso.
* Generación de saldo anual.
* Caducidad automática.

---

### 6.3 Solicitudes

* Crear solicitud.
* Validar saldo.
* Registrar consumo.
* Mantener historial inmutable.

---

## 7. Permisos

* Crear permisos por horas o días.
* Motivos configurables.
* Estados y trazabilidad.

---

## 8. Webhooks

### 8.1 Infraestructura

* Crear módulo de emisión de eventos.
* Registro de eventos enviados.

---

### 8.2 Endpoints

* `/webhook/vacaciones/{token}`

* `/webhook/permisos/{token}`

* Generación de token aleatorio (11 chars).

---

## 9. Frontend (Staging)

### 9.1 Base UI

* Frontend ligero (React / similar).
* Consumo de API.
* Sin lógica hardcodeada.

---

### 9.2 Paleta Catppuccin Latte

Usar la paleta **Catppuccin Latte** como base visual:

* Fondo principal claro.
* Tipografía oscura suave.
* Acentos pastel.

Componentes:

* Header
* Sidebar
* Cards
* Inputs
* Tablas
* Estados (success / warning / error)

---

### 9.3 Búsqueda incremental

* Input único.
* Resultados en tiempo real.
* Selección despliega perfil completo.

---

## 10. Staging funcional

* Deploy en entorno staging.
* Acceso vía `hr.soul23.cloud`.
* Validación end-to-end:

  * Importación
  * Búsqueda
  * Vacaciones
  * Permisos
  * Webhooks

---

## 11. Observabilidad

* Logs estructurados.
* Manejo de errores.
* Métricas básicas.

---

## 12. Checklist de salida

* Docker Compose operativo.
* API estable.
* UI funcional.
* Reglas de negocio respetadas.
* README actualizado.

---

Este documento es el **plan ejecutable** del proyecto.

Si una tarea no aparece aquí, no forma parte del staging.
