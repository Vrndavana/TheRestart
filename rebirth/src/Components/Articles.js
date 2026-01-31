// src/Components/Articles.js Needs To be Exported to APP.js - To Do So We Use Export Default
import React from "react";

export default function Articles({
  posts,
  commentsRef,
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
  handleCommentDislike,}) 
 
    {return(

        <section style={{ width: "100%", maxWidth: "90%", marginBottom: "20px",}} ref={commentsRef}>
        
                            {/* Begininng of Post Content of USER NOT INTERACTS  */}
            {posts.map((post) => (
            <article
                key={post.id}
                style={{
            marginBottom: "20px",
            backgroundColor: "#c5cdda",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            position: "relative",
            overflowWrap: "break-word",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
                }}>

                <h3>{post.username}</h3>
                <p>{post.content}</p>

                {/* Show media if any */}
                {post.media && (
                    <div style={{ marginTop: "10px" }}>
              {/* Display media based on type */}
              {post.media.match(/\.(jpeg|jpg|gif|png)$/i) ? (
                <img
                  src={post.media}
                  alt="Post media"
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              ) : post.media.match(/\.(mp4|webm|ogg)$/i) ? (
                <video
                  controls
                  src={post.media}
                  style={{ maxWidth: "100%", borderRadius: "8px" }}
                />
              ) : post.media.match(/\.(mp3|wav|ogg)$/i) ? (
                <audio controls src={post.media} style={{ width: "100%" }} />
              ) : (
                <a
                  href={post.media}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1976d2" }}
                >
                  {post.mediaName || "Download file"}
                </a>
              )}
                    </div>
                )}

                {/* INTERACT BUTTONS NOT SECURITY */}
                {/* THE INTERACT BUTTONS ON POST LOCATED HERE  */}
                  {/* THE INTERACT BUTTONS ON POST LOCATED HERE  */}
                    {/* THE INTERACT BUTTONS ON POST LOCATED HERE  */}
                      {/* THE INTERACT BUTTONS ON POST LOCATED HERE  */}
       
        <div
            style={{
            //   position: "absolute",
              top: "10px",
              right: "10px",
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              margin: "5px",
              padding: "20px",
            }}
          >
        
         
            <button
              onClick={() => handleLike(post.id)}
              style={{
                backgroundColor: likedPosts.includes(post.id) ? "#2e7d32" : "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "3% 10%",
                      margin: "0px 1%",
                cursor: "pointer",
                fontSize: "12px",
              }}
              aria-pressed={likedPosts.includes(post.id)}
              aria-label="Like post"
            >
              Like
            </button>  
            <button
              onClick={() => handleDislike(post.id)}
              style={{
                backgroundColor: dislikedPosts.includes(post.id) ? "#b71c1c" : "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "3% 10%",
                     margin: "0px 1%",
                cursor: "pointer",
                fontSize: "12px",
              }}
              aria-pressed={dislikedPosts.includes(post.id)}
              aria-label="Dislike post"
            >
              Dislike
            </button> 
            <button
              onClick={() => handleCommentClick(post.id)}
              style={{
                backgroundColor: "#2196f3",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                 padding: "3% 10%",
                 margin: "0px 1%",
                cursor: "pointer",
                fontSize: "12px",
              }}
              aria-pressed={visibleCommentsPostId === post.id}
              aria-label="Comment on post"
            >
              Comment
            </button> 

                <button
                    onClick={() => handleShare(post.id)}
                    style={{
                    backgroundColor: "#9c27b0",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "end",
                    border: "none",
                    borderRadius: "4px",
                       padding: "3% 13%",
                     margin: "0px 1%",
                    cursor: "pointer",
                    fontSize: "12px",
               }}
              aria-label="Share post"
            >
              Share
             </button> 

             {/* DELETE BUTTON FOR ADMIN AND USERS  */}
    {(currentUser === "SecurityGuy" || post.username === currentUser) && (
              <button
                onClick={() => handleDeletePost(post.id)}
                style={{
                  backgroundColor: "#e53935",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
                aria-label="Delete post"
              >
                Delete
              </button>
            )}





                </div>

                {/* Post Reaction Span Count  */}
          
 <div
  style={{
    marginTop: "12px",
    fontSize: "14px",
    color: "#555",
    display: "flex",
    justifyContent: "center", // centers the spans horizontally
    gap: "15px",
    position: "absolute",     // position at the bottom inside the parent
    bottom: "10px",
    left: 0,
    right: 0,
  }}>

  {/* THESE ARE THE COUNTERS FOR THE LIKES ON THE POTS  */}
  <span style={{margin: "1% 2%",}}>👍 {post.likes}</span>
  <span style={{margin: "1% 2%",}}>👎 {post.dislikes}</span>
  <span style={{margin: "1% 2%",}}>💬 {post.comments.length}</span>
  <span style={{margin: "1% 2%",}}>🔄 {post.shares}</span>

</div>

        {/* BELOW IS THE COMMENT SECTION WHERE YOU INTERACT WITH THE POSTS
          BELOW IS THE COMMENT SECTION WHERE YOU INTERACT WITH THE POSTS
            BELOW IS THE COMMENT SECTION WHERE YOU INTERACT WITH THE POSTS */}

            
                {visibleCommentsPostId === post.id && (

                    <div
                        style={{
                marginBottom: "5%",
                maxHeight: "150px",
                overflowY: "auto",
                backgroundColor: "#f9f9f9",
                borderRadius: "5%",
                padding: "2%",
                width: "85%",
                fontSize: "13px",
                color: "#333",
                overflowWrap: "break-word",
                        }}>

                        {post.comments.length === 0 && (
                        <div style={{ fontStyle: "italic", color: "#777" }}>No comments yet.</div>
                        )}

                        {post.comments.map((comment) => {
                        const liked = comment.likedBy?.includes(currentUser);
                        const disliked = comment.dislikedBy?.includes(currentUser);

                        return (
                        <div
                        key={comment.id}
                    style={{
                      marginBottom: "8px",
                      borderBottom: "1px solid #ddd",
                      paddingBottom: "4px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                        }}>

                        <div>
                      <strong>{comment.username}:</strong> {comment.content}
                        </div>

                        <div style={{ display: "flex", gap: "6px" }}>



                          {/* COMMENT LIKE BUTTON  */}
                           <button onClick={() => handleCommentLike(post.id, comment.id)}
                        style={{
                          backgroundColor: liked ? "#2e7d32" : "#4caf50",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                          padding: "2px 6px",
                          cursor: "pointer",
                          fontSize: "11px",
                        }} aria-pressed={liked} aria-label="Like comment">

                        👍 {comment.likes || 0}
                           </button>
                          {/* COMMENT LIKE BUTTON  */}
                             <button
                        onClick={() => handleCommentDislike(post.id, comment.id)}
                        style={{
                          backgroundColor: disliked ? "#b71c1c" : "#f44336",
                          color: "#fff",
                          border: "none",
                          borderRadius: "4px",
                           padding: "4px 20%",
                          cursor: "pointer",
                          fontSize: "11px",
                        }}
                        aria-pressed={disliked}
                        aria-label="Dislike comment"
                      >
                        👎 {comment.dislikes || 0}
                              </button>

                        </div>

                        </div>
                        );
                        })}
                    </div>

                )}

            </article>))}

        </section>

    );

}
