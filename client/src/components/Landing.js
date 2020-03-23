import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div style={{ textAlign: 'center' }}>
    <h1>Welcome to Emaily!</h1>
    <p>Collect feedback from your users.</p>
    <Link to="/surveys">Dashboard</Link>
  </div>
);

export default Landing;
