import React from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";
import Chat from "./pages/Chat";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
