import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, updateContact } from '../redux/contactsSlice';
import { RootState } from '../redux/store';

interface ContactFormProps {
  contact?: {
    id: number;
    first_name: string;
    last_name: string;
    is_active: boolean;
  };
  isEditing?: boolean;
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ contact, isEditing = false, onClose }) => {
  const [firstName, setFirstName] = useState(contact?.first_name || '');
  const [lastName, setLastName] = useState(contact?.last_name || '');
  const [isActive, setIsActive] = useState(contact?.is_active || false);

  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);

  const generateNewId = () => {
    if (contacts.length === 0) return 1;
    const lastContactId = contacts[contacts.length - 1].id;
    return lastContactId + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newContact = {
      id: isEditing && contact ? contact.id : generateNewId(),
      first_name: firstName,
      last_name: lastName,
      is_active: isActive,
    };

    if (isEditing && contact) {
      dispatch(updateContact(newContact));
    } else {
      dispatch(addContact(newContact));
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{isEditing ? 'Edit Contact' : 'Add Contact'}</h2>
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-gray-700 mb-1">First Name:</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-gray-700 mb-1">Last Name:</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
          required
        />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-700 mb-1">Status:</span>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="is_active"
              value="true"
              checked={isActive === true}
              onChange={() => setIsActive(true)}
              className="form-radio"
            />
            <span>Active</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="is_active"
              value="false"
              checked={isActive === false}
              onChange={() => setIsActive(false)}
              className="form-radio"
            />
            <span>Inactive</span>
          </label>
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
        {isEditing ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
