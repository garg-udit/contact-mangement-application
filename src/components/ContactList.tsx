import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { deleteContact } from '../redux/contactsSlice';
import ContactForm from './ContactForm';

const ContactList = () => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  const [editingContact, setEditingContact] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id: number) => {
    dispatch(deleteContact(id));
  };

  const handleEdit = (contact: any) => {
    setEditingContact(contact);
    setIsEditing(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center md:text-left">Contacts List</h1>

      {contacts.length > 0 ? (
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="bg-white shadow-md rounded-lg border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{contact.first_name} {contact.last_name}</h2>
                <p className="text-gray-700 mt-1">Status: {contact.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={() => handleEdit(contact)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No contacts available</p>
      )}

      {isEditing && (
        <div className="mt-6">
          <ContactForm contact={editingContact} isEditing={true} onClose={() => setIsEditing(false)} />
        </div>
      )}
    </div>
  );
};

export default ContactList;
