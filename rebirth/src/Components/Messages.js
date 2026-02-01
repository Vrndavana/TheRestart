import React, { useState, useMemo, useRef } from 'react';
import { useTheme } from '../ThemeContext';

const defaultFriends = [
  { id: 'NotL0T1Z', name: 'NotL0T1Z', handle: '@NotL0T1Z', online: true, close: true, mutual: 12, groups: 'Close Friends', lastActive: '2 hours ago' },
  { id: 'ImpostorSpooney', name: 'ImpostorSpooney', handle: '@ImpostorSpooney', online: false, close: false, mutual: 8, groups: 'Gaming Buddies', lastActive: '1 day ago' }
];

const initialMessages = [
  { id: 1, sender: 'You', recipient: 'NotL0T1Z', subject: '', content: 'OMG is this the real L0T1Z?', likes: 0, dislikes: 0, timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: 2, sender: 'You', recipient: 'ImpostorSpooney', subject: '', content: 'OMG is this the real BigSPooney?', likes: 0, dislikes: 0, timestamp: new Date(Date.now() - 1800000).toISOString() }
];

export default function Messages({ friends = defaultFriends, initialMessagesProp = initialMessages }) {
  const currentUser = 'You';
  const { theme } = useTheme();

  const [messages, setMessages] = useState(initialMessagesProp);
  const [expandedContacts, setExpandedContacts] = useState(new Set());
  const [newMessages, setNewMessages] = useState({});
  const scrollRefs = useRef({});

  const friendNames = new Set(friends.map(f => f.name));

  const groupedMessages = useMemo(() => {
    const groups = {};
    messages.forEach(msg => {
      let otherParty = null;
      if (msg.sender === currentUser && friendNames.has(msg.recipient)) otherParty = msg.recipient;
      else if (msg.recipient === currentUser && friendNames.has(msg.sender)) otherParty = msg.sender;
      if (otherParty) {
        if (!groups[otherParty]) groups[otherParty] = [];
        groups[otherParty].push(msg);
      }
    });
    Object.values(groups).forEach(msgList => msgList.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));
    return groups;
  }, [messages, friendNames, currentUser]);

  const toggleContact = friend => setExpandedContacts(prev => {
    const newSet = new Set(prev);
    newSet.has(friend) ? newSet.delete(friend) : newSet.add(friend);
    return newSet;
  });

  const handleInputChange = (friend, value) => setNewMessages(prev => ({ ...prev, [friend]: value }));

  const handleSendMessage = friend => {
    const content = (newMessages[friend] || '').trim();
    if (!content) return;
    const newMsg = { id: Date.now(), sender: currentUser, recipient: friend, subject: '', content, likes: 0, dislikes: 0, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, newMsg]);
    setNewMessages(prev => ({ ...prev, [friend]: '' }));
    setTimeout(() => {
      if (scrollRefs.current[friend]) scrollRefs.current[friend].scrollTop = scrollRefs.current[friend].scrollHeight;
    }, 50);
  };

  const sortedChatFriends = useMemo(() => Object.entries(groupedMessages)
    .sort(([, msgsA], [, msgsB]) => new Date(msgsB[msgsB.length - 1]?.timestamp || 0) - new Date(msgsA[msgsA.length - 1]?.timestamp || 0))
    .map(([friend]) => friend), [groupedMessages]);

  // ---------- THEME COLORS ----------
  const colors = useMemo(() => theme === 'light'
    ? {
        bg: '#f5f5f5',
        containerBg: '#afa4a4', // off-white for container
        text: '#222',
        secondaryText: '#555',
        chatBg: '#f0f0f0',
        inputBg: '#fff',
        inputBorder: '#aaa',
        sentMsg: '#6ee7b7',
        recvMsg: '#eee',
        sentText: '#000',
        recvText: '#222',
        buttonBg: '#4a90e2',
        buttonText: '#fff'
      }
    : {
        bg: '#222',
        containerBg: '#333',
        text: '#f5f5f5',
        secondaryText: '#ccc',
        chatBg: '#444',
        inputBg: '#555',
        inputBorder: '#888',
        sentMsg: '#6ee7b7',
        recvMsg: '#555',
        sentText: '#222',
        recvText: '#f5f5f5',
        buttonBg: '#6ee7b7',
        buttonText: '#222'
      }, [theme]);

  return (
    <section style={{
      width: '100%',
      maxWidth: '900px',
      margin: '20px auto',
      backgroundColor: colors.containerBg,
      borderRadius: '8px',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: colors.text
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Messages</h3>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {sortedChatFriends.length === 0 && <li style={{ textAlign: 'center', color: colors.secondaryText }}>No conversations yet.</li>}
        {sortedChatFriends.map(friend => {
          const isExpanded = expandedContacts.has(friend);
          const lastMsg = groupedMessages[friend][groupedMessages[friend].length - 1];
          const preview = lastMsg.content.length > 30 ? lastMsg.content.slice(0, 30) + '…' : lastMsg.content;
          const sentAt = new Date(lastMsg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          return (
            <li key={friend} style={{ marginBottom: '16px', backgroundColor: colors.chatBg, borderRadius: '8px', padding: '10px' }}>
              <button onClick={() => toggleContact(friend)} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', color: colors.text }}>
                <strong>{friend}</strong>: "{preview}" <small style={{ color: colors.secondaryText }}>sent at {sentAt}</small>
              </button>

              {isExpanded && (
                <div ref={el => (scrollRefs.current[friend] = el)} style={{ marginTop: '10px', maxHeight: '300px', overflowY: 'auto', backgroundColor: colors.inputBg, borderRadius: '6px', padding: '10px' }}>
                  {(groupedMessages[friend] || []).map(msg => {
                    const isSentByCurrentUser = msg.sender === currentUser;
                    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    return (
                      <div key={msg.id} style={{ marginBottom: '12px', textAlign: isSentByCurrentUser ? 'right' : 'left' }}>
                        <div style={{
                          display: 'inline-block',
                          backgroundColor: isSentByCurrentUser ? colors.sentMsg : colors.recvMsg,
                          color: isSentByCurrentUser ? colors.sentText : colors.recvText,
                          padding: '8px 12px',
                          borderRadius: '12px',
                          maxWidth: '70%',
                          wordWrap: 'break-word'
                        }}>
                          {msg.content}
                        </div>
                        <div style={{ fontSize: '10px', color: colors.secondaryText, marginTop: '2px' }}>
                          {isSentByCurrentUser ? 'You' : msg.sender} at {time}
                        </div>
                      </div>
                    )
                  })}
                  <form onSubmit={e => { e.preventDefault(); handleSendMessage(friend); }} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <input type="text" value={newMessages[friend] || ''} onChange={e => handleInputChange(friend, e.target.value)} placeholder="Type a message" style={{ flexGrow: 1, padding: '10px', borderRadius: '6px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.text }} />
                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: colors.buttonBg, color: colors.buttonText, border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Send</button>
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
