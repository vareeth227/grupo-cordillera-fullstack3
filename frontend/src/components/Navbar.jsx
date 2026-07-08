const NAV_ITEMS = [
  { id: 'ventas',     label: 'Ventas' },
  { id: 'ecommerce',  label: 'Ecommerce' },
  { id: 'inventario', label: 'Inventario' },
  { id: 'financiero', label: 'Financiero' },
  { id: 'clientes',   label: 'Clientes' },
]

export default function Navbar({ activeSection, onSectionChange }) {
  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1e2d5a 0%, #2e4080 50%, #1e2d5a 100%)',
      padding: '0 32px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      boxShadow: '0 4px 20px rgba(30, 45, 90, 0.45), 0 1px 0 rgba(255,255,255,0.07)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '56px',
    }}>
      <div style={{
        color: 'white',
        fontWeight: 800,
        fontSize: '15px',
        letterSpacing: '0.3px',
        paddingRight: '24px',
        marginRight: '12px',
        borderRight: '1px solid rgba(255,255,255,0.12)',
        whiteSpace: 'nowrap',
        textShadow: '0 1px 10px rgba(120, 160, 255, 0.45)',
      }}>
        Grupo Cordillera
      </div>

      {NAV_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          style={{
            background: activeSection === item.id
              ? 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)'
              : 'transparent',
            color: activeSection === item.id ? 'white' : 'rgba(255,255,255,0.52)',
            padding: '0 16px',
            height: '34px',
            borderRadius: '10px',
            fontSize: '13px',
            fontWeight: activeSection === item.id ? 700 : 400,
            border: activeSection === item.id ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
            boxShadow: activeSection === item.id
              ? '2px 3px 10px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.14)'
              : 'none',
            transition: 'all 0.2s ease',
            letterSpacing: '0.2px',
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}
