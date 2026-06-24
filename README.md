# Grupo Cordillera — Sistema de Microservicios

Proyecto desarrollado para la asignatura DSY1106 Fullstack III, DuocUC.
Sistema distribuido basado en arquitectura de microservicios para la gestión integral de una empresa comercial: ventas, ecommerce, inventario, finanzas y CRM de clientes.

---

## Descripcion del sistema

Grupo Cordillera es un sistema empresarial compuesto por cinco microservicios independientes, un API Gateway centralizado y un frontend web. Cada microservicio gestiona su propio dominio de negocio y base de datos, comunicándose a través del API Gateway con autenticación JWT.

---

## Arquitectura general

```
Usuario
  |
  v
Frontend (React 18 + Vite) — desplegado en Vercel
  |
  v  Authorization: Bearer JWT
API Gateway (Spring Cloud Gateway) — Puerto 9090
  |
  +---> ms-ventas      Puerto 9091  — Puntos de venta y transacciones
  +---> ms-ecommerce   Puerto 9092  — Pedidos online
  +---> ms-inventario  Puerto 9093  — Productos y stock
  +---> ms-financiero  Puerto 9094  — Ingresos, egresos y KPIs
  +---> ms-clientes    Puerto 9095  — CRM + generador de tokens JWT

Eureka Server (Service Registry) — Puerto 8761
  |
  Todos los microservicios y el Gateway se registran en Eureka

PostgreSQL 15 — una base de datos por microservicio (Database per Service)
  db_ventas      :5432
  db_ecommerce   :5433
  db_inventario  :5434
  db_financiero  :5435
  db_clientes    :5436
```

---

## Tecnologias utilizadas

**Backend**
- Java 21
- Spring Boot 3.3.0
- Spring Cloud 2023.0.1 (Gateway, Eureka)
- Spring Data JPA / Hibernate
- Liquibase (ms-clientes y ms-ecommerce)
- PostgreSQL 15
- JWT — JJWT 0.12.3
- BCrypt — spring-security-crypto
- Resilience4j (Circuit Breaker en el Gateway)
- springdoc-openapi 2.3.0 (Swagger UI)
- JaCoCo 0.8.11 (cobertura de pruebas)
- JUnit 5 + Mockito 5
- Docker / Docker Compose

**Frontend**
- React 18
- Vite
- Axios
- React Router
- Context API
- Vitest + Testing Library (pruebas unitarias)

**CI/CD**
- GitHub Actions (rama deploy)
- Vercel Deploy Hook

---

## Repositorios del proyecto

**Repositorio Principal (este repositorio)**
https://github.com/vareeth227/grupo-cordillera-fullstack3
Documentacion general, guia de usuario y arquitectura del sistema.

**Repositorio Frontend**
[COMPLETAR CON URL DEL REPOSITORIO FRONTEND]
Codigo fuente de la aplicacion React, configuracion de Vite y pruebas con Vitest.

**Repositorio de Microservicios (Backend)**
[COMPLETAR CON URL DEL REPOSITORIO DE MICROSERVICIOS]
Los cinco microservicios, el API Gateway, el Eureka Server y el docker-compose.yml.

---

## Requisitos previos

- Docker Desktop instalado y corriendo
- Git
- Java 21 (solo si se ejecuta sin Docker)
- Maven 3.9 (solo si se ejecuta sin Docker)
- Node.js 20 (solo si se ejecuta el frontend localmente)

---

## Guia de instalacion y ejecucion

### 1. Clonar el repositorio de microservicios

```bash
git clone [URL_REPOSITORIO_MICROSERVICIOS]
cd [nombre-carpeta]
```

### 2. Levantar el backend completo con Docker Compose

```bash
docker-compose up -d --build
```

Este comando levanta automaticamente:
- Eureka Server en el puerto 8761
- API Gateway en el puerto 9090
- Los cinco microservicios (puertos 9091 a 9095)
- Las cinco bases de datos PostgreSQL (puertos 5432 a 5436)

Los datos semilla son insertados automaticamente al arrancar.

