import React from "react";

interface Account {
  id: number;
  type: "Checking" | "Savings";
  name: string;
  balance: number;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryDate: string;
}

interface AccountsViewProps {
  darkMode: boolean;
  accounts: Account[];
  paymentMethods: PaymentMethod[];
}

const AccountsView = ({ darkMode, accounts, paymentMethods }: AccountsViewProps) => {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className={`shadow overflow-hidden sm:rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="px-4 py-5 sm:px-6">
          <h3 className={`text-lg leading-6 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
            Your Accounts
          </h3>
        </div>
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {accounts.map((account) => (
              <li key={account.id} className={`px-4 py-4 sm:px-6 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex-grow">
                    <p className={`text-sm font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} truncate`}>
                      {account.name}
                    </p>
                    <p className="text-sm">{account.type}</p>
                  </div>
                  <div className="flex items-center mt-2 sm:mt-0">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${darkMode ? 'bg-green-900 text-green-400' : 'bg-green-100 text-green-800'}`}>
                      ${account.balance.toFixed(2)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`shadow overflow-hidden sm:rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="px-4 py-5 sm:px-6">
          <h3 className={`text-lg leading-6 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
            Payment Methods
          </h3>
        </div>
        <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {paymentMethods.map((method) => (
              <li key={method.id} className={`px-4 py-4 sm:px-6 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div className="flex-grow">
                    <p className={`text-sm font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      {method.type} ending in {method.last4}
                    </p>
                    <p className="text-sm">Expires on {method.expiryDate}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountsView;
