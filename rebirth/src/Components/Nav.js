import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ currentUser, handleLogout }) => {
  // ---------- STATIC COLORS ----------
  const navBg = '#ffffff';
  const borderColor = '#ccc';
  const textColor = '#000';
  const dislikeColor = '#e53935';
  const buttonTextColor = '#fff';

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: navBg,
        borderTop: `1px solid ${borderColor}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 5px',
        boxShadow: '0 -1px 5px rgba(0,0,0,0.2)',
        zIndex: 1000,
        gap: '5px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* User display */}
      <div
        style={{
          fontWeight: 'bold',
          color: textColor,
          margin: 'auto',
          padding: '0 10px',
          fontSize: '10px',
        }}
      >
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
        <li>
          <Link
            to="/friends"
            style={{ cursor: 'pointer', color: textColor, textDecoration: 'none' }}
          >
            Friends
          </Link>
        </li>

        <li>
          <Link
            to="/profile"
            style={{ cursor: 'pointer', color: textColor, textDecoration: 'none' }}
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            to="/"
            style={{ cursor: 'pointer', color: textColor, textDecoration: 'none' }}
          >
            HOME
          </Link>
        </li>

        <li>
          <Link
            to="/messages"
            style={{ cursor: 'pointer', color: textColor, textDecoration: 'none' }}
          >
            Messages
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            style={{ cursor: 'pointer', color: textColor, textDecoration: 'none' }}
          >
            Settings
          </Link>
        </li>

        {/* Log out button */}
        <li>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: dislikeColor,
              color: buttonTextColor,
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
