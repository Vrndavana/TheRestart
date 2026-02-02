import React from "react";
import { useTheme } from '../ThemeContext'; // ThemeContext hook

export default function Post({
  post,
  currentUser,
  likedPosts,
  dislikedPosts,
  visibleCommentsPostId,
  handleLike,
  handleDislike,
  handleCommentClick, // This is the toggle function for comments visibility
  handleShare,
  handleDeletePost,
  handleCommentLike,
  handleCommentDislike,
}) {
  // Theme context
  const { theme } = useTheme(); // "light" or "dark"

  // Colors based on theme
  const colors = {
    pageBg: theme === "dark" ? "#121212" : "#f0f0f0",
    postBg: theme === "dark" ? "#8c9795" : "#d1d8d6",
    postButtonBg: theme === "dark" ? "#6ee7b7" : "#1877f2",
    commentBg: theme === "dark" ? "#a0a79f" : "#c3d0cf",
    text: theme === "dark" ? "#f5f5f5" : "#222",
    secondaryText: theme === "dark" ? "#e0e0e0" : "#444",
    toggleActive: "#1877f2",
    toggleInactive: "#4e4848",
  };

  // Styles
  const postButtonStyle = {
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  };

  const commentButtonStyle = {
    padding: "3px 8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "0.85em",
    margin: "0 3px",
    transition: "0.2s",
  };

  // Helper functions for button colors
  const getLikeColor = (postId) => likedPosts.includes(postId) ? "#4CAF50" : "#ddd";
  const getDislikeColor = (postId) => dislikedPosts.includes(postId) ? "#f44336" : "#ddd";
  const getCommentLikeColor = (comment) => comment.likedBy.includes(currentUser) ? "#4CAF50" : "#ddd";
  const getCommentDislikeColor = (comment) => comment.dislikedBy.includes(currentUser) ? "#f44336" : "#ddd";

  // Function to toggle comments visibility when clicking the Comments button
  const handleToggleComments = () => {
    // If the comments are currently visible for this post, hide them, else show them
    if (visibleCommentsPostId === post.id) {
      handleCommentClick(null);  // Close comments
    } else {
      handleCommentClick(post.id);  // Show comments for this post
    }
  };

  return (
    <div
      style={{
        backgroundColor: colors.postBg,
        color: colors.text,
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "8px",
        maxWidth: "600px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{post.username}</strong>

        {/* Show delete button for the post owner and SecurityGuy */}
        {(currentUser === post.username || currentUser === "SecurityGuy") && (
          <button
            onClick={() => handleDeletePost(post.id)} // Handle deletion of the current post
            style={{
              cursor: "pointer",
              color: "#e53935",
              background: "transparent",
              border: "none",
              fontWeight: "bold",
            }}
          >
            Delete
          </button>
        )}
      </div>

      <p style={{ marginTop: "6px" }}>{post.content}</p>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: post.media.every((m) => m.url.match(/\.(jpe?g|png|gif)$/i)) ? "repeat(3, 1fr)" : "1fr",
          gap: "10px",
          marginTop: "8px",
        }}>
          {post.media.map((m, idx) => {
            const lowerName = m.name.toLowerCase();
            if (lowerName.endsWith(".mp4") || lowerName.endsWith(".webm") || lowerName.endsWith(".ogg")) {
              return <video key={idx} src={m.url} controls style={{ width: "100%", borderRadius: "5px" }} />;
            } else if (lowerName.endsWith(".mp3") || lowerName.endsWith(".wav") || lowerName.endsWith(".ogg")) {
              return <audio key={idx} src={m.url} controls style={{ width: "100%" }} />;
            } else {
              return <img key={idx} src={m.url} alt={m.name} style={{ width: "100%", borderRadius: "5px", objectFit: "cover" }} />;
            }
          })}
        </div>
      )}

      {/* Post buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "8px" }}>
        <button style={{ ...postButtonStyle, backgroundColor: getLikeColor(post.id), color: likedPosts.includes(post.id) ? "#fff" : "#000" }} onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
        <button style={{ ...postButtonStyle, backgroundColor: getDislikeColor(post.id), color: dislikedPosts.includes(post.id) ? "#fff" : "#000" }} onClick={() => handleDislike(post.id)}>Dislike ({post.dislikes})</button>
        <button
          style={{ ...postButtonStyle, backgroundColor: colors.postButtonBg, color: "#fff" }}
          onClick={handleToggleComments} // Toggle Comments visibility
        >
          {visibleCommentsPostId === post.id ? 'Close Comments' : `Comments (${post.comments.length})`}
        </button>
        <button style={{ ...postButtonStyle, backgroundColor: "#FF9800", color: "#fff" }} onClick={() => handleShare(post.id)}>Share ({post.shares})</button>
      </div>

      {/* Comments */}
      {visibleCommentsPostId === post.id &&
        post.comments.map((comment) => (
          <div key={comment.id} style={{ marginLeft: "20px", marginTop: "5px", backgroundColor: colors.commentBg, padding: "5px", borderRadius: "5px", color: colors.secondaryText }}>
            <strong style={{ color: colors.text }}>{comment.username}:</strong> {comment.content}
            <div style={{ display: "flex", justifyContent: "center", marginTop: "5px" }}>
              <button
                style={{ ...commentButtonStyle, backgroundColor: getCommentLikeColor(comment), color: comment.likedBy.includes(currentUser) ? "#fff" : "#000" }}
                onClick={() => handleCommentLike(post.id, comment.id)}
              >
                Like ({comment.likes})
              </button>
              <button
                style={{ ...commentButtonStyle, backgroundColor: getCommentDislikeColor(comment), color: comment.dislikedBy.includes(currentUser) ? "#fff" : "#000" }}
                onClick={() => handleCommentDislike(post.id, comment.id)}
              >
                Dislike ({comment.dislikes})
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
