import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Articles from "./Components/Articles";
import Messages from "./Components/Messages";
import Friends from "./Components/Friends";
import Settings from "./Components/Settings";
import Profile from "./Components/Profile";
import Nav from './Components/Nav';
import PostWidget from './Components/PostWidget';
import Access from './Components/Access';

function App() {
  const defaultUsers = { OperaGuy: 'Aaah!', SecurityGuy: 'TheSuperSecurePassword' };
  const [users, setUsers] = useState(defaultUsers);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  // Post & UI states
  const [postText, setPostText] = useState('');
  const [postMedia, setPostMedia] = useState([]); // Array of files
  const [toggle, setToggle] = useState(false);
  const [visibleCommentsPostId, setVisibleCommentsPostId] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikedPosts] = useState([]);
  const [sharedPosts, setSharedPosts] = useState([]);

  const newsfeedRef = useRef(null);
  const fileInputRef = useRef(null);

  const [posts, setPosts] = useState([
    {
      id: 1,
      username: 'John Doe',
      content: 'Had a great day at the beach!',
      likes: 0,
      dislikes: 0,
      comments: [],
      shares: 0,
      media: [],
    },
    {
      id: 2,
      username: 'Jane Smith',
      content: 'Just finished reading a fantastic book.',
      likes: 0,
      dislikes: 0,
      comments: [],
      shares: 0,
      media: [],
    },
  ]);

  const handleToggle = () => setToggle(!toggle);

  const handleUploadClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // ----------- HANDLE POST OR COMMENT -----------
  const handlePost = () => {
    if (!postText.trim() && (!postMedia || postMedia.length === 0)) return;

    const mediaURLs = postMedia ? postMedia.map(file => ({
      url: URL.createObjectURL(file),
      name: file.name
    })) : [];

    if (visibleCommentsPostId !== null) {
      // Add comment to the post WITHOUT closing the comment section
      const newComment = {
        id: Date.now(),
        username: currentUser,
        content: postText.trim(),
        likes: 0,
        dislikes: 0,
        likedBy: [],
        dislikedBy: [],
      };

      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === visibleCommentsPostId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } else {
      // Add new post
      const newPost = {
        id: Date.now(),
        username: currentUser,
        content: postText.trim(),
        likes: 0,
        dislikes: 0,
        comments: [],
        shares: 0,
        media: mediaURLs,
      };
      setPosts(prevPosts => [newPost, ...prevPosts]);
    }

    // Reset only input fields, keep comment section open if posting a comment
    setPostText('');
    setPostMedia([]);
  };

  // ----------- POST INTERACTIONS -----------
  const handleLike = (postId) => {
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

  const handleDislike = (postId) => {
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

  const handleShare = (postId) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, shares: p.shares + 1 } : p));
    alert('Shared post!');
  };

  // ----------- COMMENTS TOGGLE -----------
  const handleCommentClick = (postId) => {
    if (visibleCommentsPostId === postId) {
      // Clicking same post closes comments
      setVisibleCommentsPostId(null);
      setPostText('');
      setPostMedia([]);
    } else {
      // Clicking new post opens comments and closes previous
      setVisibleCommentsPostId(postId);
      setPostText('');
      setPostMedia([]);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    setLikedPosts(prev => prev.filter(id => id !== postId));
    setDislikedPosts(prev => prev.filter(id => id !== postId));
    setSharedPosts(prev => prev.filter(id => id !== postId));
    if (visibleCommentsPostId === postId) setVisibleCommentsPostId(null);
  };

  const handleDeleteAllPosts = () => {
    setPosts([]);
    setVisibleCommentsPostId(null);
    setLikedPosts([]);
    setDislikedPosts([]);
    setSharedPosts([]);
  };

  // ----------- COMMENT LIKE/DISLIKE -----------
  const handleCommentLike = (postId, commentId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== commentId) return comment;
            const liked = comment.likedBy.includes(currentUser);
            const disliked = comment.dislikedBy.includes(currentUser);
            let likes = comment.likes;
            let dislikes = comment.dislikes;
            let likedBy = [...comment.likedBy];
            let dislikedBy = [...comment.dislikedBy];

            if (liked) {
              likedBy = likedBy.filter(u => u !== currentUser);
              likes--;
            } else {
              likedBy.push(currentUser);
              likes++;
              if (disliked) {
                dislikedBy = dislikedBy.filter(u => u !== currentUser);
                dislikes--;
              }
            }

            return { ...comment, likes, dislikes, likedBy, dislikedBy };
          })
        };
      })
    );
  };

  const handleCommentDislike = (postId, commentId) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: post.comments.map(comment => {
            if (comment.id !== commentId) return comment;
            const liked = comment.likedBy.includes(currentUser);
            const disliked = comment.dislikedBy.includes(currentUser);
            let likes = comment.likes;
            let dislikes = comment.dislikes;
            let likedBy = [...comment.likedBy];
            let dislikedBy = [...comment.dislikedBy];

            if (disliked) {
              dislikedBy = dislikedBy.filter(u => u !== currentUser);
              dislikes--;
            } else {
              dislikedBy.push(currentUser);
              dislikes++;
              if (liked) {
                likedBy = likedBy.filter(u => u !== currentUser);
                likes--;
              }
            }

            return { ...comment, likes, dislikes, likedBy, dislikedBy };
          })
        };
      })
    );
  };

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

  // ----------- CLICK OUTSIDE TO CLOSE COMMENTS -----------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newsfeedRef.current && !newsfeedRef.current.contains(event.target) && visibleCommentsPostId !== null) {
        setVisibleCommentsPostId(null);
        setPostText('');
        setPostMedia([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visibleCommentsPostId]);

  const mainContentStyle = { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '20px', paddingBottom: '180px' };

  const mainApp = (
    <div
      className="app-container"
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#254042', paddingBottom: '60px' }}
      ref={newsfeedRef}
    >
      <main style={mainContentStyle}>
        <Routes>
          <Route path="/" element={
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
            />
          }/>
          <Route path="/profile" element={
            <Profile
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
            />
          }/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/messages" element={<Messages />}/>
          <Route path="/friends" element={<Friends />}/>
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
      />

      <Nav currentUser={currentUser} handleLogout={handleLogout}/>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial, sans-serif', backgroundColor: '#1f2227', padding: '20px' }}>
        <Access users={users} setUsers={setUsers} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
      </div>
    );
  }

  return mainApp;
}

export default App;
