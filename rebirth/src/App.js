import React, { useState } from 'react';

function App() {
  // Initial default users
  const defaultUsers = {
    OperaGuy: 'Aaah!',
    SecurityGuy: 'TheSuperSecurePassword',
  };

  // State for users (username: password)
  const [users, setUsers] = useState(defaultUsers);

  // Authentication & UI states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // Login form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Signup form states
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);

  // Toggle state for "Post to all"
  const [toggle, setToggle] = useState(false);

  // Post input state
  const [postText, setPostText] = useState('');

  // Posts state: initial posts from John and Jane
  const [posts, setPosts] = useState([
    { id: 1, username: 'John Doe', content: 'Had a great day at the beach!' },
    { id: 2, username: 'Jane Smith', content: 'Just finished reading a fantastic book.' },
  ]);

  // Handlers
  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handlePost = () => {
    if (postText.trim() === '') return; // ignore empty posts

    const newPost = {
      id: Date.now(),
      username: currentUser,
      content: postText.trim(),
    };

    setPosts([newPost, ...posts]); // add new post at the top
    setPostText(''); // clear textarea
  };

  // Delete post handler - only SecurityGuy can delete any post, others only their own
  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  // Delete all posts handler - only SecurityGuy can see and use this
  const handleDeleteAllPosts = () => {
    setPosts([]);
  };

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

  // Logout handler
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
  };

  // Login form JSX
  const loginForm = (
    <form
      onSubmit={handleLogin}
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

  // Fixed Post Widget at bottom
  const postWidget = (
    <section
      style={{
        position: 'fixed',
        bottom: '50px', // height of bottom nav bar + some spacing
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
        padding: '15px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1100,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <textarea
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <button
            onClick={handleToggle}
            style={{
              width: '40px',
              height: '24px',
              borderRadius: '12px',
              border: '1px solid #ccc',
              backgroundColor: toggle ? '#1877f2' : '#fff',
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

          {/* Show Delete All button only for SecurityGuy */}
          {currentUser === 'SecurityGuy' && (
            <button
              onClick={handleDeleteAllPosts}
              style={{
                marginLeft: 'auto',
                padding: '6px 12px',
                backgroundColor: '#e53935',
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
            </button>
          )}
        </div>

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
          Post
        </button>
      </div>
    </section>
  );

  // Adjust main content style to add padding bottom so content is not hidden behind fixed post widget and nav bar
  const mainContentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
    paddingBottom: '180px', // enough space for post widget + nav bar
    overflowY: 'auto',
  };

  // Logged in main app UI
  const mainApp = (
    <div
      className="app-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f2f5',
        paddingBottom: '60px', // space for bottom nav (still needed)
      }}
    >
      <main style={mainContentStyle}>
        {/* Posts from others and user posts */}
        <section
          style={{
            width: '100%',
            maxWidth: '600px',
            marginBottom: '20px',
          }}
        >
          {posts.map((post) => (
            <article
              key={post.id}
              style={{
                marginBottom: '20px',
                backgroundColor: '#fff',
                padding: '15px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative',
              }}
            >
              <h3>{post.username}</h3>
              <p>{post.content}</p>
              {/* Show delete button only for SecurityGuy or post owner */}
              {(currentUser === 'SecurityGuy' || post.username === currentUser) && (
                <button
                  onClick={() => handleDeletePost(post.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#e53935',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                  aria-label="Delete post"
                >
                  Delete
                </button>
              )}
            </article>
          ))}
        </section>
      </main>

      {/* Fixed Post Widget */}
      {postWidget}

      {/* Bottom Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          backgroundColor: '#fff',
          borderTop: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px 20px',
          boxShadow: '0 -1px 5px rgba(0,0,0,0.1)',
          zIndex: 1000,
          gap: '20px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {/* Username on left */}
        <div style={{ fontWeight: 'bold', color: '#1877f2', marginRight: 'auto' }}>
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
          <li style={{ cursor: 'pointer', fontWeight: 'bold', color: '#1877f2' }}>Home</li>
          <li style={{ cursor: 'pointer' }}>Profile</li>
          <li style={{ cursor: 'pointer' }}>Friends</li>
          <li style={{ cursor: 'pointer' }}>Messages</li>
          <li style={{ cursor: 'pointer' }}>Settings</li>
          <li>
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
          backgroundColor: '#f0f2f5',
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
