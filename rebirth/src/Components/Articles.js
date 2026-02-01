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
  handleCommentDislike,
  colors, // new prop
}) {
  return (
    <section
      ref={commentsRef}
      style={{
        width: "100%",
        maxWidth: "90%",
        marginBottom: "20px",
        minHeight: "110vh", // printer bleed
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: colors.pageBg, // dark mode background
        color: colors.text, // default text color
        paddingTop: "20px",
      }}
    >
      {posts.map((post) => (
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
          colors={colors} // pass colors to Post
        />
      ))}
    </section>
  );
}
