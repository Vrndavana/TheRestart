import React from "react";
import Post from "./Post";

export default function Profile({
  posts,
  currentUser,
  userStats,
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
  const userPosts = posts.filter(p => p.username === currentUser);
  const { platforms = [], friendsCount = 0, groups = [] } = userStats || {};

  return (
    <section style={{ width: "100%", maxWidth: "90%", marginBottom: "20px", backgroundColor: "#8c9795", padding: "10px", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{currentUser}'s Profile</h2>

      <div style={{ backgroundColor: "#d1d8d6", padding: "10px", borderRadius: "6px", marginBottom: "20px", fontSize: "14px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "15px" }}>
        <div><strong>Posts:</strong> {userPosts.length}</div>
        <div><strong>Platforms:</strong> {platforms.length ? platforms.join(", ") : "None"}</div>
        <div><strong>Friends:</strong> {friendsCount}</div>
        <div><strong>Groups:</strong> {groups.length ? groups.join(", ") : "None"}</div>
      </div>

      {userPosts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No posts yet.</p>
      ) : (
        userPosts.map(post => (
          <Post
            key={post.id}
            post={post}
            currentUser={currentUser}
            likedPosts={likedPosts}
            dislikedPosts={dislikedPosts}
            visibleCommentsPostId={visibleCommentsPostId}
            handleLike={handleLike}
            handleDislike={handleDislike}
            handleCommentClick={handleCommentClick}
            handleShare={handleShare}
            handleDeletePost={handleDeletePost}
            handleCommentLike={handleCommentLike}
            handleCommentDislike={handleCommentDislike}
          />
        ))
      )}
    </section>
  );
}
