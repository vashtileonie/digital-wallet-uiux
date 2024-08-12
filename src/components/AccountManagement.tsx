import React, { useState, ChangeEvent, FormEvent } from "react";
import { PlusCircle, CreditCard, Building, Trash2 } from "lucide-react";

// Define the types for your state
interface Account {
  id: number;
  type: "Checking" | "Savings";
  name: string;
  balance: number;
}

interface LinkedBank {
  id: number;
  name: string;
  accountNumber: string;
}

interface PaymentMethod {
  id: number;
  type: "Credit Card";
  last4: string;
  expiryDate: string;
}

const AccountManagement = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, type: "Checking", name: "Main Checking", balance: 5000 },
    { id: 2, type: "Savings", name: "Emergency Fund", balance: 10000 },
  ]);

  const [linkedBanks, setLinkedBanks] = useState<LinkedBank[]>([
    { id: 1, name: "Bank of America", accountNumber: "****1234" },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: "Credit Card", last4: "5678", expiryDate: "12/24" },
  ]);

  const [newAccountName, setNewAccountName] = useState<string>("");
  const [newAccountType, setNewAccountType] = useState<"Checking" | "Savings">(
    "Checking"
  );
  const [newBankName, setNewBankName] = useState<string>("");
  const [newBankAccountNumber, setNewBankAccountNumber] = useState<string>("");
  const [newCardNumber, setNewCardNumber] = useState<string>("");
  const [newCardExpiry, setNewCardExpiry] = useState<string>("");
  const [newCardCVV, setNewCardCVV] = useState<string>("");

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

  const handleLinkBank = (e: FormEvent) => {
    e.preventDefault();
    if (newBankName && newBankAccountNumber) {
      setLinkedBanks([
        ...linkedBanks,
        {
          id: linkedBanks.length + 1,
          name: newBankName,
          accountNumber: `****${newBankAccountNumber.slice(-4)}`,
        },
      ]);
      setNewBankName("");
      setNewBankAccountNumber("");
    }
  };

  const handleAddPaymentMethod = (e: FormEvent) => {
    e.preventDefault();
    if (newCardNumber && newCardExpiry && newCardCVV) {
      setPaymentMethods([
        ...paymentMethods,
        {
          id: paymentMethods.length + 1,
          type: "Credit Card",
          last4: newCardNumber.slice(-4),
          expiryDate: newCardExpiry,
        },
      ]);
      setNewCardNumber("");
      setNewCardExpiry("");
      setNewCardCVV("");
    }
  };

  const handleRemoveAccount = (id: number) => {
    setAccounts(accounts.filter((account) => account.id !== id));
  };

  const handleRemoveBank = (id: number) => {
    setLinkedBanks(linkedBanks.filter((bank) => bank.id !== id));
  };

  const handleRemovePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Your Accounts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {accounts.map((account) => (
              <li key={account.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {account.name}
                    </p>
                    <p className="text-sm text-gray-500">{account.type}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      ${account.balance.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemoveAccount(account.id)}
                      className="ml-2 text-red-600 hover:text-red-900"
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
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={newAccountName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewAccountName(e.target.value)
              }
              placeholder="Account Name"
              className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <select
              value={newAccountType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setNewAccountType(e.target.value as "Checking" | "Savings")
              }
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            >
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
            </select>
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Account
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Linked Bank Accounts
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {linkedBanks.map((bank) => (
              <li key={bank.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {bank.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Account: {bank.accountNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveBank(bank.id)}
                    className="text-red-600 hover:text-red-900"
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
            onSubmit={handleLinkBank}
            className="flex items-center space-x-2"
          >
            <input
              type="text"
              value={newBankName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewBankName(e.target.value)
              }
              placeholder="Bank Name"
              className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newBankAccountNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewBankAccountNumber(e.target.value)
              }
              placeholder="Account Number"
              className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Building size={18} className="mr-2" />
              Link Bank
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Payment Methods
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {paymentMethods.map((method) => (
              <li
                key={method.id}
                className="px-4 py-4 sm
"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {method.type}
                    </p>
                    <p className="text-sm text-gray-500">
                      Card ending in {method.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryDate}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemovePaymentMethod(method.id)}
                    className="text-red-600 hover
"
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
              value={newCardNumber}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCardNumber(e.target.value)
              }
              placeholder="Card Number"
              className="flex-grow shadow-sm focus
focus
block sm
border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newCardExpiry}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCardExpiry(e.target.value)
              }
              placeholder="MM/YY"
              className="flex-grow shadow-sm focus
focus
block sm
border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newCardCVV}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCardCVV(e.target.value)
              }
              placeholder="CVV"
              className="flex-grow shadow-sm focus focus block sm border-gray-300 rounded-md" />
            <button
              type="submit"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CreditCard size={18} className="mr-2" />
              Add Card
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
