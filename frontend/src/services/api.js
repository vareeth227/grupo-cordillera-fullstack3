// Servicio centralizado para comunicación con el API Gateway
// En desarrollo: API_BASE vacío → las peticiones /api/* pasan por el proxy de Vite (vite.config.js)
// En Docker:     VITE_API_GATEWAY_URL se inyecta como build-arg y apunta al gateway real
const API_BASE = import.meta.env.VITE_API_GATEWAY_URL || ''

/**
 * Función base para realizar peticiones HTTP al API Gateway.
 * Lanza un error con el mensaje del servidor si la respuesta no es exitosa.
 */
async function fetchAPI(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options
  })
  if (!response.ok) {
    const error = await response.text()
    throw new Error(error || `Error ${response.status}`)
  }
  return response.json()
}

// ──────────── VENTAS ────────────

/** Obtiene todos los puntos de venta activos */
export const getPuntosDeVenta = () => fetchAPI('/api/ventas/puntos/activos')

/** Obtiene todas las transacciones de venta */
export const getTransacciones = () => fetchAPI('/api/ventas/transacciones')

/** Genera el reporte diario de ventas para una fecha (YYYY-MM-DD) */
export const getReporteDiario = (fecha) => fetchAPI(`/api/ventas/reporte-diario?fecha=${fecha}`)

// ──────────── ECOMMERCE ────────────

/** Obtiene todos los pedidos online */
export const getPedidos = () => fetchAPI('/api/ecommerce/pedidos')

/** Obtiene pedidos filtrados por estado */
export const getPedidosPorEstado = (estado) => fetchAPI(`/api/ecommerce/pedidos/estado/${estado}`)

/** Obtiene el detalle de un pedido */
export const getPedido = (id) => fetchAPI(`/api/ecommerce/pedidos/${id}`)

// ──────────── INVENTARIO ────────────

/** Obtiene todos los productos activos del catálogo */
export const getProductos = () => fetchAPI('/api/inventario/productos/activos')

/** Obtiene el stock general */
export const getStock = () => fetchAPI('/api/inventario/stock')

/** Obtiene las alertas de stock bajo */
export const getAlertas = () => fetchAPI('/api/inventario/alertas')

// ──────────── FINANCIERO ────────────

/** Obtiene los KPIs financieros para un período */
export const getKpis = (inicio, fin) =>
  fetchAPI(`/api/financiero/kpis?inicio=${inicio}&fin=${fin}`)

/** Obtiene todos los ingresos */
export const getIngresos = () => fetchAPI('/api/financiero/ingresos')

/** Obtiene todos los egresos */
export const getEgresos = () => fetchAPI('/api/financiero/egresos')

// ──────────── CLIENTES ────────────

/** Obtiene todos los clientes activos */
export const getClientes = () => fetchAPI('/api/clientes/activos')

/** Obtiene los tickets de atención */
export const getTickets = () => fetchAPI('/api/clientes/tickets')

/** Obtiene tickets filtrados por estado */
export const getTicketsPorEstado = (estado) =>
  fetchAPI(`/api/clientes/tickets/estado/${estado}`)
