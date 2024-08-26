import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';

interface HomeViewProps {
  darkMode: boolean;
  userToken: string;
}

function HomeView({ darkMode, userToken }: HomeViewProps) {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!userToken) {
        console.error('User token is not available');
        return;
      }

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
          setBalance(data.balance);
        } else {
          console.error('Failed to fetch balance, status code:', response.status);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance(); // Fetch balance on component mount

    const intervalId = setInterval(fetchBalance, 30000); // Poll every 30 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [userToken]);

  const handleAddFunds = async () => {
    const amount = parseFloat(prompt("Enter amount to add:") || '');
    if (amount > 0) {
      try {
        const response = await fetch('http://localhost:3000/api/wallet/deposit', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });

        if (response.ok) {
          const data = await response.json();
          setBalance(prevBalance => prevBalance + amount);
          alert(`$${amount} added successfully!`);
        } else {
          console.error('Failed to add funds, status code:', response.status);
        }
      } catch (error) {
        console.error('Error adding funds:', error);
      }
    } else {
      alert("Invalid amount.");
    }
  };

  const handleSendMoney = async () => {
    const amount = parseFloat(prompt("Enter amount to send:") || '');
    const toUserId = prompt("Enter recipient user ID:");

    if (amount > 0 && amount <= balance && toUserId) {
      try {
        const response = await fetch('http://localhost:3000/api/wallet/transfer', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ toUserId, amount }),
        });

        if (response.ok) {
          const data = await response.json();
          setBalance(prevBalance => prevBalance - amount);
          alert(`$${amount} sent successfully to user ${toUserId}!`);
        } else {
          console.error('Failed to send money, status code:', response.status);
        }
      } catch (error) {
        console.error('Error sending money:', error);
      }
    } else {
      alert("Invalid amount, insufficient funds, or recipient user ID missing.");
    }
  };

  const handleRequestMoney = () => {
    const amount = parseFloat(prompt("Enter amount to request:") || '');
    if (amount > 0) {
      alert(`Request for $${amount} sent successfully!`);
    } else {
      alert("Invalid amount.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 sm:p-6">
      <div className={`${darkMode ? 'bg-card-dark-gradient text-light-mode' : 'bg-card-light-gradient text-dark-mode'} shadow-lg rounded-lg p-4 sm:p-6 relative`}>
        <div className="mb-4">
          <h3 className="text-base font-semibold mb-1">Total Balance</h3>
          <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        </div>
        <div className="flex justify-end items-center">
          <div className="absolute bottom-4 right-4 text-right italic">
            <p className={`${darkMode ? 'text-grey-600' : 'text-grey-200'} text-sm`}>Visa Card</p>
          </div>
        </div>
      </div>
      <div className={`${darkMode ? 'bg-card-dark-mode text-dark-mode' : 'bg-card-light-mode text-light-mode'} overflow-hidden shadow rounded-lg p-4 sm:p-6`}>
        <div>
          <h3 className="text-lg font-medium mb-2 lg:mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button onClick={handleSendMoney} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <ArrowUpRight className="mr-2" size={18} />
              Send Money
            </button>
            <button onClick={handleRequestMoney} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <ArrowDownLeft className="mr-2" size={18} />
              Request Money
            </button>
            <button onClick={handleAddFunds} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <Wallet className="mr-2" size={18} />
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
