import styled from './styled.module.scss';

export default function AdBanner() {
  return (
    <div
      className={styled.adContainer}
      style={{
        width: '192px',
        height: '100vh',
        background: 'grey',
        position: 'fixed',
        right: 0,
        top: '72px',
        padding: '16px',
      }}
    >
      <p style={{ color: 'red' }}>anuncio caralho</p>
    </div>
  );
}
