import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterProps {
  onLogin: () => void;
}

// Simulated in-memory user database
const users: Array<{ name: string; email: string; password: string }> = [
  { name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
];

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Here you would typically make an API call to register the user
    //console.log('Registration attempt:', name, email, password);

    // Check if the email is already registered
    const userExists = users.some(user => user.email === email);

    if (userExists) {
      alert('Email is already registered. Please use a different email or log in.');
    } else {
      // Register the user by adding them to the dummy database
      users.push({ name, email, password });
      console.log('Registration successful:', name, email);


      onLogin(); // Automatically log in the user after successful registration
      navigate('/dashboard'); // Navigate to dashboard after successful registration
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register for DigiWallet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
