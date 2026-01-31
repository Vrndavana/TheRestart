import React from 'react';
import { Link } from 'react-router-dom';



// Main APP BRrowser Link 
// import { Routes, Route } from 'react-router-dom';

// const mainApp = (
//   <div
//     className="app-container"
//     style={{
//       display: 'flex',
//       flexDirection: 'column',
//       minHeight: '100vh',
//       fontFamily: 'Arial, sans-serif',
//       backgroundColor: '#254042',
//       paddingBottom: '60px',
//     }}
//     ref={newsfeedRef}
//   >
//     <main style={mainContentStyle}>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Articles
//               posts={posts}
//               commentsRef={commentsRef}
//               currentUser={currentUser}
//               handleDeletePost={handleDeletePost}
//               handleLike={handleLike}
//               handleDislike={handleDislike}
//               handleCommentClick={handleCommentClick}
//               handleShare={handleShare}
//               likedPosts={likedPosts}
//               dislikedPosts={dislikedPosts}
//               visibleCommentsPostId={visibleCommentsPostId}
//               handleCommentLike={handleCommentLike}
//               handleCommentDislike={handleCommentDislike}
//             />
//           }
//         />
//         <Route
//           path="/profile"
//           element={
//             <Profile
//               posts={posts}
//               currentUser={currentUser}
//               handleDeletePost={handleDeletePost}
//               handleLike={handleLike}
//               handleDislike={handleDislike}
//               handleCommentClick={handleCommentClick}
//               handleShare={handleShare}
//               likedPosts={likedPosts}
//               dislikedPosts={dislikedPosts}
//               visibleCommentsPostId={visibleCommentsPostId}
//               handleCommentLike={handleCommentLike}
//               handleCommentDislike={handleCommentDislike}
//             />
//           }
//         />
//       </Routes>
//     </main>

//     {postWidget}
//     <Nav currentUser={currentUser} handleLogout={handleLogout} />
//   </div>
// );



// Find main app route and add the browser wrappign with the app inside
// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import MainApp from './MainApp'; // or wherever your mainApp component is

// function App() {
//   return (
//     <BrowserRouter>
//       <MainApp />
//     </BrowserRouter>
//   );
// }

// export default App;






const Nav = ({ currentUser, handleLogout }) => {
  return (
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
      <div style={{ fontWeight: 'bold', color: '#fafdfd', margin: 'auto' }}>
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
        <li style={{ cursor: 'pointer' }}>
          <Link
            to="/"
            style={{ textDecoration: 'none', color: '#fafdfd', fontWeight: 'bold' }}
          >
            Articles
          </Link>
        </li>
        <li style={{ cursor: 'pointer' }}>
          <Link
            to="/profile"
            style={{ textDecoration: 'none', color: '#fafdfd', fontWeight: 'bold' }}
          >
            Profile
          </Link>
        </li>
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
  );
};

export default Nav;
