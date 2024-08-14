import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearPersistedData } from '../redux/clearPersistData'

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    clearPersistedData();
  };

  return (
    <div style={{ backgroundColor: '#ffff' }}>
      <nav style={{ width: '100%', backgroundColor: '#0000', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#c53030' }}>USERMANAGEMENT-APP</span>
              <Link to="/home">
                <button style={{ padding: '12px 24px', backgroundColor: '#000000', color: '#ffffff', fontWeight: '600', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '16px', transition: 'color 0.3s' }}>
                  Home
                </button>
              </Link>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={handleLogout} style={{ padding: '12px 24px', backgroundColor: '#000000', color: '#ffffff', fontWeight: '600', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'color 0.3s' }}>
                  Logout
                </button>
              <Link to="/profile">
                <button style={{ padding: '12px 24px', backgroundColor: '#000000', color: '#ffffff', fontWeight: '600', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', transition: 'color 0.3s', marginLeft: '16px' }}>
                  Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
  
}

export default Header;
