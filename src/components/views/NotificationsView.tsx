import React, { useState } from 'react';
import { Bell, DollarSign, CreditCard } from 'lucide-react';

interface Notification {
  id: number;
  type: 'alert' | 'transaction' | 'card';
  message: string;
  time: string;
}

interface NotificationsViewProps {
  darkMode: boolean;
}

function NotificationsView({ darkMode }: NotificationsViewProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: 'alert', message: 'Low balance in your checking account', time: '2 hours ago' },
    { id: 2, type: 'transaction', message: 'You received $500 from John Doe', time: '1 day ago' },
    { id: 3, type: 'card', message: 'Your new credit card has been shipped', time: '3 days ago' },
  ]);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <Bell className={darkMode ? "text-yellow-400" : "text-yellow-500"} />;
      case 'transaction':
        return <DollarSign className={darkMode ? "text-green-400" : "text-green-500"} />;
      case 'card':
        return <CreditCard className={darkMode ? "text-blue-400" : "text-blue-500"} />;
      default:
        return <Bell className={darkMode ? "text-gray-400" : "text-gray-500"} />;
    }
  };

  return (
    <div className={`space-y-4 p-4 sm:p-6`}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`shadow overflow-hidden rounded-lg p-4 sm:p-6 flex items-start 
                      ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}
        >
          <div className="flex-shrink-0 mr-4 sm:mr-6">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{notification.message}</p>
            <p className="text-sm">{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationsView;