Verificar que todos los servicios esten corriendo:

```bash
docker-compose ps
```

Verificar el registro en Eureka abriendo en el navegador:

```
http://localhost:8761
```

### 3. Obtener la IP local de la maquina

Cuando el frontend se ejecuta desde otra maquina o desde Vercel, necesita la IP local del servidor backend.

En Windows:
```bash
ipconfig
```

Buscar la IPv4 de la conexion activa (ejemplo: 192.168.1.100).

### 4. Configurar y ejecutar el frontend

Clonar el repositorio del frontend:

```bash
git clone [URL_REPOSITORIO_FRONTEND]
cd [nombre-carpeta-frontend]
```

Crear el archivo .env.local con la URL del API Gateway:

```
VITE_API_GATEWAY_URL=http://[IP_LOCAL]:9090
```

Instalar dependencias y ejecutar en modo desarrollo:

```bash
npm install
npm run dev
```

El frontend estara disponible en: http://localhost:5173

---

## Autenticacion

El sistema utiliza autenticacion JWT. Todos los endpoints (excepto el login) requieren un token valido.

**Obtener token:**

```
POST http://localhost:9090/api/clientes/auth/login
Content-Type: application/json

{
  "email": "admin@grupocordillera.cl",
  "password": "admin123"
}
```

**Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "tipo": "Bearer",
  "email": "admin@grupocordillera.cl",
  "rol": "ADMIN"
}
```

**Usar el token en las siguientes solicitudes:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

---

## Documentacion de la API

La coleccion completa de 48 endpoints esta disponible en el archivo `GrupoCordillera_API_Collection.json` (Postman Collection v2.1) incluido en el entregable ZIP.

Ademas, cada microservicio expone Swagger UI cuando esta corriendo:

```
ms-ventas      http://localhost:9091/swagger-ui.html
ms-ecommerce   http://localhost:9092/swagger-ui.html
ms-inventario  http://localhost:9093/swagger-ui.html
ms-financiero  http://localhost:9094/swagger-ui.html
ms-clientes    http://localhost:9095/swagger-ui.html
```

---

## Endpoints por microservicio

**ms-ventas — Puerto 9091 — /api/ventas/**

```
GET    /puntos                          Lista todos los puntos de venta
GET    /puntos/activos                  Lista puntos de venta activos
POST   /puntos                          Crea un nuevo punto de venta
DELETE /puntos/{id}                     Elimina un punto de venta
GET    /transacciones                   Lista todas las transacciones
POST   /transacciones/venta             Registra una venta
POST   /transacciones/devolucion        Registra una devolucion
DELETE /transacciones/{id}              Elimina una transaccion
GET    /reporte-diario?fecha=YYYY-MM-DD Reporte del dia indicado
```

**ms-ecommerce — Puerto 9092 — /api/ecommerce/**

```
GET    /pedidos                         Lista todos los pedidos
GET    /pedidos/{id}                    Obtiene un pedido por id
GET    /pedidos/cliente/{clienteId}     Pedidos de un cliente
GET    /pedidos/estado/{estado}         Pedidos por estado
POST   /pedidos                         Crea un nuevo pedido
PUT    /pedidos/{id}/estado?estado=X    Actualiza estado del pedido
DELETE /pedidos/{id}                    Elimina un pedido
```

Estados disponibles: PENDIENTE, CONFIRMADO, EN_ENVIO, ENTREGADO, CANCELADO

**ms-inventario — Puerto 9093 — /api/inventario/**

```
GET    /productos                        Lista todos los productos
GET    /productos/activos                Lista productos activos
POST   /productos                        Crea un producto
DELETE /productos/{id}                   Elimina un producto
GET    /stock                            Lista todo el stock
GET    /stock/producto/{productoId}      Stock de un producto
POST   /stock                            Registra stock
PUT    /stock/{id}?cantidad=N            Actualiza cantidad de stock
DELETE /stock/{id}                       Elimina registro de stock
GET    /alertas                          Productos bajo umbral minimo
```

**ms-financiero — Puerto 9094 — /api/financiero/**

```
GET    /ingresos                                       Lista todos los ingresos
GET    /ingresos/periodo?inicio=YYYY-MM-DD&fin=...     Ingresos por periodo
POST   /ingresos                                       Registra un ingreso
DELETE /ingresos/{id}                                  Elimina un ingreso
GET    /egresos                                        Lista todos los egresos
GET    /egresos/periodo?inicio=YYYY-MM-DD&fin=...      Egresos por periodo
POST   /egresos                                        Registra un egreso
DELETE /egresos/{id}                                   Elimina un egreso
GET    /kpis?inicio=YYYY-MM-DD&fin=YYYY-MM-DD          KPIs del periodo
```

**ms-clientes — Puerto 9095 — /api/clientes/**

```
POST   /auth/login                           Genera token JWT
GET    /                                     Lista todos los clientes
GET    /activos                              Lista clientes activos
GET    /{id}                                 Obtiene cliente por id
POST   /                                     Registra nuevo cliente
PATCH  /{id}/desactivar                      Desactiva un cliente
DELETE /{id}                                 Elimina un cliente
GET    /tickets                              Lista todos los tickets
GET    /{id}/tickets                         Tickets de un cliente
GET    /tickets/estado/{estado}              Tickets por estado
POST   /tickets                              Crea ticket de atencion
PUT    /tickets/{id}/estado?estado=X         Actualiza estado del ticket
DELETE /tickets/{id}                         Elimina un ticket
```

Estados de ticket: ABIERTO, EN_PROCESO, RESUELTO, CERRADO
Categorias de ticket: RECLAMO, CONSULTA, SOPORTE_TECNICO, DEVOLUCION

---

## Pruebas unitarias

Cada microservicio incluye pruebas unitarias con JUnit 5 y Mockito, enfocadas en la capa de servicio.

Para ejecutar las pruebas de un microservicio:

```bash
cd [nombre-microservicio]
mvn test
```

Para generar el reporte de cobertura JaCoCo en HTML:

```bash
mvn test
start target/site/jacoco/index.html
```

Resumen de pruebas por microservicio:

```
ms-ventas      12 pruebas — VentaServiceImpl     — cobertura service 100%
ms-ecommerce    6 pruebas — PedidoServiceImpl    — cobertura service 100%
ms-inventario  16 pruebas — InventarioServiceImpl — cobertura service 100%
ms-financiero  12 pruebas — FinancieroServiceImpl — cobertura service 100%
ms-clientes    14 pruebas — ClienteServiceImpl    — cobertura service 100%
```

Total: 60 pruebas unitarias. Cobertura global minima alcanzada: 68%.

---

## Pipeline CI/CD

El proyecto utiliza GitHub Actions configurado sobre la rama `deploy`.

Flujo automatico al hacer `git push origin deploy`:

```
1. Se ejecutan las pruebas de los 5 microservicios en paralelo (matrix strategy)
2. Se generan y guardan los reportes de cobertura JaCoCo como artefactos
3. Si todos los tests pasan, se dispara el Deploy Hook de Vercel
4. Vercel despliega automaticamente el frontend actualizado
```

Para activar el pipeline:

```bash
git add .
git commit -m "descripcion del cambio"
git push origin deploy
```

---

## Estructura del repositorio de microservicios

```
grupo-cordillera-servicios/
├── ms-ventas/            Microservicio de ventas
├── ms-ecommerce/         Microservicio de pedidos online
├── ms-inventario/        Microservicio de inventario
├── ms-financiero/        Microservicio financiero
├── ms-clientes/          Microservicio CRM y autenticacion
├── api-gateway/          API Gateway (Spring Cloud Gateway)
├── eureka-server/        Servidor de registro de servicios
├── docker-compose.yml    Orquestacion de todos los servicios
└── .github/
    └── workflows/
        └── ci.yml        Pipeline de CI/CD
```

---

## Integrantes del equipo

Grupo Cordillera
DSY1106 Fullstack III — DuocUC — 2026
