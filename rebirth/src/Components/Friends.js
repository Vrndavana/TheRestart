import React from 'react';

// Default list of all users
const allUsers = [
  { id: 'L0T1Z', name: 'L0T1Z', handle: '@L0T1Z', online: true, close: true, mutual: 12, groups: 'Close Friends', lastActive: '2 hours ago' },
  { id: 'bigspooney', name: 'Big Spooney', handle: '@bigspooney', online: false, close: false, mutual: 8, groups: 'Gaming Buddies', lastActive: '1 day ago' },
  { id: 'johnDoe', name: 'John Doe', handle: '@johnDoe', online: true, close: false, mutual: 5, groups: 'Work', lastActive: '30 minutes ago' },
  { id: 'janeSmith', name: 'Jane Smith', handle: '@janeSmith', online: true, close: true, mutual: 15, groups: 'Close Friends', lastActive: '1 hour ago' },
  { id: 'OperaGuy', name: 'Opera Guy', handle: '@OperaGuy', online: true, close: false, mutual: 3, groups: 'Music Lovers', lastActive: '10 minutes ago' },  // Added OperaGuy
  { id: 'SecurityGuy', name: 'Security Guy', handle: '@SecurityGuy', online: false, close: true, mutual: 10, groups: 'Security Experts', lastActive: '5 hours ago' },  // Added SecurityGuy
  { id: 'NOTL0T1Z', name: 'NOT L0T1Z', handle: '@NOTL0T1Z', online: true, close: false, mutual: 7, groups: 'Tech Enthusiasts', lastActive: '1 hour ago' }, // Added NOTL0T1Z
];

