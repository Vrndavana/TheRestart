import React, { useRef, useState } from 'react';
import { useTheme } from '../ThemeContext';

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

  const { theme } = useTheme();

  const handleClick = () => {
    if (postText.trim() === '' && postMedia.length === 0) {
      setEmptyWarning(true);
      setTimeout(() => setEmptyWarning(false), 1000);
      return;
    }

    handlePost();
    if (textareaRef.current) textareaRef.current.blur();
    setPostText('');
    setPostMedia([]);
  };

  // ---------- THEME COLORS ----------
  const colors = {
    background: theme === 'dark' ? '#585858' : '#f5f5f5',       // textarea background
    postBg: theme === 'dark' ? '#4a5351' : '#82b4ae',          // widget container
    commentBg: theme === 'dark' ? '#2a2a2a' : '#e0e0e0',       // media preview, toggles
    textColor: theme === 'dark' ? '#f5f5f5' : '#000000',
    secondaryText: theme === 'dark' ? '#e0e0e0' : '#444444',
    buttonColor: theme === 'dark' ? '#6ee7b7' : '#354bca',
    buttonTextColor: '#ffffff',
    dislikeColor: '#d11d1a',
  };

  // Close comments handler (keeps the comments open if toggled)
  const handleCloseWidget = () => {
    setToggle(false);  // Only close the PostWidget, not the comments
  };

  // Close comments section handler (keeps the widget open)
  const handleCloseComments = () => {
    setVisibleCommentsPostId(null);  // Close the comments section
  };

  return (
    <div>
      {/* TOGGLE POST WIDGET */}
      {/* Toggle Button (when collapsed) */}
      {!toggle && (
        <button
          onClick={() => setToggle(true)}
          style={{
            position: 'fixed',
            bottom: '30px',  // Adjust the distance from the bottom
            left: '5%',    // Adjust the distance from the left
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            margin: '2% 0%',
            backgroundColor: colors.buttonColor,
            color: colors.buttonTextColor,
            border: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            zIndex: 1000,
            cursor: 'pointer',
            fontSize: '20px',
            transition: 'all 0.3s ease',
          }}
        >
          +
        </button>
      )}

      {/* Full Post Widget (when expanded) */}
      {toggle && (
        <section
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '92%',
            backgroundColor: colors.postBg,
            boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
            padding: '15px 20px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            height: 'auto', // Expand to show full widget content
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <textarea
              ref={textareaRef}
              placeholder={visibleCommentsPostId !== null ? 'Write a comment...' : 'Post To The World!'}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              style={{
                width: '100%',
                height: '60px',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '5px',
                border: `1px solid ${emptyWarning ? 'red' : colors.textColor}`,
                backgroundColor: colors.background,
                color: colors.textColor,
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                  padding: '6px 12px',
                  backgroundColor: colors.buttonColor,
                  color: colors.buttonTextColor,
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
                    backgroundColor: colors.dislikeColor,
                    color: colors.buttonTextColor,
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

              {/* Close button for PostWidget only */}
              <button
                onClick={handleCloseWidget} // Close PostWidget, NOT comments
                style={{
                  padding: '6px 12px',
                  marginLeft: 'auto',
                  backgroundColor: colors.dislikeColor,
                  color: colors.buttonTextColor,
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                Close
              </button>
            </div>

            {postMedia.length > 0 && (
              <div
                style={{
                  fontSize: '14px',
                  color: colors.textColor,
                  padding: '6px 10px',
                  backgroundColor: colors.commentBg,
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
                  backgroundColor: colors.buttonColor,
                  color: colors.buttonTextColor,
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: 'bold',
                }}
              >
                {visibleCommentsPostId !== null || postText.trim() !== '' ? 'Comment' : 'Post'}
              </button>

              {visibleCommentsPostId !== null && (
                <button
                  onClick={handleCloseComments} // Close comments only
                  style={{
                    padding: '10px 20px',
                    backgroundColor: colors.dislikeColor,
                    color: colors.buttonTextColor,
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
      )}
    </div>
  );
};

export default PostWidget;
