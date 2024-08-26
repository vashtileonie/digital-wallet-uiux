import React, { useState, useEffect } from 'react';
import { Bell, DollarSign, CreditCard } from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'transaction' | 'card';
  message: string;
  time: string;
}

interface NotificationsViewProps {
  darkMode: boolean;
  userToken: string; // Add userToken for API authentication
}

function NotificationsView({ darkMode, userToken }: NotificationsViewProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const storedFirstName = localStorage.getItem('firstName') || 'John';
  const storedLastName = localStorage.getItem('lastName') || 'Doe';


  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userToken) {
        console.error('User token is not available');
        return;
      }

      const apiUrl = `http://localhost:3000/api/wallet/transactions`;

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const transactions = await response.json();
          const transactionNotifications = transactions
            .filter((txn: any) => txn.type === 'transfer') 
            .map((txn: any) => ({
              id: txn._id,
              type: 'transaction',
              message: `You received $${txn.amount} from ${storedFirstName} ${storedLastName}`,
              time: new Date(txn.createdAt).toLocaleString(), // Format time as needed
            }));
          setNotifications(transactionNotifications);
        } else {
          console.error('Failed to fetch transactions, status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions(); // Fetch transactions on component mount
  }, [userToken]);

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
