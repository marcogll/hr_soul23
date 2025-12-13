# TASKS – Roadmap por Agentes (HR Platform)

Este documento redefine las tareas del proyecto **HR Platform** dividiéndolas por **agentes especializados**.

Cada agente tiene un **scope claro**, responsabilidades bien delimitadas y resultados verificables. Esto permite paralelizar trabajo humano o automatizado (IA) sin ambigüedad.

La estética del staging debe ser **minimalista**, usando **Catppuccin Latte** y iconografía consistente.

---

## Agente 0 – Arquitectura & Orquestación

**Rol:** Guardián del sistema.

Responsabilidades:

* Validar que todas las decisiones respeten el README principal.
* Definir límites entre agentes.
* Aprobar cambios de arquitectura.

Tareas:

* Revisar README, TASKS y SECURITY.
* Definir convenciones de naming.
* Definir contratos entre módulos.

### Bitácora del agente

* Registro de decisiones arquitectónicas.
* Cambios aprobados / rechazados.
* Dependencias detectadas entre agentes.

La bitácora es **visible para todos los agentes**.

---

## Agente 1 – Infraestructura & DevOps

**Rol:** Hacer que el sistema exista y sea reproducible.

Tareas:

* Crear repositorio Git.
* Configurar ramas `main` / `develop`.
* Crear `.gitignore`.
* Crear Dockerfile Node.js.
* Crear `docker-compose.yml`:

  * Servicio API (Node.js, puerto 3011).
  * Servicio DB.
  * Red interna.
* Crear `.env.example`.
* Verificar arranque completo con un solo comando.

Resultado esperado:

* `docker-compose up` levanta el sistema.

### Bitácora del agente

* Cambios de infraestructura.
* Versiones de imágenes.
* Problemas de despliegue y soluciones.

Visible para otros agentes.

---

## Agente 2 – Backend Core (Node.js)

**Rol:** Corazón lógico del sistema.

Tareas:

* Inicializar proyecto Node.js.
* Configurar servidor HTTP en puerto 3011.
* Crear endpoint `/health`.
* Definir estructura de carpetas:

  * `modules`
  * `routes`
  * `services`
  * `config`
  * `webhooks`
* Implementar manejo centralizado de errores.

Resultado esperado:

* API estable, sin lógica de negocio aún.

### Bitácora del agente

* Decisiones técnicas de backend.
* Cambios en estructura.
* Endpoints creados o modificados.

Visible para agentes dependientes.

---

## Agente 3 – Base de Datos & Modelado

**Rol:** Fuente única de verdad.

Tareas:

* Diseñar modelo de datos.
* Crear tablas:

  * socias
  * sucursales
  * vacaciones
  * permisos
  * eventos
  * configuraciones
  * usuarios
  * permisos_granulares
* Definir claves y relaciones.
* Implementar sistema de migraciones.
* Crear seeds iniciales.

Resultado esperado:

* Base de datos consistente y versionada.

### Bitácora del agente

* Cambios de esquema.
* Migraciones aplicadas.
* Decisiones de modelado.

Visible para backend y testing.

---

## Agente 4 – Importación Google Sheets

**Rol:** Convertir hojas en datos reales.

Tareas:

* Integrar Google Sheets API.
* Manejo de credenciales por entorno.
* Mapeo dinámico de columnas.
* Normalización de campos vacíos.
* Prevención de duplicados.
* Logs de sincronización.

Resultado esperado:

* Importación automática y confiable.

### Bitácora del agente

* Cambios en mapeos.
* Errores detectados en datos.
* Ajustes de normalización.

Visible para agentes de datos.

---

## Agente 5 – Gestión de Socias

**Rol:** Dominio principal del negocio.

Tareas:

* CRUD de socias.
* Validaciones.
* Asociación a sucursal.
* Manejo de fecha de ingreso.

Resultado esperado:

* Gestión completa del perfil de socias.

### Bitácora del agente

