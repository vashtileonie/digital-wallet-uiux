import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface Account {
  id: number;
  name: string;
  balance: number;
  number: string;
}

function AccountsView() {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: 'Checking Account', balance: 2500, number: '****1234' },
    { id: 2, name: 'Savings Account', balance: 10000, number: '****5678' },
  ]);

  const handleAddAccount = () => {
    const name = prompt("Enter account name:");
    if (name) {
      const newAccount: Account = {
        id: accounts.length + 1,
        name,
        balance: 0,
        number: `****${Math.floor(1000 + Math.random() * 9000)}`,
      };
      setAccounts([...accounts, newAccount]);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {accounts.map((account) => (
        <div
          key={account.id}
          className="bg-white dark:bg-card-dark-mode overflow-hidden shadow rounded-lg"
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-900 dark:text-dark-mode">
              {account.name}
            </h3>
            <p className="mt-1 text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-dark-mode">
              ${account.balance.toFixed(2)}
            </p>
            <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
              Account number: {account.number}
            </p>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddAccount}
        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-200 flex items-center justify-center"
      >
        <PlusCircle className="mr-2" size={18} />
        Add New Account
      </button>
    </div>
  );
}

export default AccountsView;
