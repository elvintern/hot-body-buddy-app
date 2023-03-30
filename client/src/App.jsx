import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Quote from './components/Quote';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Routines from './pages/Routines';
import NotFound from './pages/NotFound';
import Workout from './pages/Workout';

import '../src/styles/main.scss';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <main className="main">
          <Quote />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="profile/:userId">
              <Route index element={<Profile />} />
              <Route path="routine" element={<Routines />} />
              <Route path="workout/:workoutId" element={<Workout />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
