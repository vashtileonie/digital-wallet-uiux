import React, { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';

interface Profile {
  name: string;
  email: string;
  phone: string;
}

function ProfileView() {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <User className="mr-2" size={18} /> Full name
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                profile.name
              )}
            </dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Mail className="mr-2" size={18} /> Email address
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                profile.email
              )}
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 flex items-center">
              <Phone className="mr-2" size={18} /> Phone number
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              ) : (
                profile.phone
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="px-4 py-3 sm:px-6 flex justify-end">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
