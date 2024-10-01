import React from 'react';
import './App.css';
//import ScrollPilotProvider from './pages/scrollPilot/ScrollPilotProvider';
import LandingPage from './pages/landingPage/LandingPage';

const App: React.FC = () => {
  return (<>
    <div className="App">
      <LandingPage />
    </div>
  </>);
}

export default App;
