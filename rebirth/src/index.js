// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- important
import { ThemeProvider } from './ThemeContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);





// src/index.js --- Template for UserState Below 



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom'; // <-- important
// import { ThemeProvider } from './ThemeContext';
// import { UserStateProvider } from './UserState'; // <-- import UserStateProvider
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>

//     <UserStateProvider> {/* <-- wrap App with provider */}

//       <ThemeProvider>

//         <BrowserRouter>

//           <App />

//         </BrowserRouter>
        
//       </ThemeProvider>

//     </UserStateProvider>

//   </React.StrictMode>
// );
