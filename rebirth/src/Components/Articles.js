import React from "react";
import Post from "./Post";

export default function Articles({
  posts,
  commentsRef,
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
  return (
    <section style={{ width: "100%", maxWidth: "90%", marginBottom: "20px" }} ref={commentsRef}>
      {posts.map(post => (
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
      ))}
    </section>
  );
}
