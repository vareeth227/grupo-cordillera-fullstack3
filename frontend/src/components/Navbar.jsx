// Barra de navegación principal del dashboard

const NAV_ITEMS = [
  { id: 'ventas',     label: '🏪 Ventas' },
  { id: 'ecommerce',  label: '🛒 Ecommerce' },
  { id: 'inventario', label: '📦 Inventario' },
  { id: 'financiero', label: '💰 Financiero' },
  { id: 'clientes',   label: '👥 Clientes' },
]

export default function Navbar({ activeSection, onSectionChange }) {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1a3a6e 0%, #2563eb 100%)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Logo */}
      <div style={{ color: 'white', fontWeight: 700, fontSize: '18px', padding: '16px 16px 16px 0', marginRight: '16px', borderRight: '1px solid rgba(255,255,255,0.2)' }}>
        🏔 Grupo Cordillera
      </div>

      {/* Secciones */}
      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          style={{
            background: activeSection === item.id ? 'rgba(255,255,255,0.2)' : 'transparent',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: activeSection === item.id ? 600 : 400,
            border: activeSection === item.id ? '1px solid rgba(255,255,255,0.4)' : '1px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
