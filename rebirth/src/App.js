import React, { useState, useEffect, useRef } from 'react';
import Articles from "./Components/Articles";

function App() {

  // Initial default users
  const defaultUsers = {
    OperaGuy: 'Aaah!',
    SecurityGuy: 'TheSuperSecurePassword',
  };

  // State for users (username: password)
  const [users, setUsers] = useState(defaultUsers);

  // Authentication & UI states
  const [isLoggedIn,  setIsLoggedIn]  = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // Login form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError,    setLoginError]    = useState('');

  // Signup form states
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);

  // Toggle state for "Post to all"
  const [toggle, setToggle] = useState(false);

  // Post input state
  const [postText, setPostText] = useState('');

  // Media file state for the post being written
  const [postMedia, setPostMedia] = useState(null);

  // Posts state: initial posts from John and Jane with counters and comments
  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'John Doe',
      content: 'Had a great day at the beach!',
      likes: 0,
      dislikes: 0,
      comments: [],
      shares: 0,
      media: null,
    },
    {
      id: 2,
      username: 'Jane Smith',
      content: 'Just finished reading a fantastic book.',
      likes: 0,
      dislikes: 0,
      comments: [],
      shares: 0,
      media: null,
    },
  ]);

  // Track posts liked and disliked by current user (store post ids)
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);

  // Track posts shared by current user (store post ids)
  const [sharedPosts, setSharedPosts] = useState([]);

  // State to track which post's comments are visible
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);

  // Refs for detecting clicks outside comments and textarea
  const commentsRef = useRef(null);
  const textareaRef = useRef(null);
  const newsfeedRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handlers
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostMedia(file);
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Add or post new post or comment
  const handlePost = () => {
    if (postText.trim() === '' && !postMedia) return;

    if (visibleCommentsPostId !== null) {
      // Add comment to the post with like/dislike counters
      const newComment = {
        id: Date.now(),
        username: currentUser,
        content: postText.trim(),
        likes: 0,
        dislikes: 0,
        likedBy: [],
        dislikedBy: [],
      };
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === visibleCommentsPostId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setPostText('');
      setPostMedia(null);
      setVisibleCommentsPostId(null);
    } else {
      // Add new post with media if any
      const newPost = {
        id: Date.now(),
        username: currentUser,
        content: postText.trim(),
        likes: 0,
        dislikes: 0,
        comments: [],
        shares: 0,
        media: postMedia ? URL.createObjectURL(postMedia) : null,
        mediaName: postMedia ? postMedia.name : null,
      };
      setPosts([newPost, ...posts]);
      setPostText('');
      setPostMedia(null);
    }
  };


    // ALL BUTTON INTERACTS ON POST functionality - <Buttons> <- in Articles.js 
  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
    if (visibleCommentsPostId === postId) {
      setVisibleCommentsPostId(null);
    }
    // Also remove from liked/disliked/shared if present
    setLikedPosts((prev) => prev.filter((id) => id !== postId));
    setDislikedPosts((prev) => prev.filter((id) => id !== postId));
    setSharedPosts((prev) => prev.filter((id) => id !== postId));
  };

  const handleDeleteAllPosts = () => {
    setPosts([]);
    setVisibleCommentsPostId(null);
    setLikedPosts([]);
    setDislikedPosts([]);
    setSharedPosts([]);
  };

  // Like toggle handler for posts
  const handleLike = (postId) => {
    if (likedPosts.includes(postId)) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes - 1 } : post
        )
      );
      setLikedPosts((prev) => prev.filter((id) => id !== postId));
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
      setLikedPosts((prev) => [...prev, postId]);
      if (dislikedPosts.includes(postId)) {
        setDislikedPosts((prev) => prev.filter((id) => id !== postId));
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, dislikes: post.dislikes - 1 } : post
          )
        );
      }
    }
  };

  // Dislike toggle handler for posts
  const handleDislike = (postId) => {
    if (dislikedPosts.includes(postId)) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, dislikes: post.dislikes - 1 } : post
        )
      );
      setDislikedPosts((prev) => prev.filter((id) => id !== postId));
    } else {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post
        )
      );
      setDislikedPosts((prev) => [...prev, postId]);
      if (likedPosts.includes(postId)) {
        setLikedPosts((prev) => prev.filter((id) => id !== postId));
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes - 1 } : post
          )
        );
      }
    }
  };

  // Share handler (normal button)
  const handleShare = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
    alert('Shared post! (Functionality placeholder)');
  };

  // Comment button toggles comment box visibility
  const handleCommentClick = (postId) => {
    if (visibleCommentsPostId === postId) {
      setVisibleCommentsPostId(null);
      setPostText('');
      setPostMedia(null);
    } else {
      setVisibleCommentsPostId(postId);
      setPostText('');
      setPostMedia(null);
      setTimeout(() => {
        if (textareaRef.current) textareaRef.current.focus();
      }, 0);
    }
  };

  // Like toggle for comments
  const handleCommentLike = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const liked = comment.likedBy?.includes(currentUser);
            const disliked = comment.dislikedBy?.includes(currentUser);
            let newLikedBy = comment.likedBy || [];
            let newDislikedBy = comment.dislikedBy || [];
            let likes = comment.likes || 0;
            let dislikes = comment.dislikes || 0;

            if (liked) {
              // Remove like
              newLikedBy = newLikedBy.filter((u) => u !== currentUser);
              likes--;
            } else {
              // Add like
              newLikedBy = [...newLikedBy, currentUser];
              likes++;
              // Remove dislike if present
              if (disliked) {
                newDislikedBy = newDislikedBy.filter((u) => u !== currentUser);
                dislikes--;
              }
            }
            return {
              ...comment,
              likes,
              dislikes,
              likedBy: newLikedBy,
              dislikedBy: newDislikedBy,
            };
          }),
        };
      })
    );
  };

  // Dislike toggle for comments
  const handleCommentDislike = (postId, commentId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map((comment) => {
            if (comment.id !== commentId) return comment;
            const liked = comment.likedBy?.includes(currentUser);
            const disliked = comment.dislikedBy?.includes(currentUser);
            let newLikedBy = comment.likedBy || [];
            let newDislikedBy = comment.dislikedBy || [];
            let likes = comment.likes || 0;
            let dislikes = comment.dislikes || 0;

            if (disliked) {
              // Remove dislike
              newDislikedBy = newDislikedBy.filter((u) => u !== currentUser);
              dislikes--;
            } else {
              // Add dislike
              newDislikedBy = [...newDislikedBy, currentUser];
              dislikes++;
              // Remove like if present
              if (liked) {
                newLikedBy = newLikedBy.filter((u) => u !== currentUser);
                likes--;
              }
            }
            return {
              ...comment,
              likes,
              dislikes,
              likedBy: newLikedBy,
              dislikedBy: newDislikedBy,
            };
          }),
        };
      })
    );
  };
