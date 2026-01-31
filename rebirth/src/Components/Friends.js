import React from 'react';

export default function Friends({
  friends = [], // Array of friend objects passed as prop
  onMessage,   // Callback when clicking Message button
  onRemove,    // Callback when clicking Remove button
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all, online, close
  const [selectedFriendId, setSelectedFriendId] = React.useState(null);

  // Filter friends based on search and filter
  const filteredFriends = friends.filter(friend => {
    const matchesSearch =
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' ? true :
      filter === 'online' ? friend.online :
      filter === 'close' ? friend.close :
      true;
    return matchesSearch && matchesFilter;
  });

  const selectedFriend = friends.find(f => f.id === selectedFriendId);

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '900px',
        margin: '20px auto',
        backgroundColor: '#8c9795',
        borderRadius: '8px',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#222',
      }}
      aria-label="Friends List"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Friends</h2>

      {/* Search and filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder="Search friends by name or handle"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flexGrow: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          aria-label="Search friends"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          aria-label="Filter friends"
        >
          <option value="all">All</option>
          <option value="online">Online</option>
          <option value="close">Close Friends</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Friends list */}
        <ul
          style={{
            flex: 1,
            maxHeight: '400px',
            overflowY: 'auto',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f0f0f0',
          }}
          aria-label="Friends"
        >
          {filteredFriends.length === 0 && (
            <li style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              No friends found.
            </li>
          )}
          {filteredFriends.map(friend => (
            <li
              key={friend.id}
              onClick={() => setSelectedFriendId(friend.id)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedFriendId(friend.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-pressed={selectedFriendId === friend.id}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                backgroundColor: selectedFriendId === friend.id ? '#d1d8d6' : 'transparent',
                borderBottom: '1px solid #ccc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <strong>{friend.name}</strong> <span style={{ color: '#666' }}>({friend.handle})</span>
                <div style={{ fontSize: '12px', color: friend.online ? 'green' : 'gray' }}>
                  {friend.online ? 'Online' : 'Offline'} {friend.close ? '• Close Friend' : ''}
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>{friend.mutual} mutual friends</div>
            </li>
          ))}
        </ul>

        {/* Selected friend details */}
        <aside
          style={{
            flexBasis: '300px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 0 8px rgba(0,0,0,0.1)',
            display: selectedFriend ? 'block' : 'none',
          }}
          aria-live="polite"
        >
          {selectedFriend && (
            <>
              <h3>{selectedFriend.name}</h3>
              <p style={{ color: '#666' }}>{selectedFriend.handle}</p>
              <p>Status: {selectedFriend.online ? 'Online' : 'Offline'}</p>
              <p>Mutual Friends: {selectedFriend.mutual}</p>
              <p>Groups: {selectedFriend.groups}</p>
              <p>Last Active: {selectedFriend.lastActive}</p>

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onMessage && onMessage(selectedFriend)}
                  style={{
                    flexGrow: 1,
                    padding: '10px',
                    backgroundColor: '#6ee7b7',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Message
                </button>
                <button
                  onClick={() => onRemove && onRemove(selectedFriend)}
                  style={{
                    flexGrow: 1,
                    padding: '10px',
                    backgroundColor: '#e53935',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  Remove
                </button>
              </div>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
