import React, { useState } from "react";
import { useTheme } from '../ThemeContext';
import { Link } from "react-router-dom";  // Import Link for routing

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
  handleUpdatePost,
}) {
  const { theme } = useTheme();
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

  // States
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentFile, setNewCommentFile] = useState(null);

  // Like/Dislike helpers
  const getLikeColor = (postId) =>
    likedPosts.includes(postId) ? "#4CAF50" : "#ddd";
  const getDislikeColor = (postId) =>
    dislikedPosts.includes(postId) ? "#f44336" : "#ddd";
  const getCommentLikeColor = (comment) =>
    comment.likedBy.includes(currentUser) ? "#4CAF50" : "#ddd";
  const getCommentDislikeColor = (comment) =>
    comment.dislikedBy.includes(currentUser) ? "#f44336" : "#ddd";

  const handleToggleComments = () => {
    if (visibleCommentsPostId === post.id) handleCommentClick(null);
    else handleCommentClick(post.id);
  };

  const handleReplyToComment = (commentId) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: Date.now(),
      username: currentUser,
      content: replyText,
    };
    const updatedComments = post.comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, replies: [...(comment.replies || []), newReply] }
        : comment
    );
    handleUpdatePost({ ...post, comments: updatedComments });
    setReplyText("");
    setReplyingToCommentId(null);
  };

  // Add comment (with optional file)
  const handleAddComment = () => {
    if (!newCommentText.trim() && !newCommentFile) return;

    const fileObj = newCommentFile
      ? {
          id: Date.now() + "-file",
          name: newCommentFile.name,
          url: URL.createObjectURL(newCommentFile),
          type: newCommentFile.type,
        }
      : null;

    const newComment = {
      id: Date.now(),
      username: currentUser,
      content: newCommentText,
      likes: 0,
      dislikes: 0,
      likedBy: [],
      dislikedBy: [],
      replies: [],
      media: fileObj ? [fileObj] : [],
    };

    handleUpdatePost({ ...post, comments: [...post.comments, newComment] });

    setNewCommentText("");
    setNewCommentFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewCommentFile(e.target.files[0]);
    }
  };

  // Render media in comments
  const renderCommentMedia = (media) => {
    if (!media) return null;
    return (
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "8px", gap: "8px" }}>
        {media.map((m) => {
          const lowerName = m.name.toLowerCase();
          if (lowerName.endsWith(".mp4") || lowerName.endsWith(".webm") || lowerName.endsWith(".ogg")) {
            return (
              <video
                key={m.id}
                src={m.url}
                controls
                style={{ width: "250px", borderRadius: "5px" }}
              />
            );
          } else if (lowerName.endsWith(".mp3") || lowerName.endsWith(".wav") || lowerName.endsWith(".ogg")) {
            return (
              <audio
                key={m.id}
                src={m.url}
                controls
                style={{ width: "250px" }}
              />
            );
          } else {
            // Images keep aspect ratio
            return (
              <img
                key={m.id}
                src={m.url}
                alt={m.name}
                style={{ maxWidth: "180px", maxHeight: "180px", objectFit: "cover", borderRadius: "5px" }}
              />
            );
          }
        })}
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundColor: colors.postBg,
        color: colors.text,
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "8px",
        maxWidth: "90%",
        minWidth: '70%',
        width: '100%',
        boxSizing: "border-box",
      }}
    >
      {/* Post Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Make the username a link */}
        <Link to={`/profile/${post.username}`} style={{ color: colors.text, textDecoration: "none", fontWeight: "bold" }}>
          {post.username}
        </Link>

        {(currentUser === post.username || currentUser === "SecurityGuy") && (
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
        )}
      </div>

      <p style={{ marginTop: "6px" }}>{post.content}</p>

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: post.media.every((m) => m.url.match(/\.(jpe?g|png|gif)$/i))
              ? "repeat(3, 1fr)"
              : "1fr",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          {post.media.map((m, idx) => {
            const lowerName = m.name.toLowerCase();
            if (lowerName.endsWith(".mp4") || lowerName.endsWith(".webm") || lowerName.endsWith(".ogg")) {
              return <video key={idx} src={m.url} controls style={{maxHeight:'80vh', width: "100%", borderRadius: "5px" }} />;
            } else if (lowerName.endsWith(".mp3") || lowerName.endsWith(".wav") || lowerName.endsWith(".ogg")) {
              return <audio key={idx} src={m.url} controls style={{maxHeight:'80vh', width: "100%" }} />;
            } else {
              return <img key={idx} src={m.url} alt={m.name} style={{maxHeight:'80vh', width: "100%", borderRadius: "5px", objectFit: "cover" }} />;
            }
          })}
        </div>
      )}

      {/* Post Buttons */}
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
          style={{ ...postButtonStyle, backgroundColor: colors.postButtonBg, color: "#fff" }}
          onClick={handleToggleComments}
        >
          {visibleCommentsPostId === post.id ? 'Close Comments' : `Comments (${post.comments.length})`}
        </button>
        <button
          style={{ ...postButtonStyle, backgroundColor: "#FF9800", color: "#fff" }}
          onClick={() => handleShare(post.id)}
        >
          Share ({post.shares})
        </button>
      </div>

      {/* Comment Input */}
      {visibleCommentsPostId === post.id && (
        <div style={{ display: "flex", marginTop: "8px", alignItems: "center" }}>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Write a comment..."
            style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "1px solid #ddd", marginRight: "5px" }}
          />
          <label
            htmlFor={`file-input-${post.id}`}
            style={{
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#1976d2",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
              marginRight: "5px",
            }}
          >
            +
          </label>
          <input
            id={`file-input-${post.id}`}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            onClick={handleAddComment}
            style={{
              padding: "5px 10px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Send
          </button>
        </div>
      )}

      {/* Render Comments */}
      {visibleCommentsPostId === post.id &&
        post.comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              marginLeft: "20px",
              marginTop: "5px",
              backgroundColor: colors.commentBg,
              padding: "3%",
              color: colors.secondaryText,
            }}
          >
            <strong style={{ color: colors.text }}>{comment.username}:</strong>
            <div style={{ marginLeft: "8px", marginTop: "2px" }}>
              {comment.content}
              {renderCommentMedia(comment.media)}
            </div>

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
              <button
                style={{ ...commentButtonStyle, backgroundColor: colors.toggleActive, color: "#fff" }}
                onClick={() => setReplyingToCommentId(comment.id)}
              >
                Reply
              </button>
            </div>

            {/* Reply Section */}
            {replyingToCommentId === comment.id && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  style={{ width: "80%", padding: "5px", borderRadius: "5px", border: "1px solid #161616", marginRight: "10px" }}
                />
                <button
                  style={{ padding: "5px 10px", border: "none", borderRadius: "5px", backgroundColor: "#4CAF50", color: "#fff", cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => handleReplyToComment(comment.id)}
                >
                  Send
                </button>
              </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                {comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    style={{
                      overflowWrap: "break-word",
                      marginLeft: "20px",
                      marginTop: "5px",
                      backgroundColor: colors.commentBg,
                      padding: "5px",
                      borderRadius: "5px",
                      color: colors.secondaryText,
                    }}
                  >
                    <strong style={{ color: colors.text }}>{reply.username}:</strong> {reply.content}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
