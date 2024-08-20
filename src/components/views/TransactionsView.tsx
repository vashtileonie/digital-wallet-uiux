import React, { useState, ChangeEvent } from 'react';
import { Search } from 'lucide-react';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
}

interface TransactionsViewProps {
  darkMode: boolean;
}

const TransactionsView = ({ darkMode }: TransactionsViewProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2023-07-01', description: 'Grocery Store', amount: -75.5 },
    { id: 2, date: '2023-07-02', description: 'Salary Deposit', amount: 3000 },
    { id: 3, date: '2023-07-03', description: 'Electric Bill', amount: -120 },
    { id: 4, date: '2023-07-04', description: 'Online Purchase', amount: -50.25 },
    { id: 5, date: '2023-07-05', description: 'Restaurant', amount: -45 },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
  );

  return (
    <div className={`space-y-4 p-4`}>
      <div className={`flex items-center shadow rounded-lg p-2 sm:p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Search className={`text-gray-400 mr-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} size={20} />
        <input
          type="text"
          placeholder="Search transactions..."
          className={`flex-grow outline-none ${darkMode ? 'bg-gray-700 text-gray-300 placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'}`}
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={`shadow overflow-hidden sm:rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <table className={`min-w-full divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
          <thead className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <tr>
              <th className={`px-4 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider sm:px-6 sm:py-3`}>Date</th>
              <th className={`px-4 py-2 text-left text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider sm:px-6 sm:py-3`}>Description</th>
              <th className={`px-4 py-2 text-right text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'} uppercase tracking-wider sm:px-6 sm:py-3`}>Amount</th>
            </tr>
          </thead>
          <tbody className={`${darkMode ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className={`${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} sm:px-6 sm:py-4`}>{transaction.date}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'} sm:px-6 sm:py-4`}>{transaction.description}</td>
                <td className={`px-4 py-2 whitespace-nowrap text-sm text-right ${transaction.amount < 0 ? (darkMode ? 'text-red-500' : 'text-red-600') : (darkMode ? 'text-green-400' : 'text-green-600')} sm:px-6 sm:py-4`}>
                  {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsView;
