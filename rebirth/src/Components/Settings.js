import React, { useMemo, useState } from 'react';

export default function Settings() {
  const currentUser = 'Your Account';

  const userSettings = {
    theme: 'dark',
    platforms: ['The App'],
  };

  const [platforms, setPlatforms] = useState(userSettings.platforms);

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

  // Linked platform profiles
  const [linkedAccounts, setLinkedAccounts] = useState({});

  const [addingGroupFor, setAddingGroupFor] = useState(null);

  const platformGroups = useMemo(
    () => ({
      Facebook: [
        'Personal Page',
        'My Story',
        'The Family Group',
        'Meme Lords of Arkansas',
        'Corporate Pick Trackers',
      ],
      YouTube: ['Personal Page', 'YT Shorts'],
      Twitter: ['Personal Page'],
      Reddit: ['Personal Page', 'r/AITA', 'r/IsThisInfected', 'r/SmoshPit'],
      Instagram: ['Personal Page', 'My Story'],
    }),
    []
  );

  const [enabledGroups, setEnabledGroups] = useState(() =>
    allAvailablePlatforms.reduce((acc, p) => {
      acc[p] = ['Personal Page'];
      return acc;
    }, {})
  );

  // Simulated OAuth auth
  const authenticatePlatform = async (platform) => {
    await new Promise((res) => setTimeout(res, 800));

    const mockProfiles = {
      Facebook: {
        platformUserId: 'fb_123',
        username: 'john.doe',
        displayName: 'John Doe',
      },
      Instagram: {
        platformUserId: 'ig_456',
        username: '@johndoe',
        displayName: 'John Doe',
      },
      Twitter: {
        platformUserId: 'tw_789',
        username: '@johndoe',
        displayName: 'John Doe',
      },
      YouTube: {
        platformUserId: 'yt_101',
        username: 'JohnDoeYT',
        displayName: 'John Doe',
      },
      Reddit: {
        platformUserId: 'rd_202',
        username: 'u/johndoe',
        displayName: 'johndoe',
      },
    };

    return mockProfiles[platform];
  };

  const handleConnect = async (platform) => {
    const profile = await authenticatePlatform(platform);

    setLinkedAccounts((prev) => ({
      ...prev,
      [platform]: profile,
    }));

    setPlatforms((prev) =>
      prev.includes(platform) ? prev : [...prev, platform]
    );

    setConnections((prev) => ({ ...prev, [platform]: true }));

    setEnabledGroups((prev) => ({
      ...prev,
      [platform]: ['Personal Page'],
    }));
  };

  const handleDisconnect = (platform) => {
    setPlatforms((prev) => prev.filter((p) => p !== platform));
    setConnections((prev) => ({ ...prev, [platform]: false }));

    setLinkedAccounts((prev) => {
      const copy = { ...prev };
      delete copy[platform];
      return copy;
    });

    setEnabledGroups((prev) => {
      const copy = { ...prev };
      delete copy[platform];
      return copy;
    });

    if (addingGroupFor === platform) setAddingGroupFor(null);
  };

  const toggleGroupSelection = (platform, group) => {
    setEnabledGroups((prev) => {
      const current = prev[platform] || [];
      if (current.includes(group)) {
        if (group === 'Personal Page') return prev;
        return {
          ...prev,
          [platform]: current.filter((g) => g !== group),
        };
      }
      return {
        ...prev,
        [platform]: [...current, group],
      };
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
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        Settings for {currentUser}
      </h2>

      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {platforms.map((platform) => (
          <li
            key={platform}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '12px',
              borderRadius: '6px',
              marginBottom: '12px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <strong>{platform}</strong>

              {platform !== 'The App' && (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleDisconnect(platform)}
                    style={{
                      backgroundColor: '#e53935',
                      border: 'none',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                    }}
                  >
                    Disconnect
                  </button>

                  <button
                    onClick={() =>
                      setAddingGroupFor(
                        addingGroupFor === platform ? null : platform
                      )
                    }
                    style={{
                      backgroundColor: '#4a90e2',
                      border: 'none',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '4px',
                    }}
                  >
                    {addingGroupFor === platform
                      ? 'Close Threads'
                      : 'Manage Threads'}
                  </button>
                </div>
              )}
            </div>

            {/* Connected account + threads summary */}
            {linkedAccounts[platform] && (
              <div
                style={{
                  marginTop: '6px',
                  fontSize: '13px',
                  color: '#444',
                }}
              >
                <div>
                  Connected as{' '}
                  <strong>{linkedAccounts[platform].displayName}</strong>
                </div>
                <div>
                  Threads:{' '}
                  {enabledGroups[platform]?.join(', ') || 'None'}
                </div>
              </div>
            )}

            {/* Thread selector */}
            {addingGroupFor === platform && (
              <ul style={{ marginTop: '10px' }}>
                {platformGroups[platform].map((group) => (
                  <li key={group}>
                    <label>
                      <input
                        type="checkbox"
                        checked={enabledGroups[platform]?.includes(group)}
                        disabled={group === 'Personal Page'}
                        onChange={() =>
                          toggleGroupSelection(platform, group)
                        }
                      />{' '}
                      {group}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <h4>Connect Another Platform</h4>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {allAvailablePlatforms
          .filter((p) => !platforms.includes(p))
          .map((platform) => (
            <li
              key={platform}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
              }}
            >
              <span>{platform}</span>
              <button
                onClick={() => handleConnect(platform)}
                style={{
                  backgroundColor: '#6ee7b7',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                }}
              >
                Connect
              </button>
            </li>
          ))}
      </ul>
    </section>
  );
}
