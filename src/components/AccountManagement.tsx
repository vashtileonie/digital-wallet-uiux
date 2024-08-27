import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { PlusCircle, Trash2 } from "lucide-react";

interface Account {
  id: number;
  type: "Checking" | "Savings";
  name: string;
  balance: number;
}

interface PaymentMethod {
  id: number;
  type: "Credit Card";
  last4: string;
  expiryDate: string;
}

interface AccountManagementProps {
  darkMode: boolean;
  userToken: string | null;
}

const AccountManagement = ({ darkMode, userToken }: AccountManagementProps) => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, type: "Savings", name: "Debit", balance: 0 },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [newAccountName, setNewAccountName] = useState<string>("");
  const [newAccountType, setNewAccountType] = useState<"Checking" | "Savings">("Checking");
  const [newPaymentMethodId, setNewPaymentMethodId] = useState<string>("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!userToken) {
        console.error("No user token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/wallet/balance", {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAccounts((prevAccounts) =>
            prevAccounts.map((account) =>
              account.id === 1 ? { ...account, balance: data.balance } : account
            )
          );
        } else {
          console.error("Failed to fetch balance:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [userToken]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!userToken) {
        console.error("No user token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/wallet/payment-methods", {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched payment methods:", data);

          const methods: PaymentMethod[] = Array.isArray(data)
            ? data.map((method: any) => ({
                id: method.id,
                type: method.card.brand, 
                last4: method.card.last4,
                expiryDate: `${method.card.expMonth}/${method.card.expYear}`,
              }))
            : [];

          setPaymentMethods(methods);
        } else {
          console.error("Failed to fetch payment methods:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching payment methods:", error);
      }
    };

    fetchPaymentMethods();
  }, [userToken]);

  const handleAddAccount = (e: FormEvent) => {
    e.preventDefault();
    if (newAccountName) {
      setAccounts([
        ...accounts,
        {
          id: accounts.length + 1,
          type: newAccountType,
          name: newAccountName,
          balance: 0,
        },
      ]);
      setNewAccountName("");
      setNewAccountType("Checking");
    }
  };

  const handleAddPaymentMethod = async (e: FormEvent) => {
    e.preventDefault();
    if (newPaymentMethodId) {
      if (!userToken) {
        console.error("No user token found");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/wallet/add-payment-method", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({
            paymentMethodId: newPaymentMethodId,
          }),
        });

        if (response.ok) {
          alert("Payment method added successfully");
          setNewPaymentMethodId("");// Clear the input field
          // Reload payment methods
          const fetchPaymentMethods = async () => {
            try {
              const response = await fetch("http://localhost:3000/api/wallet/payment-methods", {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                const data = await response.json();
                console.log("Fetched payment methods:", data); 

                const methods: PaymentMethod[] = Array.isArray(data.paymentMethods)
                  ? data.paymentMethods.map((method: any) => ({
                      id: method.id,
                      type: "Credit Card",
                      last4: method.last4,
                      expiryDate: method.expiryDate,
                    }))
                  : [];
                  if (methods.length === 0) {
                    console.warn("No payment methods found after adding the new method.");
                }
                setPaymentMethods(methods);
              } else {
                console.error("Failed to fetch payment methods:", response.statusText);
              }
            } catch (error) {
              console.error("Error fetching payment methods:", error);
            }
          };
          await fetchPaymentMethods();
        } else {
          const errorData = await response.json();
            console.error("Failed to add payment method:", errorData.message);
            alert(errorData.message); 
        }
      } catch (error) {
        console.error("Error adding payment method:", error);
        alert("There was an error adding the payment method. Please try again.");
      }
    }
  };

  const handleRemoveAccount = (id: number) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const handleRemovePaymentMethod = async (id: number) => {
    if (!userToken) {
        console.error("No user token found");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/wallet/payment-methods/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.success) {
                // Update the frontend by removing the method
                setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
                alert("Payment method removed successfully.");
            } else {
                console.error("Failed to remove payment method:", data.message || "Unknown error");
                alert(data.message || "Failed to remove payment method.");
            }
        } else {
            const errorData = await response.json();
            console.error("Failed to remove payment method:", errorData.message || response.statusText);
            alert(errorData.message || "Failed to remove payment method.");
        }
    } catch (error) {
        console.error("Error removing payment method:", error);
        alert("There was an error removing the payment method. Please try again.");
    }
};



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
                    <button
                      onClick={() => handleRemoveAccount(account.id)}
                      className={`ml-2 ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <form
            onSubmit={handleAddAccount}
            className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2"
          >
            <input
              type="text"
              value={newAccountName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewAccountName(e.target.value)
              }
              placeholder="Account Name"
              className={`flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'} rounded-md`}
            />
            <select
              value={newAccountType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setNewAccountType(e.target.value as "Checking" | "Savings")
              }
              className={`mt-1 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'}`}
            >
              <option>Checking</option>
              <option>Savings</option>
            </select>
            <button
              type="submit"
              className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white ${darkMode ? 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500'} focus:outline-none focus:ring-2 focus:ring-offset-2`}
            >
              <PlusCircle size={18} className="mr-2" />
              Add Account
            </button>
          </form>
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
                    <p className={`text-sm font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} truncate`}>
                      {method.type} ending in {method.last4}
                    </p>
                    <p className="text-sm">Expires {method.expiryDate}</p>
                  </div>
                  <button
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    className={`ml-2 ${darkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-4 sm:px-6">
         <form
            onSubmit={handleAddPaymentMethod}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={newPaymentMethodId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPaymentMethodId(e.target.value)
              }
              placeholder="Payment Method ID"
              className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'border-gray-300'} rounded-md`}
            />
            <button
              type="submit"
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
            >
              Add Payment Method
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
