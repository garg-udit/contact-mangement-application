import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <header className='bg-gray-800 text-white p-4 flex justify-between items-center md:hidden'>
        <Link
          to='/'
          className='text-2xl font-bold'
          onClick={() => {
            setIsMenuOpen(false);
          }}>
          Taiyō.AI
        </Link>
        <button onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      {isMenuOpen && (
        <nav className='bg-gray-800 text-white flex flex-col p-4 space-y-2 absolute z-10  w-screen md:hidden'>
          <Link
            to='/'
            className='hover:bg-gray-700 p-2 rounded'
            onClick={toggleMenu}>
            Home
          </Link>
          <Link
            to='/charts'
            className='hover:bg-gray-700 p-2 rounded'
            onClick={toggleMenu}>
            Charts and Maps
          </Link>
          <Link
            to='/contacts'
            className='hover:bg-gray-700 p-2 rounded'
            onClick={toggleMenu}>
            Contacts
          </Link>
        </nav>
      )}

      <div className=' hidden md:flex flex-col bg-gray-800 text-white w-38 min-h-screen p-4'>
        <Link to='/' className='text-2xl font-bold mb-8'>
          Taiyō.AI
        </Link>
        <nav className='flex flex-col space-y-4'>
          <Link to='/' className='hover:bg-gray-700 p-2 rounded'>
            Home
          </Link>
          <Link to='/charts' className='hover:bg-gray-700 p-2 rounded'>
            Charts and Maps
          </Link>
          <Link to='/contacts' className='hover:bg-gray-700 p-2 rounded'>
            Contacts
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
