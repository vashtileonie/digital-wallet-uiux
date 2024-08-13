import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; 

interface LoginProps {
  onLogin: () => void;
}

function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false); // State for dark mode
  const navigate = useNavigate();

  // Define dummy user credentials
  const dummyEmail = 'john@example.com';
  const dummyPassword = 'password123';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simple dummy validation
    if (email === dummyEmail && password === dummyPassword) {
      console.log('Login successful:', email);
      onLogin(); // Call the onLogin function passed from App.js
      navigate('/dashboard'); // Navigate to dashboard after successful login
    } else {
      console.log('Login failed: Invalid credentials');
      alert('Invalid email or password.'); // Show an alert or handle error as needed
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-dark-mode' : 'bg-light-mode'}`}>
      <div className={`p-6 md:p-8 lg:p-10 xl:p-12 rounded shadow-md w-full max-w-md ${darkMode ? 'bg-card-dark-mode text-dark-mode' : 'bg-card-light-mode text-light-mode'}`}>
        <div className="absolute top-4 right-4 flex items-center">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center p-2 rounded-full shadow-lg ${darkMode ? 'bg-yellow-400' : 'bg-gray-300'} transition-colors duration-300`}
          >
            <div className={`w-10 h-6 flex items-center ${darkMode ? 'justify-end' : 'justify-start'} bg-gray-200 rounded-full p-1`}>
              <div className={`w-6 h-6 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-yellow-500'} shadow-md`} />
            </div>
            <span className="ml-2">{darkMode ? <MoonIcon className="w-6 h-6 text-gray-900" /> : <SunIcon className="w-6 h-6 text-yellow-600" />}</span>
          </button>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Login to DigiWallet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 block w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm p-2`}
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
              className={`mt-1 block w-full border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm p-2`}
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded transition duration-200 ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}>
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm md:text-base">
          Don't have an account? <Link to="/register" className={`text-blue-600 hover:underline ${darkMode ? 'text-blue-400' : ''}`}>Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
