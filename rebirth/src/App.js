import React, { useState, useEffect, useRef } from 'react';
import Articles from "./Components/Articles";
import Profile from "./Components/Profile";
import Nav from './Components/Nav';
import PostWidget from './Components/PostWidget';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const defaultUsers = {OperaGuy: 'Aaah!', SecurityGuy: 'TheSuperSecurePassword',};
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

  // ALL BUTTON INTERACTS ON POST functionality - <Buttons> <- in Articles.js  --- BELOW VVV
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
  // ALL BUTTON INTERACTS ON POST functionality - <Buttons> <- in Articles.js  - ABOVE ^^^

  // Handle login submit
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
  // Handle signup submit
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
  // Handle logout
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
  // Login form JSX
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
  // Signup form JSX
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
  // MAIN APP MAIN APP MAIN APP MAIN APP - Location for imports Below - MAIN APP MAIN APP MAIN APP
  const mainApp = (

    <div className="app-container" style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#254042', paddingBottom: '60px',}}ref={newsfeedRef}>

      <main style={mainContentStyle}>

          <Articles posts={posts} commentsRef={commentsRef} currentUser={currentUser}handleDeletePost={handleDeletePost}handleLike={handleLike}handleDislike={handleDislike}handleCommentClick={handleCommentClick}handleShare={handleShare}likedPosts={likedPosts}dislikedPosts={dislikedPosts}visibleCommentsPostId={visibleCommentsPostId}handleCommentLike={handleCommentLike}handleCommentDislike={handleCommentDislike}/>
          <Profile posts={posts}currentUser={currentUser}handleDeletePost={handleDeletePost}handleLike={handleLike}handleDislike={handleDislike}handleCommentClick={handleCommentClick}handleShare={handleShare}likedPosts={likedPosts}dislikedPosts={dislikedPosts}visibleCommentsPostId={visibleCommentsPostId}handleCommentLike={handleCommentLike}handleCommentDislike={handleCommentDislike}/>
     
      </main>

      <PostWidget visibleCommentsPostId={visibleCommentsPostId} postText={postText} setPostText={setPostText} toggle={toggle} setToggle={setToggle} fileInputRef={fileInputRef} postMedia={postMedia} setPostMedia={setPostMedia} currentUser={currentUser} handleDeleteAllPosts={handleDeleteAllPosts} handlePost={handlePost}/>
      <Nav currentUser={currentUser} handleLogout={handleLogout} />

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
