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

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
    {/* Sidebar */}
    <div className={`w-64 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-blue-600">DigiWallet</h1>
      </div>
      <nav className="mt-6">
        {sidebarLinks.map((link) => (
          <button
            key={link.key}
            className={`flex items-center w-full py-2 px-4 ${
              activeTab === link.key ? 'bg-blue-100 text-blue-600' : (darkMode ? 'text-gray-300 hover:bg-blue-500' : 'text-gray-600 hover:bg-blue-200')
            }`}
            onClick={() => handleTabChange(link.key)}
          >
            {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
            {link.label}
          </button>
        ))}
      </nav>
      <div className="absolute bottom-0 w-64 p-4">
        <button
          className={`w-full py-2 px-4 rounded ${
            darkMode ? 'bg-gray-700 text-white mb-6' : 'bg-gray-200 text-gray-900 mb-6'
          } hover:bg-lightblue-500`}
          onClick={toggleDarkMode}
        >
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
        <button className="flex items-center text-gray-600 hover:text-red-500" onClick={onLogout}>
          <LogOut className="mr-2" size={18} />
          Logout
        </button>
      </div>
    </div>


      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="home" element={<HomeView />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="transactions" element={<TransactionsView />} />
            <Route path="store-purchase" element={<StorePurchase />} />
            <Route path="notifications" element={<NotificationsView />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
