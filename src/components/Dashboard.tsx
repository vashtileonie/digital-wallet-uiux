import React, { useState, useEffect } from 'react';
import { Home, CreditCard, DollarSign, Bell, User, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomeView from './views/HomeView';
import TransactionsView from './views/TransactionsView';
import NotificationsView from './views/NotificationsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';
import AccountManagement from './AccountManagement';
import StorePurchase from './StorePurchase';
import logoImage from '../assets/logo-light.png';
import logoImageDark from '../assets/logo-dark.png';

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>('');
  const [kycStatus, setKycStatus] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileUploadPromptVisible, setIsFileUploadPromptVisible] = useState<boolean>(false);
  const [isCreateWalletButtonVisible, setIsCreateWalletButtonVisible] = useState<boolean>(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
      fetchKycStatus(token);
    } else {
      console.error('UserToken not found in localStorage');
    }
  }, []);

  const fetchKycStatus = async (token: string) => {
    const apiUrl = `http://localhost:3000/api/kyc/status`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setKycStatus(data.status);
        if (data.status === 'approved') {
          
        }
      } else {
        console.error('Failed to fetch KYC status, status code:', response.status);
        setKycStatus(null);
      }
    } catch (error) {
      console.error('Error fetching KYC status:', error);
      setKycStatus(null);
    }
  };

  const initiateKyc = async () => {
    const apiUrl = `http://localhost:3000/api/kyc/initiate`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert('KYC initiated successfully!');
        setIsFileUploadPromptVisible(true); // Show file upload prompt
        fetchKycStatus(userToken);
      } else {
        console.error('Failed to initiate KYC, status code:', response.status);
      }
    } catch (error) {
      console.error('Error initiating KYC:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('document', selectedFile);

    try {
      const response = await fetch('http://localhost:3000/api/kyc/upload-document', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('Document uploaded successfully!');
        setIsCreateWalletButtonVisible(true); // Show Create Wallet button if KYC document is approved
        setIsFileUploadPromptVisible(false);
        setSelectedFile(null);
        fetchKycStatus(userToken); // Refresh KYC status
      } else {
        console.error('Failed to upload document, status code:', response.status);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  const handleCreateWallet = async () => {
    const balance = prompt('Enter the initial balance for your wallet:');
    if (balance && !isNaN(Number(balance))) {
      

      try {
        const response = await fetch('http://localhost:3000/api/wallet/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ initialBalance: Number(balance) }),
        });

        if (response.ok) {
          alert('Wallet created successfully!');
          fetchBalance();
          setIsCreateWalletButtonVisible(false); // Hide Create Wallet button
          navigate('/dashboard'); // Navigate to HomeView to reload it
        } else {
          console.error('Failed to create wallet, status code:', response.status);
        }
      } catch (error) {
        console.error('Error creating wallet:', error);
      }
    } else {
      alert('Invalid balance. Please enter a valid number.');
    }
  };

  const fetchBalance = async () => {
    const apiUrl = `http://localhost:3000/api/wallet/balance`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Current balance: ${data.balance}`);
      } else {
        console.error('Failed to fetch balance, status code:', response.status);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const sidebarLinks = [
    { icon: <Home />, label: 'Home', key: 'home' },
    { icon: <CreditCard />, label: 'Accounts', key: 'accounts' },
    { icon: <DollarSign />, label: 'Transactions', key: 'transactions' },
    { icon: <ShoppingBag />, label: 'Store Purchase', key: 'store-purchase' },
    { icon: <Bell />, label: 'Notifications', key: 'notifications' },
    { icon: <User />, label: 'Profile', key: 'profile' },
    { icon: <Settings />, label: 'Settings', key: 'settings' },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    navigate(key);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-dark-gradient text-white' : 'bg-light-gradient text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`fixed z-30 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 ${darkMode ? 'bg-gray-900' : 'bg-gray-200'} shadow-md md:relative md:translate-x-0`}>
        <div className="p-4 flex justify-between md:block">
          <div className="flex items-center">
            <img src={darkMode ? logoImageDark : logoImage} alt="DigiWallet Logo" className="h-12 w-12 mr-2" />
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>DigiWallet</h1>
          </div>
          <button className="md:hidden text-gray-600 hover:text-gray-900" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              className={`flex items-center w-full py-2 px-4 ${
                activeTab === link.key ? 'bg-blue-100 text-blue-600' : darkMode ? 'text-gray-300 hover:bg-blue-600' : 'text-gray-600 hover:bg-blue-200'
              }`}
              onClick={() => handleTabChange(link.key)}
            >
              {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
              {link.label}
            </button>
          ))}
          {/* KYC Validation Button */}
          {kycStatus !== 'approved' && (
            <button
              className="flex items-center justify-center w-full py-2 px-4 mt-4 rounded-md text-white bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300"
              onClick={initiateKyc}
            >
              Validate
            </button>
          )}

         {/* File Upload Prompt */}
          {isFileUploadPromptVisible && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
              <input 
                type="file" 
                onChange={handleFileChange} 
                className="block w-full text-sm text-gray-700 dark:text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-50 file:text-sm file:font-medium file:text-gray-700 dark:file:border-gray-600 dark:file:bg-gray-700 dark:file:text-gray-300"
              />
              <button 
                onClick={handleFileUpload} 
                className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300"
              >
                Upload Document
              </button>
            </div>
          )}

         {/* Create Wallet Button */}
          {isCreateWalletButtonVisible && (
            <button
              className="flex items-center justify-center w-full py-2 px-4 mt-4 rounded-md text-white bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300"
              onClick={handleCreateWallet}
            >
              Create Wallet
            </button>
          )}

        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <button className="flex items-center text-gray-600 hover:text-red-500 mt-6" onClick={onLogout}>
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} shadow-sm flex items-center justify-between md:justify-start md:space-x-4`}>
          <button className="p-4 md:hidden text-gray-600 hover:text-gray-900" onClick={toggleSidebar}>
            ☰
          </button>
          <h1 className="text-2xl font-semibold px-4 py-4 md:px-0">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route 
              path="/" 
              element={userToken ? <HomeView darkMode={darkMode} userToken={userToken} /> : <p>Loading...</p>} 
            />
            <Route 
              path="home" 
              element={userToken ? <HomeView darkMode={darkMode} userToken={userToken} /> : <p>Loading...</p>} 
            />
            <Route path="accounts" element={<AccountManagement darkMode={darkMode} userToken={userToken} />} />
            <Route path="transactions" element={<TransactionsView darkMode={darkMode} />} />
            <Route path="store-purchase" element={<StorePurchase darkMode={darkMode} />} />
            <Route path="notifications" element={<NotificationsView darkMode={darkMode} userToken={userToken} />} />
            <Route path="profile" element={<ProfileView darkMode={darkMode} />} />
            <Route path="settings" element={<SettingsView darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
