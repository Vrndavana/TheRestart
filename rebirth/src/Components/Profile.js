import React, { useState, useEffect } from "react";
import Post from "./Post";

export default function Profile({
  posts,
  profileOwner,  // Profile owner
  currentUser,   // Currently logged-in user
  userStats,
  likedPosts,
  dislikedPosts,
  visibleCommentsPostId,
  handleLike,
  handleDislike,
  handleCommentClick,
  handleShare,
  handleDeletePost,
  handleCommentLike,
  handleCommentDislike
}) {
  // Load profile pic and bio from localStorage if they exist
  const savedProfilePic = localStorage.getItem(`profilePic_${profileOwner}`);
  const savedBio = localStorage.getItem(`bio_${profileOwner}`);

  const [profilePic, setProfilePic] = useState(savedProfilePic || 'default-profile-pic.png'); // Default profile picture URL
  const [bio, setBio] = useState(savedBio || 'This is my bio.'); // Default bio text
  const [isEditingBio, setIsEditingBio] = useState(false); // Track if bio is being edited

  // Safely filter posts for the profile owner
  const userPosts = (posts || []).filter(p => p.username === profileOwner);
  const { platforms = [], friendsCount = 0, groups = [] } = userStats || {};

  // Handle profile picture change
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Update state
        localStorage.setItem(`profilePic_${profileOwner}`, reader.result); // Persist to localStorage
      };
      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  // Handle bio text change
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  // Toggle edit bio mode
  const toggleEditBio = () => {
    if (isEditingBio) {
      // Saving bio
      localStorage.setItem(`bio_${profileOwner}`, bio); // Persist bio to localStorage
    }
    setIsEditingBio(prevState => !prevState);
  };

  // Check if the current user is the profile owner
  const isOwner = currentUser === profileOwner;

  return (
    <section
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#8c9795",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {profileOwner}'s Profile
      </h2>

      {/* Profile Picture */}
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: "#d1d8d6",
          marginBottom: "20px",
          backgroundImage: `url(${profilePic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Hidden file input for selecting the profile picture */}
      <input
        type="file"
        accept="image/jpeg, image/gif"
        style={{ display: "none" }}
        onChange={handleProfilePicChange}
        id="profilePicInput"
      />

      {/* Buttons Row - Only show if profile owner is viewing */}
      {isOwner && (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => document.getElementById('profilePicInput').click()}
          >
            Profile Picture
          </button>

          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={toggleEditBio}
          >
            {isEditingBio ? "Save Bio" : "Edit Bio"}
          </button>
        </div>
      )}

      {/* Badges Row */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px",
            position: "relative",
            cursor: "pointer",
          }}
          title="Kompletion Badge: For joining the app"
        >
          K
          <div
            style={{
              visibility: "hidden",
              position: "absolute",
              top: "50px",
              backgroundColor: "#333",
              color: "#fff",
              textAlign: "center",
              padding: "5px",
              borderRadius: "4px",
              fontSize: "12px",
              width: "120px",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
            className="badge-tooltip"
          >
            Kompletion Badge: For joining the app
          </div>
        </div>

        <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#d1d8d6" }}></div>
        <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#d1d8d6" }}></div>
        <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: "#d1d8d6" }}></div>
      </div>

      {/* Bio Section */}
      <div
        style={{
          backgroundColor: "#d1d8d6",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontSize: "14px",
          width: "100%",
        }}
      >
        <strong> Bio: {profileOwner}</strong>
        <div style={{ marginTop: "10px", paddingLeft: "20px" }}>
          {isEditingBio ? (
            <textarea
              value={bio}
              onChange={handleBioChange}
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                fontSize: "14px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          ) : (
            <p>{bio}</p>
          )}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#d1d8d6",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "20px",
          fontSize: "14px",
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <div>
          <strong>Posts:</strong> {userPosts.length}
        </div>
        <div>
          <strong>Platforms:</strong> {platforms.length ? platforms.join(", ") : "None"}
        </div>
        <div>
          <strong>Friends:</strong> {friendsCount}
        </div>
        <div>
          <strong>Groups:</strong> {groups.length ? groups.join(", ") : "None"}
        </div>
      </div>

      {userPosts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777" }}>No posts yet.</p>
      ) : (
        userPosts.map(post => (
          <Post
            key={post.id}
            post={post}
            currentUser={profileOwner}  
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
        ))
      )}
    </section>
  );
}
