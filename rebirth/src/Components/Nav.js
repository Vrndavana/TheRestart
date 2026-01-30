import React from 'react';

const Nav = ({ currentUser, handleLogout }) => {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#687e7c',
        borderTop: '1px solid #ddd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 5px',
        boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
        zIndex: 1000,
        gap: '5px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Buttons inside nav */}
      <div style={{ fontWeight: 'bold', color: '#fafdfd', margin: 'auto' }}>
        {currentUser}
      </div>

      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          gap: '40px',
          alignItems: 'center',
        }}
      >
        <li style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1877f2' }}>
          Home
        </li>
        <li style={{ cursor: 'pointer' }}>Profile</li>
        <li style={{ cursor: 'pointer' }}>Friends</li>
        <li style={{ cursor: 'pointer' }}>Messages</li>
        <li style={{ cursor: 'pointer' }}>Settings</li>
        <li>
          {/* Log Out Button */}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
            aria-label="Log Out"
          >
            Log Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
