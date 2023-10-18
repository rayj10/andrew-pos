import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './containers/Main';
import Admin from './containers/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/andrew-pos" element={<Main/>}/>
        <Route path="/andrew-pos/admin" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
