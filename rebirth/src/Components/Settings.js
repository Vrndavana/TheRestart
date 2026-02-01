// src/Components/Settings.js
import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../ThemeContext';

export default function Settings() {
  const { theme, setTheme } = useTheme();

  // ---------- THEME COLORS ----------
  const themeColors = theme === 'light'
    ? {
        bg: '#f5f5f5',
        containerBg: '#8a7a7a', // slightly off-white instead of pure white
        text: '#222',
        secondaryText: '#555',
        activeButton: '#4a90e2',
        inactiveButton: '#ccc',
        itemBg: '#fafafa', // softer than pure white
        buttonText: '#fff',
      }
    : {
        bg: '#222',
        containerBg: '#333',
        text: '#f5f5f5',
        secondaryText: '#ccc',
        activeButton: '#6ee7b7',
        inactiveButton: '#555',
        itemBg: '#444',
        buttonText: '#222',
      };

  const currentUser = 'Your Account';

  // ---------- PLATFORM & CONNECTION STATES ----------
  const [platforms, setPlatforms] = useState(['The App']);
  const allAvailablePlatforms = useMemo(
    () => ['Facebook', 'YouTube', 'Twitter', 'Reddit', 'Instagram'],
    []
  );

  const [connections, setConnections] = useState(() =>
    allAvailablePlatforms.reduce((acc, p) => {
      acc[p] = false;
      return acc;
    }, {})
  );

  const [linkedAccounts, setLinkedAccounts] = useState({});
  const [addingGroupFor, setAddingGroupFor] = useState(null);

  const platformGroups = useMemo(() => ({
    Facebook: ['Personal Page', 'My Story', 'The Family Group', 'Meme Lords of Arkansas', 'Corporate Pick Trackers'],
    YouTube: ['Personal Page', 'YT Shorts'],
    Twitter: ['Personal Page'],
    Reddit: ['Personal Page', 'r/AITA', 'r/IsThisInfected', 'r/SmoshPit'],
    Instagram: ['Personal Page', 'My Story'],
  }), []);

  const [enabledGroups, setEnabledGroups] = useState(() =>
    allAvailablePlatforms.reduce((acc, p) => {
      acc[p] = ['Personal Page'];
      return acc;
    }, {})
  );

  // ---------- SIMULATED OAUTH ----------
  const handleConnect = platform => {
    const width = 600, height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      '',
      `${platform} Login`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) return alert('Popup blocked! Please allow popups.');

    popup.document.write(`
      <h2 style="font-family:Arial,sans-serif;">${platform} OAuth Login</h2>
      <p style="font-family:Arial,sans-serif;">Simulate logging in.</p>
      <button id="loginBtn" style="padding:8px 16px;font-size:16px;">Authorize ${platform}</button>
      <script>
        document.getElementById('loginBtn').onclick = () => {
          window.opener.postMessage({ platform: "${platform}", success: true, username: "demoUser", displayName: "Demo User" }, "*");
          window.close();
        };
      </script>
    `);
  };

  useEffect(() => {
    const handleMessage = event => {
      const data = event.data;
      if (!data?.platform || !data?.success) return;

      const profile = {
        platformUserId: `${data.platform}_${Date.now()}`,
        username: data.username,
        displayName: data.displayName,
      };

      setLinkedAccounts(prev => ({ ...prev, [data.platform]: profile }));
      setPlatforms(prev => prev.includes(data.platform) ? prev : [...prev, data.platform]);
      setConnections(prev => ({ ...prev, [data.platform]: true }));
      setEnabledGroups(prev => ({ ...prev, [data.platform]: ['Personal Page'] }));
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleDisconnect = platform => {
    setPlatforms(prev => prev.filter(p => p !== platform));
    setConnections(prev => ({ ...prev, [platform]: false }));
    setLinkedAccounts(prev => {
      const copy = { ...prev };
      delete copy[platform];
      return copy;
    });
    setEnabledGroups(prev => {
      const copy = { ...prev };
      delete copy[platform];
      return copy;
    });
    if (addingGroupFor === platform) setAddingGroupFor(null);
  };

  const toggleGroupSelection = (platform, group) => {
    setEnabledGroups(prev => {
      const current = prev[platform] || [];
      if (current.includes(group)) {
        if (group === 'Personal Page') return prev;
        return { ...prev, [platform]: current.filter(g => g !== group) };
      }
      return { ...prev, [platform]: [...current, group] };
    });
  };

  return (
    <section style={{ width: '90%', maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial, sans-serif', backgroundColor: themeColors.containerBg, padding: '20px', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: themeColors.text }}>Settings for {currentUser}</h2>

      {/* Theme */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <strong style={{ color: themeColors.text }}>Theme:</strong>{' '}
        <button onClick={() => setTheme('light')} style={{
          margin: '0 10px',
          padding: '6px 12px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: theme === 'light' ? 'bold' : 'normal',
          backgroundColor: theme === 'light' ? themeColors.activeButton : themeColors.inactiveButton,
          color: themeColors.buttonText
        }}>Light</button>
        <button onClick={() => setTheme('dark')} style={{
          margin: '0 10px',
          padding: '6px 12px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: theme === 'dark' ? 'bold' : 'normal',
          backgroundColor: theme === 'dark' ? themeColors.activeButton : themeColors.inactiveButton,
          color: themeColors.buttonText
        }}>Dark</button>
      </div>

      {/* Platforms */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {platforms.map(platform => (
          <li key={platform} style={{ backgroundColor: themeColors.itemBg, padding: '12px', borderRadius: '6px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ color: themeColors.text }}>{platform}</strong>
              {platform !== 'The App' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleDisconnect(platform)} style={{ backgroundColor: '#e53935', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Disconnect</button>
                  <button onClick={() => setAddingGroupFor(addingGroupFor === platform ? null : platform)} style={{ backgroundColor: '#4a90e2', border: 'none', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                    {addingGroupFor === platform ? 'Close Threads' : 'Manage Threads'}
                  </button>
                </div>
              )}
            </div>

            {linkedAccounts[platform] && (
              <div style={{ marginTop: '6px', fontSize: '13px', color: themeColors.secondaryText }}>
                Connected as <strong>{linkedAccounts[platform].displayName}</strong><br />
                Threads: {enabledGroups[platform]?.join(', ') || 'None'}
              </div>
            )}

            {addingGroupFor === platform && (
              <ul style={{ marginTop: '10px' }}>
                {platformGroups[platform].map(group => (
                  <li key={group}>
                    <label style={{ color: themeColors.text }}>
                      <input type="checkbox" checked={enabledGroups[platform]?.includes(group)} disabled={group === 'Personal Page'} onChange={() => toggleGroupSelection(platform, group)} /> {group}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Connect New Platforms */}
      <h4 style={{ color: themeColors.text }}>Connect Another Platform</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {allAvailablePlatforms.filter(p => !platforms.includes(p)).map(platform => (
          <li key={platform} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', backgroundColor: themeColors.itemBg, padding: '8px', borderRadius: '6px' }}>
            <span style={{ color: themeColors.text }}>{platform}</span>
            <button onClick={() => handleConnect(platform)} style={{ backgroundColor: '#6ee7b7', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Connect
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
