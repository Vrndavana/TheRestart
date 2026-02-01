import React from "react";

export default function Post({
  post,
  currentUser,
  likedPosts,
  dislikedPosts,
  visibleCommentsPostId,
  handleLike,
  handleDislike,
  handleCommentClick,
  handleShare,
  handleDeletePost,
  handleCommentLike,
  handleCommentDislike,
  theme = "dark", // theme prop: "dark" or "light"
}) {
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

  const getLikeColor = (postId) =>
    likedPosts.includes(postId) ? "#4CAF50" : "#ddd";
  const getDislikeColor = (postId) =>
    dislikedPosts.includes(postId) ? "#f44336" : "#ddd";
  const getCommentLikeColor = (comment) =>
    comment.likedBy.includes(currentUser) ? "#4CAF50" : "#ddd";
  const getCommentDislikeColor = (comment) =>
    comment.dislikedBy.includes(currentUser) ? "#f44336" : "#ddd";

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong>{post.username}</strong>
        <button
          onClick={() => handleDeletePost(post.id)}
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
      </div>

      <p style={{ marginTop: "6px" }}>{post.content}</p>

      {/* Render media */}
      {post.media && post.media.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: post.media.every((m) =>
              m.url.match(/\.(jpe?g|png|gif)$/i)
            )
              ? "repeat(3, 1fr)"
              : "1fr",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          {post.media.map((m, idx) => {
            const lowerName = m.name.toLowerCase();
            if (
              lowerName.endsWith(".mp4") ||
              lowerName.endsWith(".webm") ||
              lowerName.endsWith(".ogg")
            ) {
              return (
                <video
                  key={idx}
                  src={m.url}
                  controls
                  style={{ width: "100%", borderRadius: "5px" }}
                />
              );
            } else if (
              lowerName.endsWith(".mp3") ||
              lowerName.endsWith(".wav") ||
              lowerName.endsWith(".ogg")
            ) {
              return (
                <audio key={idx} src={m.url} controls style={{ width: "100%" }} />
              );
            } else {
              return (
                <img
                  key={idx}
                  src={m.url}
                  alt={m.name}
                  style={{
                    width: "100%",
                    borderRadius: "5px",
                    objectFit: "cover",
                  }}
                />
              );
            }
          })}
        </div>
      )}

      {/* Post buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginTop: "8px",
        }}
      >
        <button
          style={{
            ...postButtonStyle,
            backgroundColor: getLikeColor(post.id),
            color: likedPosts.includes(post.id) ? "#fff" : "#000",
          }}
          onClick={() => handleLike(post.id)}
        >
          Like ({post.likes})
        </button>

        <button
          style={{
            ...postButtonStyle,
            backgroundColor: getDislikeColor(post.id),
            color: dislikedPosts.includes(post.id) ? "#fff" : "#000",
          }}
          onClick={() => handleDislike(post.id)}
        >
          Dislike ({post.dislikes})
        </button>

        <button
          style={{
            ...postButtonStyle,
            backgroundColor: colors.postButtonBg,
            color: "#fff",
          }}
          onClick={() => handleCommentClick(post.id)}
        >
          Comments ({post.comments.length})
        </button>

        <button
          style={{
            ...postButtonStyle,
            backgroundColor: "#FF9800",
            color: "#fff",
          }}
          onClick={() => handleShare(post.id)}
        >
          Share ({post.shares})
        </button>
      </div>

      {/* Render comments */}
      {visibleCommentsPostId === post.id &&
        post.comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              marginLeft: "20px",
              marginTop: "5px",
              backgroundColor: colors.commentBg,
              padding: "5px",
              borderRadius: "5px",
              color: colors.secondaryText,
            }}
          >
            <strong style={{ color: colors.text }}>{comment.username}:</strong>{" "}
            {comment.content}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "5px",
              }}
            >
              <button
                style={{
                  ...commentButtonStyle,
                  backgroundColor: getCommentLikeColor(comment),
                  color: comment.likedBy.includes(currentUser) ? "#fff" : "#000",
                }}
                onClick={() => handleCommentLike(post.id, comment.id)}
              >
                Like ({comment.likes})
              </button>

              <button
                style={{
                  ...commentButtonStyle,
                  backgroundColor: getCommentDislikeColor(comment),
                  color: comment.dislikedBy.includes(currentUser) ? "#fff" : "#000",
                }}
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
