# 🏔 Grupo Cordillera — Dashboard Ejecutivo

Plataforma de microservicios para monitoreo organizacional en tiempo real de una empresa retail.

---

## 🚀 Cómo ejecutar el proyecto (solo necesitas Docker)

### Requisito único: tener Docker Desktop instalado

Descárgalo desde: https://www.docker.com/products/docker-desktop  
Una vez instalado, ábrelo y espera que el ícono de la ballena aparezca en la barra de tareas.

---

### Paso 1 — Clonar el repositorio

Abre una terminal (**PowerShell** en Windows, **Terminal** en Mac/Linux) y escribe:

```bash
git clone https://github.com/vareeth227/grupo-cordillera-fullstack3.git
cd grupo-cordillera-fullstack3
```

---

### Paso 2 — Levantar las bases de datos

```bash
docker-compose -f docker-compose-db.yml up -d
```

Espera unos segundos y verifica que estén listas:

```bash
docker ps
```

En la columna `STATUS` deben aparecer los 5 contenedores como `healthy`. Si dicen `starting`, espera 15 segundos y repite el comando.

---

### Paso 3 — Levantar los microservicios y el API Gateway

```bash
docker-compose -f docker-compose-services.yml up -d
```

> ⚠️ La **primera vez** tarda entre 5 y 10 minutos porque Docker descarga las dependencias de Java y compila el código. Las siguientes veces es mucho más rápido.

Verifica que estén corriendo:

```bash
docker ps
```

Deben aparecer 6 contenedores nuevos: `ms-ventas`, `ms-ecommerce`, `ms-inventario`, `ms-financiero`, `ms-clientes` y `api-gateway`.

---

### Paso 4 — Levantar el frontend

```bash
docker-compose -f docker-compose-frontend.yml up -d
```

---

### Paso 5 — Abrir el dashboard

Abre tu navegador y entra a:

```
http://localhost:3000
```

¡Listo! Deberías ver el dashboard ejecutivo con datos de prueba en todas las secciones.

---

### Para apagar todo cuando termines

```bash
docker-compose -f docker-compose-frontend.yml down
docker-compose -f docker-compose-services.yml down
docker-compose -f docker-compose-db.yml down
```

---

## 🔍 Verificar que los servicios funcionan

Puedes probar cada microservicio directamente en el navegador o con curl:

| Servicio | URL directa | A través del Gateway |
|---|---|---|
| Ventas | http://localhost:8081/ventas/puntos | http://localhost:8080/api/ventas/puntos |
| Ecommerce | http://localhost:8082/ecommerce/pedidos | http://localhost:8080/api/ecommerce/pedidos |
| Inventario | http://localhost:8083/inventario/alertas | http://localhost:8080/api/inventario/alertas |
| Financiero | http://localhost:8084/financiero/ingresos | http://localhost:8080/api/financiero/ingresos |
| Clientes | http://localhost:8085/clientes | http://localhost:8080/api/clientes |

---

## 🏗 Arquitectura del sistema

```
┌─────────────┐
│  Frontend   │  React 18 + Vite  →  puerto 3000
└──────┬──────┘
       │ HTTP
┌──────▼──────┐
│ API Gateway │  Spring Cloud Gateway + Circuit Breaker  →  puerto 8080
└──────┬──────┘
       │ enruta a cada microservicio
┌──────┴────────────────────────────────────────────┐
│  ms-ventas     :8081  │  ms-ecommerce    :8082     │
│  ms-inventario :8083  │  ms-financiero   :8084     │
│  ms-clientes   :8085                              │
└──────┬────────────────────────────────────────────┘
       │ cada uno con su propia BD
┌──────┴────────────────────────────────────────────┐
│  PostgreSQL  :5432  │  PostgreSQL  :5433           │
│  PostgreSQL  :5434  │  PostgreSQL  :5435           │
│  PostgreSQL  :5436                                │
└───────────────────────────────────────────────────┘
```

---

## 🛠 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Spring Boot 3.3, Java 17, Maven |
| Frontend | React 18, Vite, JavaScript |
| Base de datos | PostgreSQL 15 |
| Gateway | Spring Cloud Gateway |
| Circuit Breaker | Resilience4j |
| Contenedores | Docker + Docker Compose |

---

## 📁 Estructura del proyecto

```
grupo-cordillera-fullstack3/
├── docker-compose-db.yml          # 5 bases de datos PostgreSQL
├── docker-compose-services.yml    # 5 microservicios + API Gateway
├── docker-compose-frontend.yml    # Frontend React
├── api-gateway/                   # Enrutador central (puerto 8080)
├── ms-ventas/                     # Puntos de venta y transacciones (8081)
├── ms-ecommerce/                  # Pedidos online (8082)
├── ms-inventario/                 # Stock y productos (8083)
├── ms-financiero/                 # KPIs e ingresos/egresos (8084)
├── ms-clientes/                   # CRM y tickets de atención (8085)
└── frontend/                      # Dashboard ejecutivo (3000)
```

---

## 👥 Patrones de diseño implementados

- **Repository Pattern** — acceso a datos desacoplado via Spring Data JPA
- **Factory Method** — creación de entidades centralizada por microservicio
- **Circuit Breaker** — tolerancia a fallos con Resilience4j en el API Gateway
