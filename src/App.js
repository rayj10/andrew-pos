import * as React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './containers/Main';
import Admin from './containers/Admin';
import { isPortrait } from './functions/util';

function App() {
  const [portraitMode, setMode] = React.useState(isPortrait());
  React.useEffect(() => {
    function handleResize() {
      setMode(isPortrait())
    }

    window.addEventListener('resize', handleResize)
  });
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/andrew-pos" element={<Main portraitMode={portraitMode}/>}/>
        <Route path="/andrew-pos/admin" element={<Admin portraitMode={portraitMode}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
