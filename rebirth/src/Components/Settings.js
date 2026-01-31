import React from 'react';

export default function Settings() {
  // Temporary placeholder user and settings data
  const currentUser = 'Your Account';
  const userSettings = {
    emailNotifications: true,
    privacyLevel: 'friends',
    theme: 'dark',
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

      <p style={{ textAlign: 'center', color: '#555', fontStyle: 'italic' }}>
        (This is a simple template. Settings are currently read-only.)
      </p>
    </section>
  );
}
