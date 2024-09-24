import React from 'react';

import './App.css';
import ScrollPilotProvider from './pages/scrollPilot/ScrollPilotProvider';

const App: React.FC = () => {
  return (<>
    <div className="App">
      <ScrollPilotProvider />
    </div>
  </>);
}

export default App;
