import React, { useRef, useState } from 'react';

const PostWidget = ({
  visibleCommentsPostId,
  setVisibleCommentsPostId,
  postText,
  setPostText,
  toggle,
  setToggle,
  fileInputRef,
  postMedia,
  setPostMedia,
  currentUser,
  handleDeleteAllPosts,
  handlePost,
}) => {
  const textareaRef = useRef(null);
  const [emptyWarning, setEmptyWarning] = useState(false);

  const handleClick = () => {
    if (postText.trim() === '' && postMedia.length === 0) {
      // Warn user if empty
      setEmptyWarning(true);
      setTimeout(() => setEmptyWarning(false), 1000);
      return;
    }

    handlePost(); // Post comment or post
    if (textareaRef.current) textareaRef.current.blur();

    // Do NOT reset visibleCommentsPostId so comment section stays open
    setPostText('');
    setPostMedia([]);
  };

  return (
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
      }}
    >
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
              : 'Post To The World!'
          }
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          style={{
            width: '100%',
            height: '60px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: `1px solid ${emptyWarning ? 'red' : '#ccc'}`,
            resize: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => {
              if (toggle && postText.trim() !== '') return;
              setToggle((prev) => !prev);
            }}
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
          >
            Add Media
          </button>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              const files = Array.from(e.target.files);
              if (files.length > 0) setPostMedia((prev) => [...prev, ...files]);
            }}
            accept="*/*"
            multiple
          />

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
            >
              Delete All Posts
            </button>
          )}
        </div>

        {postMedia.length > 0 && (
          <div
            style={{
              fontSize: '14px',
              color: '#af4a4a',
              padding: '6px 10px',
              backgroundColor: '#520741',
              borderRadius: '5px',
              maxWidth: '600px',
              overflowWrap: 'break-word',
            }}
          >
            {postMedia.map((file, i) => (
              <div key={i}>File: {file.name}</div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleClick}
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
            {(visibleCommentsPostId !== null || postText.trim() !== '') ? 'Comment' : 'Post'}
          </button>

          {visibleCommentsPostId !== null && (
            <button
              onClick={() => setVisibleCommentsPostId(null)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
                fontWeight: 'bold',
              }}
            >
              Close Comments
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostWidget;
