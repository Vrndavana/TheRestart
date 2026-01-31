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

  // Track which platform's "Add Group" UI is open
  const [addingGroupFor, setAddingGroupFor] = useState(null);

  // Groups per platform (demo static data)
  // In real app, you'd fetch this from platform API after connection
  const platformGroups = useMemo(() => ({
    Facebook: ['Personal Page', 'Family', 'Work', 'Friends'],
    YouTube: ['Personal Page', 'Gaming Channel', 'Vlogs', 'Tech Reviews'],
    Twitter: ['Personal Page', 'News', 'Sports', 'Tech Enthusiasts'],
    Reddit: ['Personal Page', 'r/reactjs', 'r/javascript', 'r/webdev'],
    Instagram: ['Personal Page', 'Travel', 'Foodies', 'Photography'],
  }), []);

  // Track enabled groups per platform (default to "Personal Page" if connected)
  const [enabledGroups, setEnabledGroups] = useState(() =>
    availablePlatforms.reduce((acc, p) => {
      acc[p] = ['Personal Page'];
      return acc;
    }, {})
  );

  const handleConnect = (platform) => {
    setConnections((prev) => ({ ...prev, [platform]: true }));

    setPlatforms((prev) => {
      if (prev.includes(platform)) return prev;
      return [...prev, platform];
    });

    // Ensure default group is set on connect
    setEnabledGroups((prev) => {
      if (prev[platform] && prev[platform].length > 0) return prev;
      return { ...prev, [platform]: ['Personal Page'] };
    });
  };

  const handleDisconnect = (platform) => {
    setConnections((prev) => ({ ...prev, [platform]: false }));
    setPlatforms((prev) => prev.filter((p) => p !== platform));
    setEnabledGroups((prev) => {
      const copy = { ...prev };
      delete copy[platform];
      return copy;
    });
    if (addingGroupFor === platform) setAddingGroupFor(null);
  };

  const toggleGroupSelection = (platform, group) => {
    setEnabledGroups((prev) => {
      const currentGroups = prev[platform] || [];
      if (currentGroups.includes(group)) {
        // Remove group but never remove "Personal Page"
        if (group === 'Personal Page') return prev;
        return {
          ...prev,
          [platform]: currentGroups.filter((g) => g !== group),
        };
      } else {
        return {
          ...prev,
          [platform]: [...currentGroups, group],
        };
      }
    });
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

      {/* Platforms Section (Groups inside Connected Platform) */}
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
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '12px',
                backgroundColor: '#f0f0f0',
                padding: '12px 14px',
                borderRadius: '6px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontWeight: platform === 'The App' ? 700 : 500, fontSize: '16px' }}>
                  {platform}
                </span>

                {platform === 'The App' ? (
                  <span style={{ fontSize: '12px', color: '#2f4f4f' }}>Default</span>
                ) : (
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleDisconnect(platform)}
                      aria-label={`Disconnect ${platform}`}
                      style={{
                        backgroundColor: '#e53935',
                        border: 'none',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      Disconnect
                    </button>

                    <button
                      onClick={() =>
                        addingGroupFor === platform
                          ? setAddingGroupFor(null)
                          : setAddingGroupFor(platform)
                      }
                      aria-expanded={addingGroupFor === platform}
                      aria-controls={`groups-list-${platform}`}
                      style={{
                        backgroundColor: '#4a90e2',
                        border: 'none',
                        color: 'white',
                        borderRadius: '4px',
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      {addingGroupFor === platform ? 'Close Groups' : 'Add Group'}
                    </button>
                  </div>
                )}
              </div>

              {/* Show enabled groups summary */}
              {platform !== 'The App' && enabledGroups[platform] && (
                <div
                  style={{
                    fontSize: '13px',
                    color: '#555',
                    fontStyle: 'italic',
                    marginTop: '-4px',
                    marginBottom: '8px',
                  }}
                >
                  Enabled Groups: {enabledGroups[platform].join(', ')}
                </div>
              )}

              {/* Groups selection UI inside connected platform */}
              {addingGroupFor === platform && platform !== 'The App' && connections[platform] && (
                <div
                  id={`groups-list-${platform}`}
                  aria-live="polite"
                  style={{
                    backgroundColor: '#e3f2fd',
                    padding: '12px',
                    borderRadius: '8px',
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}
                >
                  <div
                    style={{
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      fontSize: '15px',
                    }}
                  >
                    Select Groups for {platform}
                  </div>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
                    {platformGroups[platform].map((group) => {
                      const checked =
                        enabledGroups[platform]?.includes(group) || false;
                      const isPersonalPage = group === 'Personal Page';

                      return (
                        <li key={group} style={{ marginBottom: '6px' }}>
                          <label
                            style={{
                              cursor: isPersonalPage ? 'default' : 'pointer',
                              color: isPersonalPage ? '#555' : '#000',
                              userSelect: 'none',
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              disabled={isPersonalPage}
                              onChange={() => toggleGroupSelection(platform, group)}
                              style={{ marginRight: '8px' }}
                            />
                            {group}
                            {isPersonalPage && ' (default)'}
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Connect Another Platform Section */}
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
