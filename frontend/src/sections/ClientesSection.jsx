import { useFetch } from '../hooks/useFetch'
import { getClientes, getTickets } from '../services/api'
import KpiCard from '../components/KpiCard'

// Sección de Clientes: CRM y tickets de atención
export default function ClientesSection() {
  const { data: clientes, loading: lCli, error: eCli } = useFetch(getClientes)
  const { data: tickets, loading: lTick, error: eTick } = useFetch(getTickets)

  const contarTickets = (estado) => tickets?.filter(t => t.estado === estado).length || 0

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#1a3a6e' }}>👥 Clientes</h2>

      {/* KPIs */}
      {!lCli && !lTick && (
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <KpiCard titulo="Clientes Activos" valor={clientes?.length || 0} color="#1a56db" />
          <KpiCard titulo="Tickets Abiertos" valor={contarTickets('ABIERTO')} color="#c0392b" />
          <KpiCard titulo="En Proceso" valor={contarTickets('EN_PROCESO')} color="#a0680a" />
          <KpiCard titulo="Resueltos" valor={contarTickets('RESUELTO')} color="#1a7a3e" />
        </div>
      )}

      {/* Tabla de clientes */}
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>Clientes Registrados</h3>
        {lCli ? <div className="loading">Cargando clientes...</div>
          : eCli ? <div className="error">{eCli}</div>
          : !clientes?.length ? <div className="empty">No hay clientes registrados</div>
          : (
          <table>
            <thead>
              <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Registro</th></tr>
            </thead>
            <tbody>
              {clientes.map(c => (
                <tr key={c.id}>
                  <td>#{c.id}</td>
                  <td>{c.nombre} {c.apellido}</td>
                  <td>{c.email}</td>
                  <td>{c.telefono || '-'}</td>
                  <td>{new Date(c.fechaRegistro).toLocaleDateString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Tabla de tickets */}
      <div className="card">
        <h3 style={{ marginBottom: '16px' }}>Tickets de Atención</h3>
        {lTick ? <div className="loading">Cargando tickets...</div>
          : eTick ? <div className="error">{eTick}</div>
          : !tickets?.length ? <div className="empty">No hay tickets registrados</div>
          : (
          <table>
            <thead>
              <tr><th>ID</th><th>Cliente</th><th>Asunto</th><th>Categoría</th><th>Estado</th><th>Fecha</th></tr>
            </thead>
            <tbody>
              {tickets.map(t => {
                const badgeClass = {
                  ABIERTO: 'badge-danger',
                  EN_PROCESO: 'badge-warning',
                  RESUELTO: 'badge-success',
                  CERRADO: 'badge-info'
                }[t.estado] || 'badge-info'
                return (
                  <tr key={t.id}>
                    <td>#{t.id}</td>
                    <td>Cliente #{t.clienteId}</td>
                    <td>{t.asunto}</td>
                    <td>{t.categoria}</td>
                    <td><span className={`badge ${badgeClass}`}>{t.estado}</span></td>
                    <td>{new Date(t.fechaCreacion).toLocaleDateString('es-CL')}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
