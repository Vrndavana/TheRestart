import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Articles from "./Components/Articles";
import Messages from "./Components/Messages";
import Friends from "./Components/Friends";
import Settings from "./Components/Settings";
import Profile from "./Components/Profile";
import Nav from './Components/Nav';
import PostWidget from './Components/PostWidget';
import Access from './Components/Access';

import { useTheme } from './ThemeContext';

function App() {
  const { theme } = useTheme();

  // ----------- USERS & AUTH ----------
  const defaultUsers = { OperaGuy: 'Aaah!', SecurityGuy: 'TheSuperSecurePassword' };
  const [users, setUsers] = useState(defaultUsers);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // ----------- POSTS & UI ----------
  const [postText, setPostText] = useState('');
  const [postMedia, setPostMedia] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);

  const newsfeedRef = useRef(null);
  const fileInputRef = useRef(null);
  const handleUpdatePost = (updatedPost) => {
    setPosts((prevPosts) => {
      return prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
    });
  };
  const [posts, setPosts] = useState([
    { id: 1, username: 'John Doe', content: 'Had a great day at the beach!', likes: 0, dislikes: 0, comments: [], shares: 0, media: [] },
    { id: 2, username: 'Jane Smith', content: 'Just finished reading a fantastic book.', likes: 0, dislikes: 0, comments: [], shares: 0, media: [] },
  ]);

  // ----------- THEME COLORS ----------
  const themeColors = useMemo(() => {
    return theme === 'light'
      ? {
          bg: '#f5f5f5',
          containerBg: '#fff',
          text: '#222',
          secondaryText: '#555',
          itemBg: '#eee',
          activeButton: '#4a90e2',
          inactiveButton: '#ccc',
          inputBg: '#fff',
          inputBorder: '#aaa',
          buttonBg: '#4a90e2',
          buttonText: '#fff',
          sentMsg: '#4a90e2',
          recvMsg: '#eee',
          sentText: '#fff',
          recvText: '#222',
          navBg: '#fff',
          border: '#ccc',
          dislike: '#e53935',
        }
      : {
          bg: '#222',
          containerBg: '#333',
          text: '#f5f5f5',
          secondaryText: '#ccc',
          itemBg: '#444',
          activeButton: '#6ee7b7',
          inactiveButton: '#555',
          inputBg: '#555',
          inputBorder: '#888',
          buttonBg: '#6ee7b7',
          buttonText: '#222',
          sentMsg: '#6ee7b7',
          recvMsg: '#555',
          sentText: '#222',
          recvText: '#f5f5f5',
          navBg: '#333',
          border: '#555',
          dislike: '#e53935',
        };
  }, [theme]);

  // ----------- POST INTERACTIONS ----------
  const handleToggle = () => setToggle(!toggle);
  const handleUploadClick = () => fileInputRef.current && fileInputRef.current.click();

  const handlePost = () => {
    if (!postText.trim() && (!postMedia || postMedia.length === 0)) return;

    const mediaURLs = postMedia ? postMedia.map(file => ({ url: URL.createObjectURL(file), name: file.name })) : [];

    if (visibleCommentsPostId !== null) {
      const newComment = { id: Date.now(), username: currentUser, content: postText.trim(), likes: 0, dislikes: 0, likedBy: [], dislikedBy: [] };
      setPosts(prev => prev.map(post => post.id === visibleCommentsPostId ? { ...post, comments: [...post.comments, newComment] } : post));
    } else {
      const newPost = { id: Date.now(), username: currentUser, content: postText.trim(), likes: 0, dislikes: 0, comments: [], shares: 0, media: mediaURLs };
      setPosts(prev => [newPost, ...prev]);
    }

    setPostText('');
    setPostMedia([]);
  };

  const handleLike = postId => {
    if (likedPosts.includes(postId)) {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
      setLikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
      setLikedPosts(prev => [...prev, postId]);
      if (dislikedPosts.includes(postId)) {
        setDislikedPosts(prev => prev.filter(id => id !== postId));
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, dislikes: p.dislikes - 1 } : p));
      }
    }
  };

  const handleDislike = postId => {
    if (dislikedPosts.includes(postId)) {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, dislikes: p.dislikes - 1 } : p));
      setDislikedPosts(prev => prev.filter(id => id !== postId));
    } else {
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, dislikes: p.dislikes + 1 } : p));
      setDislikedPosts(prev => [...prev, postId]);
      if (likedPosts.includes(postId)) {
        setLikedPosts(prev => prev.filter(id => id !== postId));
        setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
      }
    }
  };

  const handleShare = postId => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, shares: p.shares + 1 } : p));
    alert('Shared post!');
  };

  const handleCommentClick = postId => { if (visibleCommentsPostId !== postId) setVisibleCommentsPostId(postId); };

  const handleDeletePost = postId => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    setLikedPosts(prev => prev.filter(id => id !== postId));
    setDislikedPosts(prev => prev.filter(id => id !== postId));
    setSharedPosts(prev => prev.filter(id => id !== postId));
    if (visibleCommentsPostId === postId) setVisibleCommentsPostId(null);
  };

  const handleDeleteAllPosts = () => { setPosts([]); setVisibleCommentsPostId(null); setLikedPosts([]); setDislikedPosts([]); setSharedPosts([]); };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    setPostText('');
    setPostMedia([]);
    setLikedPosts([]);
    setDislikedPosts([]);
    setSharedPosts([]);
    setVisibleCommentsPostId(null);
  };

  // ---------- COMMENT LIKE/DISLIKE ----------
  const handleCommentLike = (postId, commentId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== commentId) return comment;

            const liked = comment.likedBy.includes(currentUser);
            const disliked = comment.dislikedBy.includes(currentUser);

            return {
              ...comment,
              likedBy: liked
                ? comment.likedBy.filter(u => u !== currentUser)
                : [...comment.likedBy, currentUser],
              dislikedBy: disliked
                ? comment.dislikedBy.filter(u => u !== currentUser)
                : comment.dislikedBy,
              likes: liked ? comment.likes - 1 : comment.likes + 1,
              dislikes: disliked ? comment.dislikes - 1 : comment.dislikes,
            };
          }),
        };
      })
    );
  };

  const handleCommentDislike = (postId, commentId) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== commentId) return comment;

            const disliked = comment.dislikedBy.includes(currentUser);
            const liked = comment.likedBy.includes(currentUser);

            return {
              ...comment,
              dislikedBy: disliked
                ? comment.dislikedBy.filter(u => u !== currentUser)
                : [...comment.dislikedBy, currentUser],
              likedBy: liked
                ? comment.likedBy.filter(u => u !== currentUser)
                : comment.likedBy,
              dislikes: disliked ? comment.dislikes - 1 : comment.dislikes + 1,
              likes: liked ? comment.likes - 1 : comment.likes,
            };
          })
        };
      })
    );
  };

  // ---------- PROFILE ROUTING ----------
  const ProfileWrapper = ({ posts }) => {
    const { username } = useParams();  // Extracting the username from the URL
    return (
      <Profile
        posts={posts}
        profileOwner={username} // Passing the profileOwner as username
        userStats={{
          platforms: ['Web', 'Mobile'],
          friendsCount: 5,
          groups: ['React Devs', 'Gamers']
        }}
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
    );
  };

  // ---------- MAIN APP ----------
  const mainContentStyle = { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '20px', width: '100%' };

  const mainApp = (
    <div
      className="app-container"
      style={{ background: 'grey', display: 'flex', flexDirection: 'column', maxHeight: '98vh', minHeight: '90vh', fontFamily: 'Arial, sans-serif', backgroundColor: themeColors.bg, width: '98vw' }}
      ref={newsfeedRef}
    >
      <main style={{...mainContentStyle, background: '#444', margin: '-1%', marginBottom: '-10%' }}>
        <Routes>
          <Route path="/messages/:userId" element={<Messages />} />
          <Route
            path="/"
            element={
              <Articles
                posts={posts}
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
                colors={themeColors}
              />
            }
          />
          <Route path="/profile/:username" element={<ProfileWrapper posts={posts} />} />
          <Route path="/settings" element={<Settings handleLogout={handleLogout} currentUser={currentUser} />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </main>

      <PostWidget
        visibleCommentsPostId={visibleCommentsPostId}
        setVisibleCommentsPostId={setVisibleCommentsPostId}
        postText={postText}
        setPostText={setPostText}
        toggle={toggle}
        setToggle={setToggle}
        fileInputRef={fileInputRef}
        postMedia={postMedia}
        setPostMedia={setPostMedia}
        currentUser={currentUser}
        handleDeleteAllPosts={handleDeleteAllPosts}
        handlePost={handlePost}
        colors={themeColors}
      />

      <Nav currentUser={currentUser} handleLogout={handleLogout} colors={themeColors} />
    </div>
  );

  // ---------- LOGIN SCREEN ----------
  if (!isLoggedIn) {
    return (
      <div style={{ height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: themeColors.bg, width: '98vw' }}>
        <Access users={users} setUsers={setUsers} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
    );
  }

  return mainApp;
}

export default App;
