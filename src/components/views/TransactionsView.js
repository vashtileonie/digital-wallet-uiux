"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function TransactionsView() {
    const [transactions, setTransactions] = (0, react_1.useState)([
        { id: 1, date: '2023-07-01', description: 'Grocery Store', amount: -75.5 },
        { id: 2, date: '2023-07-02', description: 'Salary Deposit', amount: 3000 },
        { id: 3, date: '2023-07-03', description: 'Electric Bill', amount: -120 },
        { id: 4, date: '2023-07-04', description: 'Online Purchase', amount: -50.25 },
        { id: 5, date: '2023-07-05', description: 'Restaurant', amount: -45 },
    ]);
    const [searchTerm, setSearchTerm] = (0, react_1.useState)('');
    const filteredTransactions = transactions.filter((transaction) => transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center bg-white shadow rounded-lg p-2", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "text-gray-400 mr-2", size: 20 }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search transactions...", className: "flex-grow outline-none", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white shadow overflow-hidden sm:rounded-lg", children: (0, jsx_runtime_1.jsxs)("table", { className: "min-w-full divide-y divide-gray-200", children: [(0, jsx_runtime_1.jsx)("thead", { className: "bg-gray-50", children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Date" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Description" }), (0, jsx_runtime_1.jsx)("th", { className: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider", children: "Amount" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredTransactions.map((transaction) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500", children: transaction.date }), (0, jsx_runtime_1.jsx)("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900", children: transaction.description }), (0, jsx_runtime_1.jsxs)("td", { className: `px-6 py-4 whitespace-nowrap text-sm text-right ${transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}`, children: [transaction.amount < 0 ? '-' : '', "$", Math.abs(transaction.amount).toFixed(2)] })] }, transaction.id))) })] }) })] }));
}
exports.default = TransactionsView;
