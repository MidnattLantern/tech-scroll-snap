import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './pages/landingPage/LandingPage';
import TooSmallPage from './pages/tooSmallPage/TooSmallPage';

const App: React.FC = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 1275);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <TooSmallPage />
      ) : null}
      <div className="App">
          <LandingPage />
        </div>
    </>
  );
};

export default App;