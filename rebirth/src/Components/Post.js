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
  handleCommentDislike
}) {

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

  const getLikeColor = (postId) => likedPosts.includes(postId) ? "#4CAF50" : "#ddd";
  const getDislikeColor = (postId) => dislikedPosts.includes(postId) ? "#f44336" : "#ddd";
  const getCommentLikeColor = (comment) => comment.likedBy.includes(currentUser) ? "#4CAF50" : "#ddd";
  const getCommentDislikeColor = (comment) => comment.dislikedBy.includes(currentUser) ? "#f44336" : "#ddd";

  return (
    <div style={{ backgroundColor: "#d1d8d6", padding: "10px", marginBottom: "15px", borderRadius: "8px", maxWidth: "600px", width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{post.username}</strong>
        <button
          onClick={() => handleDeletePost(post.id)}
          style={{ cursor: "pointer", color: "red", background: "transparent", border: "none", fontWeight: "bold" }}
        >
          Delete
        </button>
      </div>

      <p>{post.content}</p>

      {/* Render media */}
      {post.media && post.media.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: post.media.every(m => m.url.match(/\.(jpe?g|png|gif)$/i)) ? "repeat(3, 1fr)" : "1fr",
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
              // images & gifs
              return <img key={idx} src={m.url} alt={m.name} style={{ width: "100%", borderRadius: "5px", objectFit: "cover" }} />;
            }
          })}
        </div>
      )}

      {/* Post buttons */}
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "8px" }}>
        <button
          style={{ ...postButtonStyle, backgroundColor: getLikeColor(post.id), color: likedPosts.includes(post.id) ? "#fff" : "#000" }}
          onClick={() => handleLike(post.id)}
        >
          Like ({post.likes})
        </button>

        <button
          style={{ ...postButtonStyle, backgroundColor: getDislikeColor(post.id), color: dislikedPosts.includes(post.id) ? "#fff" : "#000" }}
          onClick={() => handleDislike(post.id)}
        >
          Dislike ({post.dislikes})
        </button>

        <button
          style={{ ...postButtonStyle, backgroundColor: "#2196F3", color: "#fff" }}
          onClick={() => handleCommentClick(post.id)}
        >
          Comments ({post.comments.length})
        </button>

        <button
          style={{ ...postButtonStyle, backgroundColor: "#FF9800", color: "#fff" }}
          onClick={() => handleShare(post.id)}
        >
          Share ({post.shares})
        </button>
      </div>

      {/* Render comments */}
      {visibleCommentsPostId === post.id && post.comments.map(comment => (
        <div key={comment.id} style={{ marginLeft: "20px", marginTop: "5px", backgroundColor: "#c3d0cf", padding: "5px", borderRadius: "5px" }}>
          <strong>{comment.username}:</strong> {comment.content}
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
