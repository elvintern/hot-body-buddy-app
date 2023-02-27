import React from 'react';
import Login from '../components/Login';
import Quote from '../components/Quote';
import './Home.scss';

export default function Home() {
  return (
    <>
      <Quote />
      <Login />
    </>
  );
}
