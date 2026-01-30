import React from 'react';

export default function Profile({
  posts,
  currentUser,
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
  // Use fallback empty array to avoid error if posts is undefined
  const userPosts = (posts || []).filter(post => post.username === currentUser);

  return (
    <section style={{ width: "100%", maxWidth: "90%", marginBottom: "20px", backgroundColor: "#8c9795" }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        {currentUser}'s Profile
      </h2>

      {userPosts.length === 0 && (
        <p style={{ textAlign: 'center', color: '#777' }}>
          No posts yet.
        </p>
      )}

      {userPosts.map((post) => (
        // ... rest of your post rendering code unchanged ...
        <article key={post.id} /* ...styles and content... */>
          {/* Your existing post rendering JSX */}
        </article>
      ))}
    </section>
  );
}
