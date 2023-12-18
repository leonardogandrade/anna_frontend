import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from './pages/login';
import Dashboard from './pages/dashboard';
// import { Login } from '@mui/icons-material';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route element={<Login />} path="/" exact /> */}
          <Route element={<Dashboard />} path="/" exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
