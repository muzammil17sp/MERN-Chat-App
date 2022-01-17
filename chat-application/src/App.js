import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './screens/Home';
import Auth from './screens/Auth';
import PasswordForget from './screens/PasswordForget';
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth" element={<Auth />} />

        <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
      </Routes>
    </div>
  );
}

export default App;
