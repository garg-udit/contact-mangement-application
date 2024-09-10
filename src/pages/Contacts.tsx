import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';

const Contacts = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">Contacts</h1>
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Hide Form' : 'Add Contact'}
        </button>
      </div>

      {isFormVisible && (
        <div className="mb-8 bg-white shadow-md rounded-lg p-6">
          <ContactForm onClose={() => setIsFormVisible(false)} />
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6">
        <ContactList />
      </div>
    </div>
  );
};

export default Contacts;
