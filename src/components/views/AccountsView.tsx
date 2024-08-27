import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Account {
  id: number;
  name: string;
  balance: number;
  number: string;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryDate: string;
}

function AccountsView() {
  const [account, setAccount] = useState<Account | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState<string>("");

  useEffect(() => {
    // Fetch the balance of the savings account
    fetch('http://localhost:3000/api/wallet/balance')
      .then(response => response.json())
      .then(data => {
        const savingsAccount: Account = {
          id: 1,
          name: 'Savings Account',
          balance: data.balance,
          number: '****5678',
        };
        setAccount(savingsAccount);
      })
      .catch(error => console.error('Error fetching balance:', error));

    // Fetch the list of payment methods
    fetch('http://localhost:3000/api/wallet/payment-methods')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched payment methods: ', data); // Log the fetched data
        const methods = data.map((method: any) => ({
          id: method.id,
          type: method.type,
          last4: method.card.last4,
          expiryDate: `${method.card.expMonth}/${method.card.expYear}`,
        }));
        setPaymentMethods(methods);
      })
      .catch(error => console.error('Error fetching payment methods:', error));
  }, []);

  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod) return;

    fetch('http://localhost:3000/api/wallet/add-payment-method', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentMethodId: newPaymentMethod,
      }),
    })
      .then(response => response.json())
      .then(data => {
        setPaymentMethods([
          ...paymentMethods,
          {
            id: data.id,
            type: data.type,
            last4: data.card.last4,
            expiryDate: `${data.card.expMonth}/${data.card.expYear}`,
          },
        ]);
        setNewPaymentMethod("");
      })
      .catch(error => console.error('Error adding payment method:', error));
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {account && (
        <div className="bg-white dark:bg-card-dark-mode overflow-hidden shadow rounded-lg">
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
      )}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-dark-mode">Payment Methods</h3>
        {paymentMethods.length > 0 ? (
          <ul className="mt-4 space-y-4">
            {paymentMethods.map((method) => (
              <li key={method.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-900 dark:text-dark-mode">****{method.last4}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Expires {method.expiryDate}</p>
                </div>
                <button
                  className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-600"
                  onClick={() => setPaymentMethods(paymentMethods.filter(pm => pm.id !== method.id))}
                >
                  <Trash2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500 dark:text-gray-400">No payment methods available.</p>
        )}
        <div className="mt-4 flex">
          <input
            type="text"
            value={newPaymentMethod}
            onChange={(e) => setNewPaymentMethod(e.target.value)}
            placeholder="Payment Method ID"
            className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddPaymentMethod}
            className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle size={18} className="mr-2" />
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountsView;
