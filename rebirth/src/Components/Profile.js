import React from 'react';

export default function Profile({
  posts,
  currentUser,
  userStats, // Expecting groups here instead of profileCreatedAt
  handleDeletePost,
  handleLike,
  handleDislike,
  handleCommentClick,
  handleShare,
  likedPosts,
  dislikedPosts,
  visibleCommentsPostId,
  handleCommentLike,
  handleCommentDislike,
}) {
  // Filter posts to only those created by the current user
  const userPosts = (posts || []).filter(post => post.username === currentUser);

  // Destructure userStats or provide defaults
  const {
    platforms = [],
    friendsCount = 0,
    groups = [], // New field for groups
  } = userStats || {};

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "90%",
        marginBottom: "20px",
        backgroundColor: "#8c9795",
        padding: '10px',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>
        {currentUser}'s Profile
      </h2>

      {/* User Stats Section */}
      <div
        style={{
          backgroundColor: '#d1d8d6',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '14px',
          color: '#333',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        <div>
          <strong>Number of Posts:</strong> {userPosts.length}
        </div>
        <div>
          <strong>Platforms:</strong> {platforms.length > 0 ? platforms.join(', ') : 'None'}
        </div>
        <div>
          <strong>Friends:</strong> {friendsCount}
        </div>
        <div>
          <strong>Groups:</strong> {groups.length > 0 ? groups.join(', ') : 'None'}
        </div>
      </div>

      {userPosts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>
          No posts yet.
        </p>
      ) : (
        userPosts.map((post) => (
          <article
            key={post.id}
            style={{
              backgroundColor: '#f0f0f0',
              padding: '15px',
              marginBottom: '15px',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {/* Example post content rendering */}
            <h3>{post.title || "Untitled Post"}</h3>
            <p>{post.content}</p>

            {/* Interaction buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button onClick={() => handleLike(post.id)} disabled={likedPosts.includes(post.id)}>
                Like ({post.likes || 0})
              </button>
              <button onClick={() => handleDislike(post.id)} disabled={dislikedPosts.includes(post.id)}>
                Dislike ({post.dislikes || 0})
              </button>
              <button onClick={() => handleCommentClick(post.id)}>
                Comments
              </button>
              <button onClick={() => handleShare(post.id)}>
                Share
              </button>
              <button onClick={() => handleDeletePost(post.id)} style={{ marginLeft: 'auto', color: 'red' }}>
                Delete
              </button>
            </div>

            {/* Optionally render comments if visible */}
            {visibleCommentsPostId === post.id && (
              <div style={{ marginTop: '10px' }}>
                {/* Render comments here or a Comments component */}
              </div>
            )}
          </article>
        ))
      )}
    </section>
  );
}