// ALL BUTTON INTERACTS ON POST 

  // Close comments if clicking outside newsfeed area (not just comments or textarea)
  // Need to edit - Comment botton still closes comments section. 
  // After posting comment keep comments open. Add Close comments button. 

  useEffect(() => {

    function handleClickOutside(event) {
      if (
        newsfeedRef.current &&
        !newsfeedRef.current.contains(event.target) &&
        visibleCommentsPostId !== null
       ) {
          setVisibleCommentsPostId(null);
          setPostText('');
          setPostMedia(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
   }, [visibleCommentsPostId]

  );


  // LOGIN AND SIGN UP FORMS ARE FOR LOGIN AND SIGNUP SCREEN
  // Login submit handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (users[loginUsername] && users[loginUsername] === loginPassword) {
      setIsLoggedIn(true);
      setCurrentUser(loginUsername);
      setLoginError('');
      setLoginUsername('');
      setLoginPassword('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  // Signup submit handler
  const handleSignup = (e) => {
    e.preventDefault();
    if (users[signupUsername]) {
      setSignupError('Username already taken');
      setUsernameTaken(true);
    } else {
      setUsers((prev) => ({ ...prev, [signupUsername]: signupPassword }));
      setIsLoggedIn(true);
      setCurrentUser(signupUsername);
      setSignupError('');
      setUsernameTaken(false);
      setSignupUsername('');
      setSignupPassword('');
      setIsSigningUp(false);
    }
  };

  // Logout handler - PASSWORDS USER Ect 
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setLoginUsername('');
    setLoginPassword('');
    setSignupUsername('');
    setSignupPassword('');
    setLoginError('');
    setSignupError('');
    setUsernameTaken(false);
    setIsSigningUp(false);
    setLikedPosts([]);
    setDislikedPosts([]);
    setSharedPosts([]);
  };
   
  // Login form JSX (unchanged)
  const loginForm = (
    <form
      onSubmit={handleLogin}
      style={{
        backgroundColor: '#aa88c0',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Login</h2>

      <input
        type="text"
        placeholder="Username"
        value={loginUsername}
        onChange={(e) => setLoginUsername(e.target.value)}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      {loginError && (
        <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
          {loginError}
        </div>
      )}

      <button
        type="submit"
        style={{
          padding: '10px',
          backgroundColor: '#1877f2',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Log In
      </button>

      <button
        type="button"
        onClick={() => {
          setIsSigningUp(true);
          setLoginError('');
          setLoginUsername('');
          setLoginPassword('');
        }}
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Sign Up
      </button>
    </form>
  );

  // Signup form JSX (unchanged)
  const signupForm = (
    <form
      onSubmit={handleSignup}
      style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Sign Up</h2>

      <input
        type="text"
        placeholder="Username"
        value={signupUsername}
        onChange={(e) => {
          setSignupUsername(e.target.value);
          if (users[e.target.value]) {
            setUsernameTaken(true);
            setSignupError('Username already taken');
          } else {
            setUsernameTaken(false);
            setSignupError('');
          }
        }}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: usernameTaken ? '2px solid red' : '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
        required
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          boxSizing: 'border-box',
        }}
      />

      {signupError && (
        <div style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>
          {signupError}
        </div>
      )}

      <button
        type="submit"
        disabled={usernameTaken}
        style={{
          padding: '10px',
          backgroundColor: usernameTaken ? '#999' : '#4caf50',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: usernameTaken ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Create Account
      </button>

      <button
        type="button"
        onClick={() => {
          setIsSigningUp(false);
          setSignupError('');
          setSignupUsername('');
          setSignupPassword('');
          setUsernameTaken(false);
        }}
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#1877f2',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        Back to Login
      </button>
    </form>
  );


  // POST WIDGET - BOTTOM OF SCREEN POST WIDGET - BOTTOM OF SCREEN POST WIDGET 
   // POST WIDGET - BOTTOM OF SCREEN POST WIDGET - BOTTOM OF SCREEN POST WIDGET 
    // POST WIDGET - BOTTOM OF SCREEN POST WIDGET - BOTTOM OF SCREEN POST WIDGET 
     // POST WIDGET - BOTTOM OF SCREEN POST WIDGET - BOTTOM OF SCREEN POST WIDGET 
  const postWidget = (
    <section
      style={{
        position: 'fixed',
        bottom: '30px',
        left: 0,
        width: '100%',
        backgroundColor: '#7da59c',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        padding: '15px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
      }}>

      {/* Text Input Field  */}
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
       >
        <textarea
          ref={textareaRef}
          placeholder={
            visibleCommentsPostId !== null
              ? 'Write a comment...'
              : "Post To The World!"
          }
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          style={{
            width: '100%',
            height: '60px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div style={{display: 'flex', alignItems: 'center', gap: '10px',}}> 
       
          {/* TOGGLE FOR THE NAV BAR USELESS AT THE MOMENT  */}
          <button
            onClick={handleToggle}
            style={{
              width: '40px',
              height: '24px',
              borderRadius: '12px',
              border: '1px solid #ccc',
              backgroundColor: toggle ? '#1877f2' : '#4e4848',
              cursor: 'pointer',
              position: 'relative',
              outline: 'none',
              transition: 'background-color 0.3s',
            }}
            aria-pressed={toggle}
            aria-label="Toggle Post to all"
          >
            <span
              style={{
                position: 'absolute',
                top: '2px',
                left: toggle ? '18px' : '2px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.3s',
              }}
            />
          </button>
          <span style={{ fontSize: '16px', userSelect: 'none' }}>Post to all</span>

          {/* Upload Button */}
          <button
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={{
              padding: '6px 12px',
              backgroundColor: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
            aria-label="Upload media"
          >
            Add Media
          </button>

          {/* Hidden file input */}
          <input type="file" ref={fileInputRef} style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPostMedia(file);
              }
            }}
            accept="*/*"
          />

          {currentUser === 'SecurityGuy' && (
            <button
              onClick={handleDeleteAllPosts}
              style={{
                marginLeft: 'auto',
                padding: '6px 12px',
                backgroundColor: '#e53935',
                display: 'flex-end',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
              aria-label="Delete All Posts"
            >
              Delete All Posts
            </button>)}
        </div>

        {/* Show selected media file name if any */}
        {postMedia && (
          <div
            style={{
              fontSize: '14px',
              color: '#555',
              padding: '6px 10px',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              maxWidth: '600px',
              overflowWrap: 'break-word',
            }}
          >
            Selected file: {postMedia.name}
          </div>
        )}

        <button
          onClick={handlePost}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1877f2',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold',
          }}
        >
          {visibleCommentsPostId !== null ? 'Comment' : 'Post'}
        </button>
      </div>

    </section>
  );

  
  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
    paddingBottom: '180px',
    overflowY: 'auto',
  };

  // MAIN APP WITH ARTICLES IMPORTED FROM ARTICLES.JS 
  const mainApp = (
    <div
      className="app-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#254042',
        paddingBottom: '60px',
      }}
      ref={newsfeedRef}
    >
      <main style={mainContentStyle}>
        

        <Articles
          posts={posts}
          commentsRef={commentsRef}
          currentUser={currentUser}
          handleDeletePost={handleDeletePost}
          handleLike={handleLike}
          handleDislike={handleDislike}
          handleCommentClick={handleCommentClick}
          handleShare={handleShare}
          likedPosts={likedPosts}
          dislikedPosts={dislikedPosts}
          visibleCommentsPostId={visibleCommentsPostId}
          handleCommentLike={handleCommentLike}
          handleCommentDislike={handleCommentDislike}
          />

      </main>

      {postWidget}

      {/* Navigation Bar At Bootom of App Screen  */}
      {/* Navigation Bar At Bootom of App Screen  */}
      {/* Navigation Bar At Bootom of App Screen  */}
      {/* Navigation Bar At Bootom of App Screen  */}
      {/* Navigation Bar At Bootom of App Screen  */}
      {/* Navigation Bar At Bootom of App Screen  */}
      {/* Navigation Bar At Bootom of App Screen  */}
      {/* Navigation Bar At Bootom of App Screen  */}


      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#687e7c',
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5px 5px',
          boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
          zIndex: 1000,
          gap: '5px',
          fontFamily: 'Arial, sans-serif',
        }}
      > 
          {/* //BUTTONS INSIDE NAV */}
        <div style={{ fontWeight: 'bold', color: '#fafdfd', marginTrim: 'auto' }}>
          {currentUser}
        </div>

        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <li style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1877f2' }}>
            Home
          </li>
          <li style={{ cursor: 'pointer' }}>Profile</li>
          <li style={{ cursor: 'pointer' }}>Friends</li>
          <li style={{ cursor: 'pointer' }}>Messages</li>
          <li style={{ cursor: 'pointer' }}>Settings</li>
          <li>
            {/* LOG OUT BUTTON  */}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: '#e53935',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
              }}
              aria-label="Log Out"
            >
              Log Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );

  // Render login or signup form or main app
  if (!isLoggedIn) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#1f2227',
          padding: '20px',
        }}
      >
        {isSigningUp ? signupForm : loginForm}
      </div>
    );
  }

  return mainApp;
}

export default App;
