import React from 'react';

export default function Messages() {
  // Temporary placeholder data
  const currentUser = 'JakeTheSnake';
  const messages = [
    {
      id: 1,
      sender: 'JackTheSnake',
      recipient: 'OperaGuy',
      subject: 'Hello!',
      content: 'Hey Jane, how are you?',
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










// import React from 'react';

// export default function Messages({
//   messages,
//   currentUser,
//   userStats, // Expecting groups, platforms, friendsCount etc.
//   handleDeleteMessage,
//   handleLikeMessage,
//   handleDislikeMessage,
//   handleReplyClick,
//   handleShareMessage,
//   likedMessages,
//   dislikedMessages,
//   visibleRepliesMessageId,
//   handleReplyLike,
//   handleReplyDislike,
// }) {
//   // Filter messages to only those involving the current user (e.g., sender or recipient)
//   const userMessages = (messages || []).filter(
//     (msg) => msg.sender === currentUser || msg.recipient === currentUser
//   );

//   // Destructure userStats or provide defaults
//   const {
//     platforms = [],
//     friendsCount = 0,
//     groups = [],
//   } = userStats || {};

//   return (
//     <section
//       style={{
//         width: '100%',
//         maxWidth: '90%',
//         marginBottom: '20px',
//         backgroundColor: '#8c9795',
//         padding: '10px',
//         borderRadius: '8px',
//       }}
//     >
//       <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
//         {currentUser}'s Messages
//       </h2>

//       {/* User Stats Section */}
//       <div
//         style={{
//           backgroundColor: '#d1d8d6',
//           padding: '10px',
//           borderRadius: '6px',
//           marginBottom: '20px',
//           fontSize: '14px',
//           color: '#333',
//           display: 'flex',
//           justifyContent: 'space-around',
//           flexWrap: 'wrap',
//           gap: '15px',
//         }}
//       >
//         <div>
//           <strong>Number of Messages:</strong> {userMessages.length}
//         </div>
//         <div>
//           <strong>Platforms:</strong> {platforms.length > 0 ? platforms.join(', ') : 'None'}
//         </div>
//         <div>
//           <strong>Friends:</strong> {friendsCount}
//         </div>
//         <div>
//           <strong>Groups:</strong> {groups.length > 0 ? groups.join(', ') : 'None'}
//         </div>
//       </div>

//       {userMessages.length === 0 ? (
//         <p style={{ textAlign: 'center', color: '#777' }}>
//           No messages yet.
//         </p>
//       ) : (
//         userMessages.map((msg) => (
//           <article
//             key={msg.id}
//             style={{
//               backgroundColor: '#f0f0f0',
//               padding: '15px',
//               marginBottom: '15px',
//               borderRadius: '6px',
//               boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//             }}
//           >
//             {/* Example message content rendering */}
//             <h3>
//               {msg.subject || 'No Subject'}
//             </h3>
//             <p>
//               <strong>From:</strong> {msg.sender}
//               <br />
//               <strong>To:</strong> {msg.recipient}
//             </p>
//             <p>{msg.content}</p>

//             {/* Interaction buttons */}
//             <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//               <button
//                 onClick={() => handleLikeMessage(msg.id)}
//                 disabled={likedMessages.includes(msg.id)}
//               >
//                 Like ({msg.likes || 0})
//               </button>
//               <button
//                 onClick={() => handleDislikeMessage(msg.id)}
//                 disabled={dislikedMessages.includes(msg.id)}
//               >
//                 Dislike ({msg.dislikes || 0})
//               </button>
//               <button onClick={() => handleReplyClick(msg.id)}>
//                 Reply
//               </button>
//               <button onClick={() => handleShareMessage(msg.id)}>
//                 Share
//               </button>
//               <button
//                 onClick={() => handleDeleteMessage(msg.id)}
//                 style={{ marginLeft: 'auto', color: 'red' }}
//               >
//                 Delete
//               </button>
//             </div>

//             {/* Optionally render replies if visible */}
//             {visibleRepliesMessageId === msg.id && (
//               <div style={{ marginTop: '10px' }}>
//                 {/* Render replies here or a Replies component */}
//               </div>
//             )}
//           </article>
//         ))
//       )}
//     </section>
//   );
// }
