// // File: src/App.js
// import React, { useState, useEffect } from 'react';
// import LandingPage from './components/LandingPage';
// import FeaturesPage from './components/FeaturesPage';
// import PricingPage from './components/PricingPage';
// import MainApp from './components/MainApp';
// import LoginPage from './components/LoginPage';
// import SignupPage from './components/SignupPage';
// import { listenAuth } from './firebase';   // 👈 Import auth listener
// import './App.css';

// const App = () => {
//   const [currentPage, setCurrentPage] = useState('landing');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // 👀 Keep track of Firebase auth changes
//     const unsubscribe = listenAuth((currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         setCurrentPage('main');  // auto navigate when logged in
//       } else {
//         setUser(null);
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleNavigate = (page) => {
//     setCurrentPage(page);
//   };

//   const handleStart = () => {
//     if (user) {
//       setCurrentPage('main');
//     } else {
//       setCurrentPage('login'); // force login before start
//     }
//   };

//   const handleLoginSuccess = (userData) => {
//     setUser(userData);
//     setCurrentPage('main');
//   };

//   const handleSignupSuccess = (userData) => {
//     setUser(userData);
//     setCurrentPage('main');
//   };

//   return (
//     <>
//       {currentPage === 'landing' && <LandingPage onStart={handleStart} onNavigate={handleNavigate} />}
//       {currentPage === 'features' && <FeaturesPage onBack={() => handleNavigate('landing')} />}
//       {currentPage === 'pricing' && <PricingPage onBack={() => handleNavigate('landing')} />}
//       {currentPage === 'login' && (
//         <LoginPage
//           onBack={() => handleNavigate('landing')}
//           onLoginSuccess={handleLoginSuccess}
//           onNavigateToSignup={() => handleNavigate('signup')}
//         />
//       )}
//       {currentPage === 'signup' && (
//         <SignupPage
//           onBack={() => handleNavigate('landing')}
//           onSignupSuccess={handleSignupSuccess}
//           onNavigateToLogin={() => handleNavigate('login')}
//         />
//       )}
//       {currentPage === 'main' && <MainApp onBack={() => handleNavigate('landing')} user={user} />}
//     </>
//   );
// };

// export default App;




// File: src/App.js
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import MainApp from './components/MainApp';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { listenAuth } from './firebase';   // Firebase auth listener
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Keep track of Firebase auth changes
    const unsubscribe = listenAuth((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setCurrentPage('main');  // auto navigate when logged in
      } else {
        setUser(null);
        setCurrentPage('landing'); // go back to landing after logout
      }
    });
    return () => unsubscribe();
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleStart = () => {
    if (user) {
      setCurrentPage('main');
    } else {
      setCurrentPage('login'); // force login before start
    }
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('main');
  };

  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setCurrentPage('main');
  };

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage
          onStart={handleStart}
          onNavigate={handleNavigate}
          user={user} // ✅ pass user to show avatar/logout
        />
      )}
      {currentPage === 'features' && <FeaturesPage onBack={() => handleNavigate('landing')} />}
      {currentPage === 'pricing' && <PricingPage onBack={() => handleNavigate('landing')} />}
      {currentPage === 'login' && (
        <LoginPage
          onBack={() => handleNavigate('landing')}
          onLoginSuccess={handleLoginSuccess}
          onNavigateToSignup={() => handleNavigate('signup')}
        />
      )}
      {currentPage === 'signup' && (
        <SignupPage
          onBack={() => handleNavigate('landing')}
          onSignupSuccess={handleSignupSuccess}
          onNavigateToLogin={() => handleNavigate('login')}
        />
      )}
      {currentPage === 'main' && <MainApp onBack={() => handleNavigate('landing')} user={user} />}
    </>
  );
};

export default App;



