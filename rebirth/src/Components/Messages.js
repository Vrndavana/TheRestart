import React, { useState, useMemo, useRef, useEffect } from 'react';

// Updated default friends data with new names
const defaultFriends = [
  {
    id: 'NotL0T1Z',
    name: 'NotL0T1Z',
    handle: '@NotL0T1Z',
    online: true,
    close: true,
    mutual: 12,
    groups: 'Close Friends',
    lastActive: '2 hours ago',
  },
  {
    id: 'ImpostorSpooney',
    name: 'ImpostorSpooney',
    handle: '@ImpostorSpooney',
    online: false,
    close: false,
    mutual: 8,
    groups: 'Gaming Buddies',
    lastActive: '1 day ago',
  },
];

// Default initial messages with one message from user to each friend
const initialMessages = [
  {
    id: 1,
    sender: 'You',
    recipient: 'NotL0T1Z',
    subject: '',
    content: 'OMG is this the real L0T1Z?',
    likes: 0,
    dislikes: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: 2,
    sender: 'You',
    recipient: 'ImpostorSpooney',
    subject: '',
    content: 'OMG is this the real BigSPooney?',
    likes: 0,
    dislikes: 0,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
];

export default function Messages({ friends = defaultFriends, initialMessagesProp = initialMessages }) {
  const currentUser = 'You';

  // State for messages, initialized with initialMessages containing default messages
  const [messages, setMessages] = useState(initialMessagesProp);

  // Build a set of friend names for filtering
  const friendNames = new Set(friends.map(f => f.name));

  // Group messages by friend: key is friend name (the other party)
  // Messages where sender or recipient is currentUser and the other is friend
  const groupedMessages = useMemo(() => {
    const groups = {};
    messages.forEach(msg => {
      let otherParty = null;
      if (msg.sender === currentUser && friendNames.has(msg.recipient)) {
        otherParty = msg.recipient;
      } else if (msg.recipient === currentUser && friendNames.has(msg.sender)) {
        otherParty = msg.sender;
      }
      if (otherParty) {
        if (!groups[otherParty]) groups[otherParty] = [];
        groups[otherParty].push(msg);
      }
    });
    // Sort each conversation by timestamp ascending
    Object.values(groups).forEach(msgList => {
      msgList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    });
    return groups;
  }, [messages, friendNames, currentUser]);

  // State for which contacts are expanded (showing chat)
  const [expandedContacts, setExpandedContacts] = useState(new Set(['NotL0T1Z', 'ImpostorSpooney']));

  // State for new message inputs per contact
  const [newMessages, setNewMessages] = useState({});

  // Refs for scroll containers per contact to scroll to bottom on new message
  const scrollRefs = useRef({});

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResultsVisible, setSearchResultsVisible] = useState(false);

  // Filter friends by search term (case insensitive)
  const filteredFriends = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerTerm = searchTerm.toLowerCase();
    return friends.filter(f => f.name.toLowerCase().includes(lowerTerm));
  }, [searchTerm, friends]);

  // Toggle contact expanded/collapsed
  const toggleContact = (friend) => {
    setExpandedContacts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(friend)) {
        newSet.delete(friend);
      } else {
        newSet.add(friend);
      }
      return newSet;
    });
  };

  // Open chat for a friend from search (expand chat and clear search)
  const openChatFromSearch = (friend) => {
    setExpandedContacts(prev => new Set(prev).add(friend));
    setSearchTerm('');
    setSearchResultsVisible(false);
  };

  // Handle input change for a specific contact
  const handleInputChange = (friend, value) => {
    setNewMessages(prev => ({ ...prev, [friend]: value }));
  };

  // Handle sending new message for a specific contact
  const handleSendMessage = (friend) => {
    const content = (newMessages[friend] || '').trim();
    if (!content) return;

    const newMsg = {
      id: Date.now(),
      sender: currentUser,
      recipient: friend,
      subject: '',
      content,
      likes: 0,
      dislikes: 0,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessages(prev => ({ ...prev, [friend]: '' }));

    // Scroll to bottom after sending message
    setTimeout(() => {
      if (scrollRefs.current[friend]) {
        scrollRefs.current[friend].scrollTop = scrollRefs.current[friend].scrollHeight;
      }
    }, 50);
  };

  // Scroll to bottom when messages change for expanded contacts
  useEffect(() => {
    expandedContacts.forEach(friend => {
      if (scrollRefs.current[friend]) {
        scrollRefs.current[friend].scrollTop = scrollRefs.current[friend].scrollHeight;
      }
    });
  }, [messages, expandedContacts]);

  // Sort friends by last message timestamp descending for chat list order
  const sortedChatFriends = useMemo(() => {
    return Object.entries(groupedMessages)
      .sort(([, msgsA], [, msgsB]) => {
        const lastA = msgsA[msgsA.length - 1]?.timestamp || 0;
        const lastB = msgsB[msgsB.length - 1]?.timestamp || 0;
        return new Date(lastB) - new Date(lastA);
      })
      .map(([friend]) => friend);
  }, [groupedMessages]);

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
        position: 'relative',
      }}
      aria-label={`${currentUser}'s Messages`}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Messages</h3>

      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="search"
          placeholder="Search friends by name"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setSearchResultsVisible(true);
          }}
          onFocus={() => setSearchResultsVisible(true)}
          onBlur={() => {
            // Delay hiding to allow click on dropdown
            setTimeout(() => setSearchResultsVisible(false), 150);
          }}
          aria-label="Search friends"
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
        />
        {searchResultsVisible && (
          <ul
            role="listbox"
            aria-label="Search results"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderTop: 'none',
              maxHeight: '200px',
              overflowY: 'auto',
              zIndex: 10,
              borderRadius: '0 0 6px 6px',
              margin: 0,
              padding: 0,
              listStyle: 'none',
            }}
          >
            {filteredFriends.length === 0 ? (
              <li
                style={{
                  padding: '10px',
                  color: '#777',
                  cursor: 'default',
                }}
              >
                No Users Found
              </li>
            ) : (
              filteredFriends.map(friend => (
                <li
                  key={friend.id}
                  role="option"
                  tabIndex={0}
                  onClick={() => openChatFromSearch(friend.name)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      openChatFromSearch(friend.name);
                    }
                  }}
                  style={{
                    padding: '10px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  {friend.name} ({friend.handle})
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* Friends list with chats */}
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sortedChatFriends.length === 0 && (
          <li style={{ textAlign: 'center', color: '#777' }}>No conversations yet.</li>
        )}
        {sortedChatFriends.map(friend => {
          const isExpanded = expandedContacts.has(friend);
          const lastMsg = groupedMessages[friend][groupedMessages[friend].length - 1];
          const preview = lastMsg.content.length > 30 ? lastMsg.content.slice(0, 30) + '…' : lastMsg.content;
          const sentAt = new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <li
              key={friend}
              style={{
                marginBottom: '16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                padding: '10px',
                border: '1px solid #ccc',
              }}
            >
              <button
                onClick={() => toggleContact(friend)}
                aria-expanded={isExpanded}
                aria-controls={`chat-${friend}`}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '10px 0',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  color: '#222',
                }}
              >
                {friend}: "{preview}" <small style={{ color: '#555', fontWeight: 'normal' }}>sent at {sentAt}</small>
              </button>

              {isExpanded && (
                <div
                  id={`chat-${friend}`}
                  style={{
                    marginTop: '10px',
                    maxHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '1px solid #ccc',
                    backgroundColor: 'white',
                    borderRadius: '6px',
                    padding: '10px',
                  }}
                >
                  <div
                    ref={el => (scrollRefs.current[friend] = el)}
                    style={{
                      flexGrow: 1,
                      overflowY: 'auto',
                      marginBottom: '10px',
                    }}
                    aria-live="polite"
                  >
                    {(groupedMessages[friend] || []).map(msg => {
                      const isSentByCurrentUser = msg.sender === currentUser;
                      const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      return (
                        <div
                          key={msg.id}
                          style={{
                            marginBottom: '12px',
                            textAlign: isSentByCurrentUser ? 'right' : 'left',
                          }}
                        >
                          <div
                            style={{
                              display: 'inline-block',
                              backgroundColor: isSentByCurrentUser ? '#6ee7b7' : '#e0e0e0',
                              color: isSentByCurrentUser ? '#004d40' : '#222',
                              padding: '8px 12px',
                              borderRadius: '12px',
                              maxWidth: '70%',
                              wordWrap: 'break-word',
                            }}
                          >
                            {msg.content}
                          </div>
                          <div style={{ fontSize: '10px', color: '#555', marginTop: '2px' }}>
                            {isSentByCurrentUser ? 'You' : msg.sender} at {time}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Separate input and send button container */}
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleSendMessage(friend);
                    }}
                    style={{
                      display: 'flex',
                      gap: '10px',
                      borderTop: '1px solid #ccc',
                      paddingTop: '10px',
                    }}
                  >
                    <input
                      type="text"
                      aria-label={`Type a message to ${friend}`}
                      placeholder="Type a message"
                      value={newMessages[friend] || ''}
                      onChange={e => handleInputChange(friend, e.target.value)}
                      style={{
                        flexGrow: 1,
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        fontSize: '14px',
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#4a90e2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        flexShrink: 0,
                      }}
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
