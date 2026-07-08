# Variables de entorno para Railway

Configurar estas variables en cada servicio dentro del dashboard de Railway.
Las URLs de los microservicios se completan DESPUES de desplegar cada uno.

---

## ms-clientes (desplegar PRIMERO — genera los JWT)

```
SPRING_DATASOURCE_URL        jdbc:postgresql://<HOST_BD_CLIENTES>/<NOMBRE_BD>
SPRING_DATASOURCE_USERNAME   postgres
SPRING_DATASOURCE_PASSWORD   <generado por Railway>
SERVER_PORT                  9095
JWT_SECRET                   cordillera-jwt-secret-2024-fullstack3-grupo
```

---

## ms-ventas

```
SPRING_DATASOURCE_URL        jdbc:postgresql://<HOST_BD_VENTAS>/<NOMBRE_BD>
SPRING_DATASOURCE_USERNAME   postgres
SPRING_DATASOURCE_PASSWORD   <generado por Railway>
SERVER_PORT                  9091
```

---

## ms-inventario

```
SPRING_DATASOURCE_URL        jdbc:postgresql://<HOST_BD_INVENTARIO>/<NOMBRE_BD>
SPRING_DATASOURCE_USERNAME   postgres
SPRING_DATASOURCE_PASSWORD   <generado por Railway>
SERVER_PORT                  9093
```

---

## ms-financiero

```
SPRING_DATASOURCE_URL        jdbc:postgresql://<HOST_BD_FINANCIERO>/<NOMBRE_BD>
SPRING_DATASOURCE_USERNAME   postgres
SPRING_DATASOURCE_PASSWORD   <generado por Railway>
SERVER_PORT                  9094
```

---

## ms-ecommerce (desplegar DESPUES de clientes e inventario)

```
SPRING_DATASOURCE_URL        jdbc:postgresql://<HOST_BD_ECOMMERCE>/<NOMBRE_BD>
SPRING_DATASOURCE_USERNAME   postgres
SPRING_DATASOURCE_PASSWORD   <generado por Railway>
SERVER_PORT                  9092
```

---

## api-gateway (desplegar AL FINAL — necesita las URLs de todos los demas)

```
SERVER_PORT                  9090
JWT_SECRET                   cordillera-jwt-secret-2024-fullstack3-grupo
CORS_ALLOWED_ORIGINS         https://<tu-frontend>.vercel.app
MS_CLIENTES_URL              https://<ms-clientes>.up.railway.app
MS_VENTAS_URL                https://<ms-ventas>.up.railway.app
MS_INVENTARIO_URL            https://<ms-inventario>.up.railway.app
MS_FINANCIERO_URL            https://<ms-financiero>.up.railway.app
MS_ECOMMERCE_URL             https://<ms-ecommerce>.up.railway.app
```

---

## Frontend (Vercel)

```
VITE_API_GATEWAY_URL         https://<api-gateway>.up.railway.app
```

Actualizar en: Vercel Dashboard → proyecto → Settings → Environment Variables → Redeploy.

---

## Orden de despliegue en Railway

1. Crear proyecto en railway.app
2. Crear 5 bases de datos PostgreSQL (una por microservicio)
3. Desplegar ms-clientes → copiar su URL
4. Desplegar ms-ventas, ms-inventario, ms-financiero → copiar sus URLs
5. Desplegar ms-ecommerce → copiar su URL
6. Desplegar api-gateway → pegar todas las URLs en sus variables de entorno
7. Actualizar VITE_API_GATEWAY_URL en Vercel con la URL del gateway
8. Hacer Redeploy en Vercel
