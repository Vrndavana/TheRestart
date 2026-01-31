import React from 'react';

export default function Messages() {
  // Temporary placeholder data
  const currentUser = 'Feature Under Development';
  const messages = [
    {
      id: 1,
      sender: 'JackTheSnake',
      recipient: 'OperaGuy',
      subject: 'Hello!',
      content: 'How Are Yuh?',
      likes: 2,
      dislikes: 0,
    },
    {
      id: 2,
      sender: 'OperaGuy',
      recipient: 'JakeTheSnake',
      subject: 'Re: Hello!',
      content: 'Hi Jake! I am good, thanks!',
      likes: 3,
      dislikes: 1,
    },
  ];

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '90%',
        margin: '20px auto',
        backgroundColor: '#8c9795',
        padding: '10px',
        borderRadius: '8px',
        fontFamily: 'Arial, sans-serif',
        color: '#222',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>
        {currentUser}'s Messages
      </h3>

      {messages.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No messages yet.</p>
      ) : (
        messages.map((msg) => (
          <article
            key={msg.id}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{msg.subject}</h3>
            <p>
              <strong>From:</strong> {msg.sender} <br />
              <strong>To:</strong> {msg.recipient}
            </p>
            <p>{msg.content}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button disabled>Like ({msg.likes})</button>
              <button disabled>Dislike ({msg.dislikes})</button>
              <button disabled>Reply</button>
              <button disabled>Share</button>
              <button disabled style={{ marginLeft: 'auto', color: 'red' }}>
                Delete
              </button>
            </div>
          </article>
        ))
      )}
    </section>
  );
}

