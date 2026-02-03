import React, { useState } from 'react';



const Access = ({
  users,
  setUsers,
  isLoggedIn,
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  likedPosts,
  setLikedPosts,
  dislikedPosts,
  setDislikedPosts,
  sharedPosts,
  setSharedPosts,

}) => {
  // Login form states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  // Signup form states
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  // Toggle between login and signup forms
  const [isSigningUp, setIsSigningUp] = useState(false);

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

  // Render login or signup form or logout button based on state
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
      {!isLoggedIn ? (
        isSigningUp ? (
          signupForm
        ) : (
          loginForm
        )
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h2>Welcome, {currentUser}!</h2>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e53935',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Access;
