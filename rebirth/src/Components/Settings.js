import React, { useState } from 'react';

export default function Settings() {
  // Temporary placeholder user and settings data
  const currentUser = 'Your Account';
  const userSettings = {
    emailNotifications: true,
    privacyLevel: 'FED Agents Only',
    theme: 'dark',
    platforms: ['The App'], // Default platform that cannot be removed
  };

  // State for platforms list
  const [platforms, setPlatforms] = useState(userSettings.platforms);
  const [newPlatform, setNewPlatform] = useState('');

  // Add new platform handler
  const handleAddPlatform = () => {
    const trimmed = newPlatform.trim();
    if (trimmed && !platforms.includes(trimmed)) {
      setPlatforms([...platforms, trimmed]);
      setNewPlatform('');
    }
  };

  // Remove platform handler (cannot remove "The App")
  const handleRemovePlatform = (platform) => {
    if (platform === 'The App') return;
    setPlatforms(platforms.filter(p => p !== platform));
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

      {/* Platforms Section */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
          Platforms:
        </label>
        <ul style={{ listStyle: 'none', paddingLeft: 0, marginBottom: '10px' }}>
          {platforms.map((platform) => (
            <li
              key={platform}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '6px',
                backgroundColor: '#f0f0f0',
                padding: '6px 10px',
                borderRadius: '6px',
              }}
            >
              <span style={{ flexGrow: 1 }}>{platform}</span>
              {platform !== 'The App' && (
                <button
                  onClick={() => handleRemovePlatform(platform)}
                  aria-label={`Remove platform ${platform}`}
                  style={{
                    backgroundColor: '#e53935',
                    border: 'none',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Add new platform"
            value={newPlatform}
            onChange={(e) => setNewPlatform(e.target.value)}
            aria-label="New platform name"
            style={{
              flexGrow: 1,
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #ccc',
            }}
          />
          <button
            onClick={handleAddPlatform}
            disabled={!newPlatform.trim()}
            style={{
              backgroundColor: '#6ee7b7',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 16px',
              cursor: newPlatform.trim() ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              color: '#004d40',
            }}
          >
            Add
          </button>
        </div>
      </div>

      <p style={{ textAlign: 'center', color: '#555', fontStyle: 'italic' }}>
        (This is a simple template. Other settings are currently read-only.)
      </p>
    </section>
  );
}
