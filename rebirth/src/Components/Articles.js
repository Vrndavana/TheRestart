import React from "react";
import Post from "./Post";
import { handleUpdatePost } from "../App";

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
   handleUpdatePost={handleUpdatePost},
  colors, // theme colors
}) {
  return (
    <section
      ref={commentsRef}
      style={{
        width: "100%",
        maxWidth: "90%",
        marginBottom: "20px",
        minHeight: "110vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        backgroundColor: colors.pageBg,
        color: colors.text,
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
           handleUpdatePost={handleUpdatePost} 
        />
      ))}
    </section>
  );
}
