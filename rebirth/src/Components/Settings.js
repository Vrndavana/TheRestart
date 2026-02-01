import React, { useMemo, useState, useEffect } from 'react';

export default function Settings() {
  const currentUser = 'Your Account';

  // ---------- User settings ----------
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

  const platformGroups = useMemo(
    () => ({
      Facebook: ['Personal Page', 'My Story', 'The Family Group', 'Meme Lords of Arkansas', 'Corporate Pick Trackers'],
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

  // Simulated OAuth popup
  const handleConnect = (platform) => {
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    const popup = window.open(
      '',
      `${platform} Login`,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) return alert('Popup blocked! Please allow popups for this site.');

    popup.document.write(`
      <h2 style="font-family:Arial,sans-serif;">${platform} OAuth Login</h2>
      <p style="font-family:Arial,sans-serif;">Simulate logging in as a user.</p>
      <button id="loginBtn" style="padding:8px 16px;font-size:16px;">Authorize ${platform}</button>
      <script>
        const btn = document.getElementById('loginBtn');
        btn.onclick = () => {
          window.opener.postMessage(
            { platform: "${platform}", success: true, username: "demoUser", displayName: "Demo User" },
            "*"
          );
          window.close();
        };
      </script>
    `);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;
      if (!data?.platform || !data?.success) return;

      const platform = data.platform;
      const profile = {
        platformUserId: `${platform}_${Date.now()}`,
        username: data.username,
        displayName: data.displayName,
      };

      setLinkedAccounts((prev) => ({ ...prev, [platform]: profile }));
      setPlatforms((prev) => (prev.includes(platform) ? prev : [...prev, platform]));
      setConnections((prev) => ({ ...prev, [platform]: true }));
      setEnabledGroups((prev) => ({ ...prev, [platform]: ['Personal Page'] }));
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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
        return { ...prev, [platform]: current.filter((g) => g !== group) };
      }
      return { ...prev, [platform]: [...current, group] };
    });
  };

  // ---------- Static Colors ----------
  const containerBg = '#f5f5f5';
  const itemBg = '#d1d8d6';
  const secondaryText = '#000';

  return (
    <section
      style={{
        width: '90%',
        maxWidth: '700px',
        margin: '5% auto',
        backgroundColor: containerBg,
        padding: '20px',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Settings for {currentUser}</h2>

      {/* Platform connections */}
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {platforms.map((platform) => (
          <li
            key={platform}
            style={{
              backgroundColor: itemBg,
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
                    {addingGroupFor === platform ? 'Close Threads' : 'Manage Threads'}
                  </button>
                </div>
              )}
            </div>

            {linkedAccounts[platform] && (
              <div style={{ marginTop: '6px', fontSize: '13px', color: secondaryText }}>
                <div>
                  Connected as <strong>{linkedAccounts[platform].displayName}</strong>
                </div>
                <div>Threads: {enabledGroups[platform]?.join(', ') || 'None'}</div>
              </div>
            )}

            {addingGroupFor === platform && (
              <ul style={{ marginTop: '10px' }}>
                {platformGroups[platform].map((group) => (
                  <li key={group}>
                    <label>
                      <input
                        type="checkbox"
                        checked={enabledGroups[platform]?.includes(group)}
                        disabled={group === 'Personal Page'}
                        onChange={() => toggleGroupSelection(platform, group)}
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
