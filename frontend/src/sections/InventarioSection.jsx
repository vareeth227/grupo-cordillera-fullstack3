import { useFetch } from '../hooks/useFetch'
import { getProductos, getAlertas, getStock } from '../services/api'
import KpiCard from '../components/KpiCard'

// Sección de Inventario: productos, stock y alertas de reposición
export default function InventarioSection() {
  const { data: productos, loading: lProd, error: eProd } = useFetch(getProductos)
  const { data: alertas, loading: lAlert, error: eAlert } = useFetch(getAlertas)
  const { data: stock, loading: lStock, error: eStock } = useFetch(getStock)

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#1a3a6e' }}>📦 Inventario</h2>

      {/* KPIs */}
      {!lProd && !lAlert && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <KpiCard titulo="Productos Activos" valor={productos?.length || 0} color="#1a7a3e" />
          <KpiCard titulo="Alertas Bajo Stock" valor={alertas?.length || 0} color="#c0392b" subtitulo="requieren reposición" />
          <KpiCard titulo="Registros de Stock" valor={stock?.length || 0} color="#1a56db" />
        </div>
      )}

      {/* Alertas de stock bajo */}
      {alertas?.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid #c0392b' }}>
          <h3 style={{ marginBottom: '16px', color: '#c0392b' }}>⚠️ Alertas de Stock Bajo</h3>
          {lAlert ? <div className="loading">Cargando...</div>
            : eAlert ? <div className="error">{eAlert}</div>
            : (
            <table>
              <thead>
                <tr><th>Código</th><th>Producto</th><th>Almacén</th><th>Stock Actual</th><th>Mínimo</th><th>Faltan</th></tr>
              </thead>
              <tbody>
                {alertas.map((a, i) => (
                  <tr key={i}>
                    <td>{a.codigoProducto}</td>
                    <td>{a.nombreProducto}</td>
                    <td>{a.almacen}</td>
                    <td><span className="badge badge-danger">{a.cantidadActual}</span></td>
                    <td>{a.umbralMinimo}</td>
                    <td><strong>{a.unidadesFaltantes}</strong> unidades</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Catálogo de productos */}
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>Catálogo de Productos</h3>
        {lProd ? <div className="loading">Cargando...</div>
          : eProd ? <div className="error">{eProd}</div>
          : !productos?.length ? <div className="empty">No hay productos registrados</div>
          : (
          <table>
            <thead>
              <tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th></tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td><code>{p.codigo}</code></td>
                  <td>{p.nombre}</td>
                  <td><span className="badge badge-info">{p.categoria}</span></td>
                  <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