* Cambios en reglas de socias.
* Validaciones agregadas.
* Campos críticos ajustados.

Visible para vacaciones y permisos.

---

## Agente 6 – Vacaciones (Reglas de Negocio)

**Rol:** Implementar la lógica legal.

Tareas:

* Configuración editable de tabla LFT.
* Cálculo de antigüedad.
* Generación de ciclos anuales.
* Cálculo de saldo.
* Caducidad automática.
* Registro inmutable de solicitudes.

Resultado esperado:

* Vacaciones calculadas correctamente sin hardcodeo.

### Bitácora del agente

* Cambios en reglas legales.
* Ajustes de cálculo.
* Casos límite detectados.

Visible para seguridad y testing.

---

## Agente 7 – Permisos

**Rol:** Controlar ausencias no vacacionales.

Tareas:

* Registro de permisos por horas o días.
* Motivos configurables.
* Estados.
* Historial permanente.

Resultado esperado:

* Permisos trazables y auditables.

### Bitácora del agente

* Cambios en tipos de permiso.
* Reglas especiales.
* Incidencias detectadas.

Visible para asistencias futuras.

---

## Agente 8 – Webhooks & Eventos

**Rol:** Comunicación externa.

Tareas:

* Crear módulo de eventos.
* Definir payload estándar.
* Implementar endpoints:

  * `/webhook/vacaciones/{token}`
  * `/webhook/permisos/{token}`
* Generar tokens aleatorios (11 chars).
* Registrar eventos enviados.

Resultado esperado:

* Eventos confiables y repetibles.

### Bitácora del agente

* Cambios de payload.
* Eventos emitidos.
* Fallos de entrega.

Visible para observabilidad.

---

## Agente 9 – Seguridad & Autorización

**Rol:** Decidir quién puede hacer qué.

Tareas:

* Implementar roles: root, admin, user.
* Implementar permisos granulares.
* Middleware de autorización.
* UI lógica para checkboxes de permisos.
* Auditoría de cambios.

Resultado esperado:

* Ningún usuario puede exceder sus permisos.

### Bitácora del agente

* Cambios en reglas de acceso.
* Incidentes de seguridad.
* Ajustes de permisos.

Visible para QA y root.

---

## Agente 10 – Frontend (Staging)

**Rol:** Interfaz humana del sistema.

Tareas:

* Frontend ligero.
* Consumo de API.
* Búsqueda incremental.
* Vistas de socias, vacaciones y permisos.
* Estética:

  * Catppuccin Latte.
  * Minimalista.
  * Iconos Catppuccin / Google.

Resultado esperado:

* UI clara, usable y consistente.

### Bitácora del agente

* Cambios de UI.
* Decisiones de diseño.
* Componentes creados.

Visible para backend y QA.

---

## Agente 11 – Testing & QA

**Rol:** Romper el sistema antes que los usuarios.

Tareas:

* Tests de roles.
* Tests de permisos granulares.
* Tests de endpoints.
* Tests de eventos y webhooks.
* Validación end-to-end en staging.

Resultado esperado:

* Confianza operativa.

### Bitácora del agente

* Casos probados.
* Bugs encontrados.
* Bugs resueltos.

Visible para todos.

---

## Agente 12 – Observabilidad & Calidad

**Rol:** Ver lo invisible.

Tareas:

* Logs estructurados.
* Manejo de errores.
* Métricas básicas.

Resultado esperado:

* Sistema observable.

### Bitácora del agente

* Métricas definidas.
* Alertas configuradas.
* Incidentes detectados.

Visible para root y devops.

---

## Criterio de cierre de staging

El staging se considera completo cuando:

* Todos los agentes cumplen su resultado esperado.
* El sistema corre vía Docker Compose.
* Se accede por `hr.soul23.cloud`.
* Las reglas del README se respetan.

---

Este documento define **cómo se piensa el trabajo**, no solo qué se hace.

Cada agente puede ser humano o IA.
Si dos agentes se pisan, el diseño está mal.
