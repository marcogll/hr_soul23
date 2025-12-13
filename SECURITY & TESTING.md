# SECURITY & TESTING – Roles, Permisos y Estética

Este documento define los **criterios de seguridad, control de acceso y pruebas** del sistema HR Platform, así como lineamientos visuales para mantener una estética **minimalista y consistente**.

Su objetivo es garantizar que el sistema sea **seguro, verificable y gobernable**, incluso antes de escalar a producción.

---

## 1. Lineamientos de estética (UI / UX)

### 1.1 Principios visuales

* Estilo **minimalista**: menos ruido, más claridad.
* Jerarquía visual clara.
* Interfaces predecibles.
* Priorizar legibilidad sobre decoración.

---

### 1.2 Paleta

* Base: **Catppuccin Latte**.
* Fondos claros, suaves.
* Contrastes suficientes para accesibilidad.
* Acentos discretos (no saturados).

---

### 1.3 Iconografía

Se permite el uso de:

* **Catppuccin Icons**.
* **Google Material Icons**.

Reglas:

* Uso consistente.
* Tamaños uniformes.
* Íconos funcionales, no decorativos.

---

## 2. Modelo de seguridad

### 2.1 Principios

* **Menor privilegio** por defecto.
* Todo acceso es explícito.
* Los permisos se configuran, no se codifican.
* La seguridad es verificable mediante pruebas.

---

## 3. Tipos de usuario

El sistema acepta **tres tipos de usuario**.

---

### 3.1 Root

Rol reservado para control total del sistema.

Permisos:

* Acceso completo a todos los módulos.
* Gestión de configuraciones globales.
* Definición de roles y permisos.
* Acceso a logs y eventos.
* Gestión de webhooks.

Este rol debe existir en número mínimo.

---

### 3.2 Admin

Rol operativo con permisos elevados.

Permisos típicos:

* Crear, editar y consultar socias.
* Aprobar o rechazar vacaciones.
* Aprobar o rechazar permisos.
* Consultar reportes.
* Acceso limitado a configuraciones.

No puede:

* Cambiar reglas globales críticas.
* Modificar permisos del rol Root.

---

### 3.3 User

Rol estándar.

Permisos base:

* Ver información permitida.
* Crear solicitudes propias (vacaciones, permisos).
* Modificar únicamente campos explícitamente autorizados.

No puede:

* Ver información sensible global.
* Editar reglas.
* Aprobar solicitudes.

---

## 4. Sistema granular de permisos

### 4.1 Modelo

El sistema utiliza un **modelo granular basado en checkboxes**, no en roles rígidos.

Cada permiso es una bandera configurable.

Ejemplos:

* `socias.read`
* `socias.update`
* `vacaciones.create`
* `vacaciones.approve`
* `permisos.read`
* `config.edit`

---

### 4.2 Niveles

Los permisos pueden aplicarse a:

* Rol completo.
* Usuario específico.
* Módulo.
* Acción.

Esto permite combinaciones finas sin crear nuevos roles.

---

### 4.3 UI de permisos

* Interfaz con **checkboxes**.
* Agrupación por módulo.
* Visualización clara de lo permitido y lo bloqueado.
* Cambios auditados.

---

## 5. Control de acceso

* Middleware de autorización en backend.
* Validación por permiso, no solo por rol.
* Reglas evaluadas en tiempo de ejecución.

---

## 6. Pruebas de seguridad

### 6.1 Tests de roles

* Verificar acceso correcto por rol.
* Validar bloqueos esperados.
* Intentos de escalación de privilegios.

---

### 6.2 Tests de permisos granulares

* Usuario con permisos parciales.
* Usuario con combinaciones específicas.
* Revocación dinámica de permisos.

---

### 6.3 Tests de endpoints

* Acceso autorizado.
* Acceso denegado.
* Manipulación de payload.

---

### 6.4 Tests de eventos y webhooks

* Emisión solo desde acciones válidas.
* No emisión desde acciones no autorizadas.
* Registro correcto de eventos.

---

## 7. Auditoría

* Registro de:

  * Cambios de permisos.
  * Accesos críticos.
  * Acciones administrativas.

* Logs inmutables.

---

## 8. Criterios de aceptación de seguridad

El sistema se considera válido cuando:

* Un usuario nunca puede hacer más de lo permitido.
* Todos los accesos están trazados.
* Los permisos pueden cambiar sin deploy.
* Las pruebas cubren roles y permisos.

---

## 9. Nota final

La seguridad no es una capa.

Es una **propiedad emergente** del diseño.

Este documento define cómo se prueba y cómo se protege el sistema.
