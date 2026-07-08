export default function KpiCard({ titulo, valor, subtitulo, color = '#4a72d4' }) {
  const shadowBase = `6px 8px 24px ${color}25, -3px -3px 10px rgba(255,255,255,0.95), inset 0 1px 0 rgba(255,255,255,0.9)`
  const shadowHover = `10px 14px 32px ${color}35, -3px -3px 12px rgba(255,255,255,1), inset 0 1px 0 rgba(255,255,255,1)`

  return (
    <div
      style={{
        background: `linear-gradient(145deg, rgba(255,255,255,0.96) 0%, ${color}12 100%)`,
        borderRadius: '22px',
        padding: '22px 24px',
        boxShadow: shadowBase,
        border: `1px solid ${color}22`,
        flex: 1,
        minWidth: '180px',
        transition: 'transform 0.22s ease, box-shadow 0.22s ease',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)'
        e.currentTarget.style.boxShadow = shadowHover
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = shadowBase
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '10px',
        background: `linear-gradient(135deg, ${color}35 0%, ${color}18 100%)`,
        marginBottom: '14px',
        boxShadow: `inset 2px 2px 5px ${color}22, inset -1px -1px 3px rgba(255,255,255,0.8)`,
      }} />
      <div style={{ fontSize: '11px', color: '#8890b0', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
        {titulo}
      </div>
      <div style={{ fontSize: '26px', fontWeight: 800, color: '#2d3152', letterSpacing: '-0.5px' }}>
        {valor}
      </div>
      {subtitulo && (
        <div style={{ fontSize: '12px', color: '#a0a8c0', marginTop: '5px' }}>{subtitulo}</div>
      )}
    </div>
  )
}
