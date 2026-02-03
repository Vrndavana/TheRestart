import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // <-- correct import

const Nav = ({ currentUser, handleLogout }) => {
  const { theme } = useTheme(); // get current theme

  // ---------- THEME COLORS ----------
  const colors = {
    light: {
      navBg: '#4896b4', // your off-white
      borderColor: '#ccc',
      textColor: '#000',
      dislikeColor: '#e53935',
      buttonTextColor: '#fff',
    },
    dark: {
      navBg: '#333a37',
      borderColor: '#444',
      textColor: '#f5f5f5',
      dislikeColor: '#f44336',
      buttonTextColor: '#fff',
    },
  };

  const { navBg, borderColor, textColor, dislikeColor, buttonTextColor } =
    theme === 'dark' ? colors.dark : colors.light;

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
      {/* User display as link to profile */}
      <div
        style={{
          fontWeight: 'bold',
          color: textColor,
          margin: '.5% 3%',
          padding: '0 1%',
          fontSize: '10px',
        }}
      >
        <Link
          to={`/profile/${currentUser}`}
          style={{ color: textColor, textDecoration: 'none' }}
        >
          {currentUser}
        </Link>
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

        <li></li>

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

     
   
      </ul>
    </nav>
  );
};

export default Nav;
