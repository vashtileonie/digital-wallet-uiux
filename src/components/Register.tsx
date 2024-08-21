import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import users from '../users.json';

interface RegisterProps {
  onLogin: () => void;
}

function Register({ onLogin }: RegisterProps) {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', { // Replace with your actual API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        onLogin(); // Automatically log in the user after successful registration
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.log('Registration failed:', errorData.error);
        alert(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    }
  };
  

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-dark-gradient text-dark-mode' : 'bg-light-gradient text-light-mode'}`}>
      <div className={`w-full max-w-sm md:max-w-md lg:max-w-lg ${darkMode ? 'bg-card-dark-mode' : 'bg-card-light-mode'} p-6 md:p-8 rounded-lg shadow-md`}>
      <h2 className="text-lg md:text-2xl font-bold">Get Started</h2>
      <h1 className="text-base md:text-xl mb-4 italic">Register for DigiWallet</h1>
    
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`mt-1 block w-full border ${darkMode ? 'border-gray-600 bg-card-dark-mode text-dark-mode' : 'border-gray-300 bg-card-light-mode text-light-mode'} rounded-md shadow-sm p-2 md:p-3`}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 block w-full border ${darkMode ? 'border-gray-600 bg-card-dark-mode text-dark-mode' : 'border-gray-300 bg-card-light-mode text-light-mode'} rounded-md shadow-sm p-2 md:p-3`}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full border ${darkMode ? 'border-gray-600 bg-card-dark-mode text-dark-mode' : 'border-gray-300 bg-card-light-mode text-light-mode'} rounded-md shadow-sm p-2 md:p-3`}
            />
          </div>
          <button type="submit" className={`w-full py-2 md:py-3 px-4 rounded transition duration-200 ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className={`text-blue-600 hover:underline ${darkMode ? 'text-blue-400' : ''}`}>Login here</Link>
        </p>
      </div>
      <div className="absolute top-4 right-4 flex items-center">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center p-2 rounded-full shadow-lg ${darkMode ? 'bg-yellow-300' : 'bg-gray-300'} transition-colors duration-300`}
        >
          <div className={`w-10 h-6 flex items-center ${darkMode ? 'justify-end' : 'justify-start'} bg-gray-100 rounded-full p-1`}>
            <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-yellow-400'} shadow-md`} />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Register;
