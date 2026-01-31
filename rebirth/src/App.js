import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articles  from "./Components/Articles";
import Messages  from "./Components/Messages";
import Friends  from "./Components/Friends";
import Settings  from "./Components/Settings";
import Profile from "./Components/Profile";
import Nav from './Components/Nav';
import PostWidget from './Components/PostWidget';
import Access from './Components/Access';

function App() {

  const defaultUsers = {OperaGuy: 'Aaah!', SecurityGuy: 'TheSuperSecurePassword',};
  const [users, setUsers] = useState(defaultUsers); // State for users (username: password)
  const [isLoggedIn,  setIsLoggedIn]  = useState(false); 
  const [isSigningUp, setIsSigningUp] = useState(false);  // Authentication & UI states
  const [currentUser, setCurrentUser] = useState('');
  const [loginUsername, setLoginUsername] = useState('');  // Login form states
  const [loginPassword, setLoginPassword] = useState('');  // Login form states
  const [loginError,    setLoginError]    = useState('');  // Login form states
  const [signupUsername, setSignupUsername] = useState('');   // Signup form states
  const [signupPassword, setSignupPassword] = useState('');   // Signup form states
  const [signupError, setSignupError] = useState('');
  const [usernameTaken, setUsernameTaken] = useState(false);
  const [toggle, setToggle] = useState(false);  // Toggle state for "Post to all"
  const [postText, setPostText] = useState('');  // Post input state
  const [postMedia, setPostMedia] = useState(null);// Media file state for the post being written
  const [likedPosts, setLikedPosts] = useState([]); // Track Likes by current user (store post id)
  const [dislikedPosts, setDislikedPosts] = useState([]); // Track Dislikes
  const [sharedPosts, setSharedPosts] = useState([]);
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null); // State of Visible Comments Box
  const commentsRef = useRef(null);
  const textareaRef = useRef(null);  // Refs for detecting clicks outside comments and textarea
  const newsfeedRef = useRef(null);
  const fileInputRef = useRef(null);
  const handleToggle = () => {setToggle(!toggle);};  // Handlers for toggle
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostMedia(file);
    }
  };
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };  // Trigger file input click
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
  };  // Add or post new post or comment
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
  }; /// Delete Post
  const handleDeleteAllPosts = () => {
    setPosts([]);
    setVisibleCommentsPostId(null);
    setLikedPosts([]);
    setDislikedPosts([]);
    setSharedPosts([]);
  }; // Delete All Posts
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
  };// Like toggle handler for posts
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
  }; // Dislike toggle handler for posts
  const handleShare = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
    alert('Shared post! (Functionality placeholder)');
  };  // Share handler (normal button)
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
  }; // Comment button toggles comment box visibility
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
  };  // Like toggle for comments
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
  };// Dislike toggle for comments
  // ALL BUTTON INTERACTS ON POST functionality - <Buttons> <- in Articles.js  - ABOVE ^^^
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
  };// NAV.js!!! - Handle logout NAV BAR NOOTTT ACCESS.JS 
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
      <Routes>
        <Route path="/profile" element={<Profile posts={posts}currentUser={currentUser}handleDeletePost={handleDeletePost}handleLike={handleLike}handleDislike={handleDislike}handleCommentClick={handleCommentClick}handleShare={handleShare}likedPosts={likedPosts}dislikedPosts={dislikedPosts}visibleCommentsPostId={visibleCommentsPostId}handleCommentLike={handleCommentLike}handleCommentDislike={handleCommentDislike}/>}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/messages" element={<Messages />}/>
        <Route path="/friends" element={<Friends />} />
        <Route path="/" element={<Articles posts={posts}commentsRef={commentsRef}currentUser={currentUser}handleDeletePost={handleDeletePost}handleLike={handleLike}handleDislike={handleDislike}handleCommentClick={handleCommentClick}handleShare={handleShare}likedPosts={likedPosts}dislikedPosts={dislikedPosts}visibleCommentsPostId={visibleCommentsPostId}handleCommentLike={handleCommentLike}handleCommentDislike={handleCommentDislike}/>}/>
      </Routes>
    </main>

    <PostWidget visibleCommentsPostId={visibleCommentsPostId}postText={postText}setPostText={setPostText}toggle={toggle}setToggle={setToggle}fileInputRef={fileInputRef}postMedia={postMedia}setPostMedia={setPostMedia}currentUser={currentUser}handleDeleteAllPosts={handleDeleteAllPosts}handlePost={handlePost}/>
    <Nav currentUser={currentUser} handleLogout={handleLogout}/>
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
      {
        <Access
          users={users}
          setUsers={setUsers}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          likedPosts={likedPosts}
          setLikedPosts={setLikedPosts}
          dislikedPosts={dislikedPosts}
          setDislikedPosts={setDislikedPosts}
          sharedPosts={sharedPosts}
          setSharedPosts={setSharedPosts}
        />
      }
    </div>
  );
}

return mainApp;
}
export default App;
