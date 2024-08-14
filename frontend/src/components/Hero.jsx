import React from 'react';

function Hero() {
  return (
    <div style={{ backgroundColor: '#000000', color:'grey' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#000000', margin: 0, padding: 0 }}>
        <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundSize: 'cover', backgroundPosition: 'center', margin: 0, padding: 0 }}>
          <div style={{ position: 'absolute', inset: '0', backgroundColor: '#000000', opacity: '0.5' }}></div>
          <div style={{ position: 'relative', textAlign: 'center', color: '#ffffff', padding: '32px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '16px' }}>Welcome to UserManagement App!</h1>
            <p style={{ fontSize: '1.125rem', marginBottom: '32px' }}>We are thrilled to have you here. Discover our features and get started.</p>
          </div>
        </div>
      </div>
    </div>
  );
  
}


export default Hero;
