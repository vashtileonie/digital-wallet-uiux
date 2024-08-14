import React, { useState } from 'react';
import { Home, CreditCard, DollarSign, Bell, User, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomeView from './views/HomeView';
import TransactionsView from './views/TransactionsView';
import NotificationsView from './views/NotificationsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';
import AccountManagement from './AccountManagement';
import StorePurchase from './StorePurchase';

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

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
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Sidebar */}
      <div className={`fixed z-30 inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md md:relative md:translate-x-0`}>
        <div className="p-4 flex justify-between md:block">
          <h1 className="text-2xl font-bold text-blue-600">DigiWallet</h1>
          <button className="md:hidden text-gray-600 hover:text-gray-900" onClick={toggleSidebar}>
            ✕
          </button>
        </div>
        <nav className="mt-6">
          {sidebarLinks.map((link) => (
            <button
              key={link.key}
              className={`flex items-center w-full py-2 px-4 ${
                activeTab === link.key ? 'bg-blue-100 text-blue-600' : darkMode ? 'text-gray-300 hover:bg-blue-500' : 'text-gray-600 hover:bg-blue-200'
              }`}
              onClick={() => handleTabChange(link.key)}
            >
              {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
              {link.label}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
            <input 
              type="checkbox" 
              checked={darkMode} 
              onChange={toggleDarkMode} 
              className="sr-only" 
            />
            <div className={`relative w-16 h-8 flex items-center ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full`}>
              <div 
                className={`absolute w-8 h-8 bg-white rounded-full shadow-md transition-transform transform ${darkMode ? 'translate-x-8' : 'translate-x-0'}`} 
              />
            </div>
          </label>
          <button className="flex items-center text-gray-600 hover:text-red-500 mt-6" onClick={onLogout}>
            <LogOut className="mr-2" size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm flex items-center justify-between md:justify-start md:space-x-4`}>
          <button className="p-4 md:hidden text-gray-600 hover:text-gray-900" onClick={toggleSidebar}>
            ☰
          </button>
          <h1 className="text-2xl font-semibold px-4 py-4 md:px-0">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomeView darkMode={darkMode} />} />
            <Route path="home" element={<HomeView darkMode={darkMode} />} />
            <Route path="accounts" element={<AccountManagement darkMode={darkMode} />} />
            <Route path="transactions" element={<TransactionsView darkMode={darkMode} />} />
            <Route path="store-purchase" element={<StorePurchase darkMode={darkMode} />} />
            <Route path="notifications" element={<NotificationsView darkMode={darkMode} />} />
            <Route path="profile" element={<ProfileView darkMode={darkMode} />} />
            <Route path="settings" element={<SettingsView darkMode={darkMode} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
