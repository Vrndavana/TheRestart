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
            border: '1px solid #ccc',
            resize: 'none',
            boxSizing: 'border-box',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Toggle Button */}
          <button
            onClick={() => {
              if (toggle && postText.trim() !== '') {
                // Prevent toggling off if text is not empty
                return;
              }
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

          {/* Upload Media Button */}
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
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPostMedia(file);
              }
            }}
            accept="*/*"
          />

          {/* Delete All Posts Button for SecurityGuy */}
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

        {/* Show selected media file name if any */}
        {postMedia && (
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
            File: {postMedia.name}
          </div>
        )}

        {/* Post or Comment Button */}
        <button
          onClick={() => {
            if (postText.trim() === '') {
              // Textarea empty: switch back to Post mode
              setVisibleCommentsPostId(null);
              if (textareaRef.current) textareaRef.current.blur();
            } else {
              // Textarea not empty: post comment and keep comment mode active
              handlePost();
              if (textareaRef.current) textareaRef.current.blur();
              // Do NOT clear visibleCommentsPostId here to keep comment section open
            }
          }}
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
      </div>
    </section>
  );
};

export default PostWidget;
