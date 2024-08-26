import React, { useState, useEffect } from 'react';

interface Transaction {
  currency: string;
  status: string;
  _id: string;
  type: string;
  amount: number;
  fromWallet: string | null;
  toWallet: string;
  stripePaymentIntentId: string | null;
  createdAt: string;
}

interface TransactionsViewProps {
  darkMode: boolean;
}

function TransactionsView({ darkMode }: TransactionsViewProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const response = await fetch('http://localhost:3000/api/wallet/transactions', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error('Failed to fetch transactions');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={`shadow overflow-hidden sm:rounded-lg mx-4 my-6 sm:mx-8 sm:my-8`}>
      <div className={`px-4 py-5 sm:px-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className="text-lg leading-6 font-medium">Transaction History</h3>
      </div>
      <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className={`bg-gray-50 px-4 py-5 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b border-gray-200`}>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</span>
                  <span className="text-sm text-gray-500">{transaction.status}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium">{transaction.amount} {transaction.currency}</span>
                  <span className="text-sm text-gray-500">{new Date(transaction.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TransactionsView;
