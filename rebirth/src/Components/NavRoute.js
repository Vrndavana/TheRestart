import React from 'react';
import { Link } from 'react-router-dom';

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
      {/* User display */}
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
        {/* Navigation links using Link for browser routing */}
        <li>
          <Link to="/profile" style={{ cursor: 'pointer', color: '#fafdfd', textDecoration: 'none' }}>
            Profile
          </Link>
        </li>
        <li>
          <Link to="/friends" style={{ cursor: 'pointer', color: '#fafdfd', textDecoration: 'none' }}>
            Friends
          </Link>
        </li>
        <li>
          <Link to="/messages" style={{ cursor: 'pointer', color: '#fafdfd', textDecoration: 'none' }}>
            Messages
          </Link>
        </li>
        <li>
          <Link to="/settings" style={{ cursor: 'pointer', color: '#fafdfd', textDecoration: 'none' }}>
            Settings
          </Link>
        </li>

        {/* Log out button */}
        <li>
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