export default function Friends({
  friends = [],
  onMessage,
  onRemove,
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all, online, close
  const [expandedFriendId, setExpandedFriendId] = React.useState(null); // track which user details are expanded
  const [favoriteUsers, setFavoriteUsers] = React.useState([]); // Track favorites
  const [currentFriends, setCurrentFriends] = React.useState([ 'NOTL0T1Z' ]); // Default: NOTL0T1Z is a friend

  // Filter all users based on search term and filter
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.handle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ? true : 
      filter === 'online' ? user.online : 
      filter === 'close' ? user.close : 
      true;

    return matchesSearch && matchesFilter;
  });

  // Toggle favorite status
  const toggleFavorite = (userId) => {
    setFavoriteUsers(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  // Toggle user info visibility when clicking the contact area
  const toggleUserDetails = (userId) => {
    if (expandedFriendId === userId) {
      setExpandedFriendId(null);  // Close the details if already open
    } else {
      setExpandedFriendId(userId); // Open the details for the selected user
    }
  };

  // Toggle friend status (Add/Remove)
  const toggleFriendStatus = (userId) => {
    setCurrentFriends(prev => {
      if (prev.includes(userId)) {
        // Remove from friends
        return prev.filter(id => id !== userId);
      } else {
        // Add to friends
        return [...prev, userId];
      }
    });
  };

  // Separate friends and users
  const friendsList = filteredUsers.filter(user => currentFriends.includes(user.id));
  const usersList = filteredUsers.filter(user => !currentFriends.includes(user.id));

  return (
    <section
      style={{
        width: '99%',
        maxWidth: '90%',
        margin: '20px auto',
        backgroundColor: '#8c9795',
        borderRadius: '8px',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        color: '#222',
      }}
      aria-label="Users List"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Friends & Users</h2>

      {/* Search and filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="search"
          placeholder="Search users by name or handle"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ flexGrow: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          aria-label="Search users"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
          aria-label="Filter users"
        >
          <option value="all">All</option>
          <option value="online">Online</option>
          <option value="close">Close Friends</option>
        </select>
      </div>

      {/* Friends Section */}
      <h3>Friends</h3>
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
        {friendsList.length === 0 && (
          <li style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No friends added.
          </li>
        )}
        {friendsList.map(user => (
          <li key={user.id} onClick={() => toggleUserDetails(user.id)} style={{
            padding: '12px 16px',
            cursor: 'pointer',
            backgroundColor: expandedFriendId === user.id ? '#d1d8d6' : 'transparent',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'background-color 0.3s ease',
          }}>
            <div>
              <strong>{user.name}</strong> <span style={{ color: '#666' }}>({user.handle})</span>
              <div style={{ fontSize: '12px', color: user.online ? 'green' : 'gray' }}>
                {user.online ? 'Online' : 'Offline'} {user.close ? '• Close Friend' : ''}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {user.mutual} mutual friends
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(user.id);
                }}
                style={{
                  marginLeft: '10px',
                  padding: '6px 10px',
                  backgroundColor: favoriteUsers.includes(user.id) ? '#FFD700' : '#ccc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                {favoriteUsers.includes(user.id) ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
            {expandedFriendId === user.id && (
              <div style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#f9f9f9',
                border: '1px solid #ccc',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                alignItems: 'center',
              }}>
                <div>
                  <h4>Contact Details</h4>
                  <p><strong>Status:</strong> {user.online ? 'Online' : 'Offline'}</p>
                  <p><strong>Mutual Friends:</strong> {user.mutual}</p>
                  <p><strong>Groups:</strong> {user.groups}</p>
                  <p><strong>Last Active:</strong> {user.lastActive}</p>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column', // Buttons stacked
                  gap: '10px',
                }}>
                  <button
                    onClick={() => alert(`Viewing ${user.name}'s profile`)} // Add a handler for the profile view
                    style={{
                      padding: '10px',
                      backgroundColor: '#6e7b7',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => onMessage && onMessage(user)}
                    style={{
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
                    onClick={() => toggleFriendStatus(user.id)}
                    style={{
                      padding: '10px',
                      backgroundColor: '#e53935',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    Remove Friend
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Users Section */}
      <h3>Users</h3>
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
        aria-label="Users"
      >
        {usersList.length === 0 && (
          <li style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
            No users available.
          </li>
        )}
        {usersList.map(user => (
          <li key={user.id} onClick={() => toggleUserDetails(user.id)} style={{
            padding: '12px 16px',
            cursor: 'pointer',
            backgroundColor: expandedFriendId === user.id ? '#d1d8d6' : 'transparent',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'background-color 0.3s ease',
          }}>
            <div>
              <strong>{user.name}</strong> <span style={{ color: '#666' }}>({user.handle})</span>
              <div style={{ fontSize: '12px', color: user.online ? 'green' : 'gray' }}>
                {user.online ? 'Online' : 'Offline'} {user.close ? '• Close Friend' : ''}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {user.mutual} mutual friends
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(user.id);
                }}
                style={{
                  marginLeft: '10px',
                  padding: '6px 10px',
                  backgroundColor: favoriteUsers.includes(user.id) ? '#FFD700' : '#ccc',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                {favoriteUsers.includes(user.id) ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
            {expandedFriendId === user.id && (
              <div style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#f9f9f9',
                border: '1px solid #ccc',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                alignItems: 'center',
              }}>
                <div>
                  <h4>Contact Details</h4>
                  <p><strong>Status:</strong> {user.online ? 'Online' : 'Offline'}</p>
                  <p><strong>Mutual Friends:</strong> {user.mutual}</p>
                  <p><strong>Groups:</strong> {user.groups}</p>
                  <p><strong>Last Active:</strong> {user.lastActive}</p>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column', // Buttons stacked
                  gap: '10px',
                }}>
                  <button
                    onClick={() => alert(`Viewing ${user.name}'s profile`)} // Placeholder for profile
                    style={{
                      padding: '10px',
                      backgroundColor: '#6e7b7',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => onMessage && onMessage(user)}
                    style={{
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
                    onClick={() => toggleFriendStatus(user.id)}
                    style={{
                      padding: '10px',
                      backgroundColor: '#6ee7b7',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    Add Friend
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
