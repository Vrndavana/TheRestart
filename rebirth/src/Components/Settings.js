import React, { useMemo, useState } from 'react';

export default function Settings() {
  // Temporary placeholder user and settings data
  const currentUser = 'Your Account';
  const userSettings = {
    emailNotifications: true,
    privacyLevel: 'FED Agents Only',
    theme: 'dark',
    platforms: ['The App'], // Default platform that cannot be removed
  };

  // Keep default The App platform
  const [platforms, setPlatforms] = useState(userSettings.platforms);

  // Available platforms to connect (static list)
  const availablePlatforms = useMemo(
    () => ['Facebook', 'YouTube', 'Twitter', 'Reddit', 'Instagram'],
    []
  );

  // Track connection state per platform (demo-only)
  const [connections, setConnections] = useState(() =>
    availablePlatforms.reduce((acc, p) => {
      acc[p] = false;
      return acc;
    }, {})
  );

  const handleConnect = (platform) => {
    // Demo: "connect" by marking connected and adding to platforms list
    setConnections((prev) => ({ ...prev, [platform]: true }));

    setPlatforms((prev) => {
      if (prev.includes(platform)) return prev;
      return [...prev, platform];
    });

    // In a real app, you'd kick off OAuth here, e.g.:
    // startOAuth(platform)
  };

  const handleDisconnect = (platform) => {
    // Optional: allow disconnect (NOT for "The App")
    setConnections((prev) => ({ ...prev, [platform]: false }));
    setPlatforms((prev) => prev.filter((p) => p !== platform));
  };

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '600px',
        margin: '20px auto',
        backgroundColor: '#8c9795',
        padding: '20px',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        color: '#222',
      }}
      aria-label="Settings"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Settings for {currentUser}
      </h2>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="emailNotifications" style={{ fontWeight: 'bold' }}>
          Email Notifications:
        </label>
        <select
          id="emailNotifications"
          defaultValue={userSettings.emailNotifications ? 'enabled' : 'disabled'}
          disabled
          style={{ marginLeft: '10px', padding: '6px', borderRadius: '6px' }}
          aria-readonly="true"
        >
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="privacyLevel" style={{ fontWeight: 'bold' }}>
          Privacy Level:
        </label>
        <select
          id="privacyLevel"
          defaultValue={userSettings.privacyLevel}
          disabled
          style={{ marginLeft: '10px', padding: '6px', borderRadius: '6px' }}
          aria-readonly="true"
        >
          <option value="public">Public</option>
          <option value="friends">Friends Only</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="theme" style={{ fontWeight: 'bold' }}>
          Theme:
        </label>
        <select
          id="theme"
          defaultValue={userSettings.theme}
          disabled
          style={{ marginLeft: '10px', padding: '6px', borderRadius: '6px' }}
          aria-readonly="true"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>

      {/* Platforms Section (Updated) */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
          Platforms:
        </label>

        {/* Always show The App as default */}
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '14px' }}>
          {platforms.map((platform) => (
            <li
              key={platform}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                marginBottom: '6px',
                backgroundColor: '#f0f0f0',
                padding: '8px 10px',
                borderRadius: '6px',
              }}
            >
              <span style={{ fontWeight: platform === 'The App' ? 700 : 500 }}>
                {platform}
              </span>

              {platform === 'The App' ? (
                <span style={{ fontSize: '12px', color: '#2f4f4f' }}>Default</span>
              ) : (
                <button
                  onClick={() => handleDisconnect(platform)}
                  aria-label={`Disconnect ${platform}`}
                  style={{
                    backgroundColor: '#e53935',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Disconnect
                </button>
              )}
            </li>
          ))}
        </ul>

        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Connect Another Platform
        </div>

        <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
          {availablePlatforms.map((platform) => {
            const isConnected = !!connections[platform];

            return (
              <li
                key={platform}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  marginBottom: '8px',
                  backgroundColor: 'rgba(255,255,255,0.55)',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                <span>{platform}</span>

                <button
                  onClick={() =>
                    isConnected ? handleDisconnect(platform) : handleConnect(platform)
                  }
                  aria-label={`${isConnected ? 'Disconnect' : 'Connect'} ${platform}`}
                  style={{
                    backgroundColor: isConnected ? '#374151' : '#6ee7b7',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: isConnected ? '#fff' : '#004d40',
                  }}
                >
                  {isConnected ? 'Connected' : 'Connect'}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p style={{ textAlign: 'center', color: '#555', fontStyle: 'italic' }}>
        (This is a simple template. Other settings are currently read-only.)
      </p>
    </section>
  );
}
