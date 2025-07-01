import styled from './styled.module.scss';

export default function AdBanner() {
  return (
    <div
      className={styled.adContainer}
      style={{
        width: '192px',
        height: '100vh',
        background: '#2b2b2b',
        position: 'fixed',
        right: 0,
        top: '72px',
        padding: '16px',
      }}
    >
      <p style={{ color: '#e53935' }}>anuncio caralho</p>
    </div>
  );
}
