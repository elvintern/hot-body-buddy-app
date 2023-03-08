import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Routine from './pages/Routine';
import NotFound from './pages/NotFound';

import '../src/styles/main.scss';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="profile/:userId">
              <Route index element={<Profile />} />
              <Route path="routine" element={<Routine />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
