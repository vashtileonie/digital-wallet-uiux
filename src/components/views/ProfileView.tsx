import React, { useState, useEffect } from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ProfileViewProps {
  darkMode: boolean;
}

function ProfileView({ darkMode }: ProfileViewProps) {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+1 (555) 123-4567',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName') || 'John';
    const storedLastName = localStorage.getItem('lastName') || 'Doe';
    const storedEmail = localStorage.getItem('email') || 'john.doe@example.com';

    setProfile({
      firstName: storedFirstName,
      lastName: storedLastName,
      email: storedEmail,
      phone: profile.phone,
    });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  return (
    <div className={`shadow overflow-hidden sm:rounded-lg mx-4 my-6 sm:mx-8 sm:my-8`}>
      <div className={`px-4 py-5 sm:px-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className="text-lg leading-6 font-medium">User Profile</h3>
      </div>
      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <dl>
          <div className={`bg-gray-50 px-4 py-5 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-4 sm:px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <dt className="text-sm font-medium flex items-center">
              <User className="mr-2" size={18} /> Full name
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                />
              ) : (
                `${profile.firstName} ${profile.lastName}`
              )}
            </dd>
          </div>
          <div className={`bg-gray-50 px-4 py-5 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-4 sm:px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <dt className="text-sm font-medium flex items-center">
              <Mail className="mr-2" size={18} /> Email address
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                />
              ) : (
                profile.email
              )}
            </dd>
          </div>
          <div className={`bg-gray-50 px-4 py-5 grid grid-cols-1 gap-y-3 sm:grid-cols-3 sm:gap-4 sm:px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <dt className="text-sm font-medium flex items-center">
              <Phone className="mr-2" size={18} /> Phone number
            </dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className={`w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
                />
              ) : (
                profile.phone
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className={`px-4 py-3 flex justify-end sm:px-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        {isEditing ? (
          <button
            onClick={handleSave}
            className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 ${darkMode ? 'hover:bg-blue-700' : 'hover:bg-blue-700'}`}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
