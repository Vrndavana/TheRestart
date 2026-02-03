import React, { useState } from "react";
import Post from "./Post";

export default function Profile({
  posts,
  profileOwner,  // This will now represent the profile owner instead of currentUser
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
  const [profilePic, setProfilePic] = useState('default-profile-pic.png'); // Default profile picture URL
  const [bio, setBio] = useState('This is my bio.'); // Default bio text
  const [isEditingBio, setIsEditingBio] = useState(false); // Track if bio is being edited

  // Safely filter posts for the profile owner
  const userPosts = (posts || []).filter(p => p.username === profileOwner); // Use profileOwner to filter posts
  const { platforms = [], friendsCount = 0, groups = [] } = userStats || {};

  // Handle profile picture change
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Update the profile pic with the file selected
      };
      reader.readAsDataURL(file); // Convert the file to a base64 URL
    }
  };

  // Handle bio text change
  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  // Toggle edit bio mode
  const toggleEditBio = () => {
    setIsEditingBio(prevState => !prevState);
  };

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
        {profileOwner}'s Profile  {/* Display the profile owner's name */}
      </h2>

      {/* Profile Picture */}
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          backgroundColor: "#d1d8d6",
          marginBottom: "20px",
          backgroundImage: `url(${profilePic})`, // Dynamically change profile picture
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Hidden file input for selecting the profile picture */}
      <input
        type="file"
        accept="image/jpeg, image/gif"
        style={{ display: "none" }} // Hide the actual file input
        onChange={handleProfilePicChange}
        id="profilePicInput"
      />
      
      {/* Buttons Row */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {/* Button Row */}
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById('profilePicInput').click()} // Trigger file input click
        >
          Profile Picture
        </button>

        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#28a745", // Green color for edit
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

      {/* Badges Row */}
      <div
        style={{
          display: "flex",
          gap: "20px", // Add more space between badges
          marginBottom: "20px",
        }}
      >
        {/* Default Badge - "K" for Account Creation */}
        <div
          style={{
            width: "40px", // Smaller size
            height: "40px", // Smaller size
            borderRadius: "8px",
            backgroundColor: "#007bff", // Blue badge
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "20px", // Adjust font size to fit within the smaller badge
            position: "relative",
            cursor: "pointer",
          }}
          title="Kompletion Badge: For joining the app"
        >
          K
          {/* Tooltip on hover */}
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

        {/* Greyed-out badges for future */}
        <div
          style={{
            width: "40px", // Smaller size
            height: "40px", // Smaller size
            borderRadius: "8px",
            backgroundColor: "#d1d8d6", // Light grey
          }}
        ></div>
        <div
          style={{
            width: "40px", // Smaller size
            height: "40px", // Smaller size
            borderRadius: "8px",
            backgroundColor: "#d1d8d6", // Light grey
          }}
        ></div>
        <div
          style={{
            width: "40px", // Smaller size
            height: "40px", // Smaller size
            borderRadius: "8px",
            backgroundColor: "#d1d8d6", // Light grey
          }}
        ></div>
        {/* Add more greyed-out badges here as needed */}
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
        <strong>Profile of {profileOwner}:</strong>  {/* Display the profile owner's name */}
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
