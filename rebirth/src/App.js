import React from 'react';

function App() {
  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#f0f2f5', padding: '20px' }}>
        <h2>MySocial</h2>
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ margin: '15px 0' }}>Home</li>
            <li style={{ margin: '15px 0' }}>Profile</li>
            <li style={{ margin: '15px 0' }}>Friends</li>
            <li style={{ margin: '15px 0' }}>Messages</li>
            <li style={{ margin: '15px 0' }}>Notifications</li>
            <li style={{ margin: '15px 0' }}>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: '#fff', padding: '20px' }}>
        
        {/* Header */}
        <header style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search MySocial" 
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }} 
          />
        </header>

        {/* Post Creation Box */}
        <section style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <textarea 
            placeholder="What's on your mind?" 
            style={{ width: '100%', height: '80px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc', resize: 'none' }} 
          />
          <button 
            style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#1877f2', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Post
          </button>
        </section>

        {/* Feed */}
        <section>
          <article style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>John Doe</h3>
            <p>Had a great day at the beach!</p>
          </article>
          <article style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3>Jane Smith</h3>
            <p>Just finished reading a fantastic book.</p>
          </article>
        </section>
      </main>

      {/* Right Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#f0f2f5', padding: '20px' }}>
        <h3>Contacts</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '10px 0' }}>Alice</li>
          <li style={{ margin: '10px 0' }}>Bob</li>
          <li style={{ margin: '10px 0' }}>Charlie</li>
          <li style={{ margin: '10px 0' }}>Diana</li>
        </ul>
      </aside>

    </div>
  );
}

export default App;
