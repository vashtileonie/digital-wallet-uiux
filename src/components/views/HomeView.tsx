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
      const paymentMethodId = prompt("Enter payment method ID (e.g., pm_card_mastercard):");
      if (paymentMethodId) {
        try {
          const response = await fetch('http://localhost:3000/api/wallet/deposit', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${userToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount, paymentMethodId }),
          });
  
          if (response.ok) {
           
            setBalance(prevBalance => prevBalance + amount);
            alert(`$${amount} deposited successfully using payment method ${paymentMethodId}!`);
            console.log('Funds deposited successfully');
          } else {
            console.error('Failed to add funds, status code:', response.status);
            alert(`Failed to add funds. Try again`);
          }
        } catch (error) {
          console.error('Error adding funds:', error);
        }
      } else {
        alert("Payment method ID is required.");
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

  const handlePayNow = async () => {
    const amount = parseFloat(prompt("Enter amount to pay:") || '');
    if (amount > 0) {
      try {
        // Initiate the payment intent
        const response = await fetch('http://localhost:3000/api/wallet/create-payment-intent', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const {paymentIntentId } = data;
          alert(`Payment of $${amount} initiated successfully!`);
  
          // Prompt for confirmation
          const paymentMethodId = prompt("Enter payment method ID (e.g., pm_card_mastercard):");
          if (paymentMethodId) {
            // Confirm the payment intent
            const confirmResponse = await fetch('http://localhost:3000/api/wallet/confirm-payment-intent', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ paymentIntentId, paymentMethodId }),
            });
  
            if (confirmResponse.ok) {
              alert(`Payment of $${amount} confirmed successfully!`);
              setBalance(prevBalance => prevBalance - amount);
            } else {
              const errorData = await confirmResponse.json();
              console.error('Failed to confirm payment, status code:', confirmResponse.status, 'Error:', errorData);
              alert('Failed to confirm payment. Please check your payment details and try again.');
            }
          } else {
            alert("Payment method ID is required.");
          }
        } else {
          const errorData = await response.json();
          console.error('Failed to initiate payment, status code:', response.status, 'Error:', errorData);
          alert('Failed to initiate payment. Please try again later.');
        }
      } catch (error) {
        console.error('Error initiating payment:', error);
      }
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
            <p className={`${darkMode ? 'text-grey-600' : 'text-grey-200'} text-sm`}>Card</p>
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
            <button onClick={handlePayNow} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center">
              <ArrowDownLeft className="mr-2" size={18} />
              Pay Now
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
