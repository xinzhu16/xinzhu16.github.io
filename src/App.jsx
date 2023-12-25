import { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="test" element={<>test3333</>} />
      </Routes>
    </Router>
  );
}

export default App;
