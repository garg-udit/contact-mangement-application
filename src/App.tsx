import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import Charts from "./pages/Charts";

function App() {
  return (
    <Router>
      <div className='flex h-screen'>
        <Sidebar  />

        <div className='flex-grow overflow-y-auto p-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/charts' element={<Charts />} />
            <Route path='/contacts' element={<Contacts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
