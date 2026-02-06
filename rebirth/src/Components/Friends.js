import React from 'react';
import { Link } from 'react-router-dom'; // ✅ import Link for routing

export default function Friends({
  currentUser = '',        // Current logged in user
  userFriends = [],        // Array of currentUser's friends IDs
  onMessage,
  newUsers = [],           // Optional prop for dynamically added users
}) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState('all'); // all, online, close
  const [expandedFriendId, setExpandedFriendId] = React.useState(null);
  const [favoriteUsers, setFavoriteUsers] = React.useState([]);

  // Track friend requests & confirmed friendships
  const [friendStatus, setFriendStatus] = React.useState({});

  // Stateful user list combining default + new users
  const [users, setUsers] = React.useState([
    { id: 'L0T1Z', name: 'L0T1Z', handle: '@L0T1Z', online: true, close: true, mutual: 12, groups: 'Close Friends', lastActive: '2 hours ago' },
    { id: 'bigspooney', name: 'Big Spooney', handle: '@bigspooney', online: false, close: false, mutual: 8, groups: 'Gaming Buddies', lastActive: '1 day ago' },
    { id: 'johnDoe', name: 'John Doe', handle: '@johnDoe', online: true, close: false, mutual: 5, groups: 'Work', lastActive: '30 minutes ago' },
    { id: 'janeSmith', name: 'Jane Smith', handle: '@janeSmith', online: true, close: true, mutual: 15, groups: 'Close Friends', lastActive: '1 hour ago' },
    { id: 'OperaGuy', name: 'Opera Guy', handle: '@OperaGuy', online: true, close: false, mutual: 3, groups: 'Music Lovers', lastActive: '10 minutes ago' },
    { id: 'SecurityGuy', name: 'Security Guy', handle: '@SecurityGuy', online: false, close: true, mutual: 10, groups: 'Security Experts', lastActive: '5 hours ago' },
    { id: 'NOTL0T1Z', name: 'NOT L0T1Z', handle: '@NOTL0T1Z', online: true, close: false, mutual: 7, groups: 'Tech Enthusiasts', lastActive: '1 hour ago' },
    ...newUsers // merge any newly created users dynamically
  ]);

  // Toggle favorite
  const toggleFavorite = (userId) => {
    setFavoriteUsers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  // Toggle user details expand/collapse
  const toggleUserDetails = (userId) => {
    setExpandedFriendId(prev => prev === userId ? null : userId);
  };

  // Add friend / handle friend request logic
  const toggleFriendStatus = (userId) => {
    const keyAtoB = `${currentUser}-${userId}`;
    const keyBtoA = `${userId}-${currentUser}`;

    setFriendStatus(prev => {
      const newStatus = { ...prev };

      if (prev[keyBtoA] === 'pending') {
        newStatus[keyAtoB] = 'confirmed';
        newStatus[keyBtoA] = 'confirmed';
      } else if (prev[keyAtoB] === 'confirmed') {
        delete newStatus[keyAtoB];
        delete newStatus[keyBtoA];
      } else {
        newStatus[keyAtoB] = 'pending';
      }

      return newStatus;
    });
  };

  // Filter users by search/filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.handle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ? true : filter === 'online' ? user.online : filter === 'close' ? user.close : true;
    return matchesSearch && matchesFilter;
  });

  // Split friends vs users (non-friends)
  const friendsList = filteredUsers.filter(user => userFriends.includes(user.id));
  const usersList = filteredUsers.filter(user => !userFriends.includes(user.id));

  // Helper for background color
  const getBackgroundColor = (userId) => {
    const keyAtoB = `${currentUser}-${userId}`;
    const keyBtoA = `${userId}-${currentUser}`;

    if (friendStatus[keyAtoB] === 'confirmed' || friendStatus[keyBtoA] === 'confirmed') return '#add8e6';
    if (friendStatus[keyAtoB] === 'pending' || friendStatus[keyBtoA] === 'pending') return '#fff9c4';
    return 'transparent';
  };

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
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
        >
          <option value="all">All</option>
          <option value="online">Online</option>
          <option value="close">Close Friends</option>
        </select>
      </div>

      {/* Friends Section */}
      <h3>Friends</h3>
      <ul style={{ flex: 1, maxHeight: '400px', overflowY: 'auto', listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>
        {friendsList.length === 0 && <li style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No friends added.</li>}
        {friendsList.map(user => (
          <li key={user.id} onClick={() => toggleUserDetails(user.id)} style={{ padding: '12px 16px', cursor: 'pointer', backgroundColor: getBackgroundColor(user.id), borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.3s ease' }}>
            <div>
              <strong>{user.name}</strong> <span style={{ color: '#666' }}>({user.handle})</span>
              <div style={{ fontSize: '12px', color: user.online ? 'green' : 'gray' }}>
                {user.online ? 'Online' : 'Offline'} {user.close ? '• Close Friend' : ''}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {user.mutual} mutual friends
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(user.id); }} style={{ marginLeft: '10px', padding: '6px 10px', backgroundColor: favoriteUsers.includes(user.id) ? '#FFD700' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                {favoriteUsers.includes(user.id) ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
            {expandedFriendId === user.id && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                <div>
                  <h4>Contact Details</h4>
                  <p><strong>Status:</strong> {user.online ? 'Online' : 'Offline'}</p>
                  <p><strong>Mutual Friends:</strong> {user.mutual}</p>
                  <p><strong>Groups:</strong> {user.groups}</p>
                  <p><strong>Last Active:</strong> {user.lastActive}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link to={`/profile/${user.name}`} style={{ padding: '10px', backgroundColor: '#444', border: 'grey', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', color: 'white' }}>
                    Profile
                  </Link>
                  <Link to={`/messages/${currentUser}-${user.id}`} style={{ padding: '10px', backgroundColor: '#6ee7b7', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', color: '#222' }}>
                    Message
                  </Link>
                  <button onClick={() => toggleFriendStatus(user.id)} style={{ padding: '10px', backgroundColor: friendStatus[`${currentUser}-${user.id}`] === 'confirmed' ? '#e53935' : '#6ee7b7', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>
                    {friendStatus[`${currentUser}-${user.id}`] === 'confirmed' ? 'Remove Friend' : 'Add Friend'}
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Users Section */}
      <h3>Users</h3>
      <ul style={{ flex: 1, maxHeight: '400px', overflowY: 'auto', listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f0f0f0' }}>
        {usersList.length === 0 && <li style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No users available.</li>}
        {usersList.map(user => (
          <li key={user.id} onClick={() => toggleUserDetails(user.id)} style={{ padding: '12px 16px', cursor: 'pointer', backgroundColor: getBackgroundColor(user.id), borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background-color 0.3s ease' }}>
            <div>
              <strong>{user.name}</strong> <span style={{ color: '#666' }}>({user.handle})</span>
              <div style={{ fontSize: '12px', color: user.online ? 'green' : 'gray' }}>
                {user.online ? 'Online' : 'Offline'} {user.close ? '• Close Friend' : ''}
              </div>
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {user.mutual} mutual friends
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(user.id); }} style={{ marginLeft: '10px', padding: '6px 10px', backgroundColor: favoriteUsers.includes(user.id) ? '#FFD700' : '#ccc', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>
                {favoriteUsers.includes(user.id) ? 'Unfavorite' : 'Favorite'}
              </button>
            </div>
            {expandedFriendId === user.id && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ccc', borderRadius: '8px', display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
                <div>
                  <h4>Contact Details</h4>
                  <p><strong>Status:</strong> {user.online ? 'Online' : 'Offline'}</p>
                  <p><strong>Mutual Friends:</strong> {user.mutual}</p>
                  <p><strong>Groups:</strong> {user.groups}</p>
                  <p><strong>Last Active:</strong> {user.lastActive}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Link to={`/profile/${user.name}`} style={{ padding: '10px', backgroundColor: '#444', border: 'grey', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', color: 'white' }}>
                    Profile
                  </Link>
                  <Link to={`/messages/${currentUser}-${user.id}`} style={{ padding: '10px', backgroundColor: '#6ee7b7', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', textAlign: 'center', textDecoration: 'none', color: '#222' }}>
                    Message
                  </Link>
                  <button onClick={() => toggleFriendStatus(user.id)} style={{ padding: '10px', backgroundColor: friendStatus[`${currentUser}-${user.id}`] === 'confirmed' ? '#e53935' : '#6ee7b7', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: 'white' }}>
                    {friendStatus[`${currentUser}-${user.id}`] === 'confirmed' ? 'Remove Friend' : 'Add Friend'}
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
