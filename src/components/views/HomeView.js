"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function HomeView() {
    const [balance, setBalance] = (0, react_1.useState)(5000);
    const handleSendMoney = () => {
        const amount = parseFloat(prompt("Enter amount to send:") || '');
        if (amount > 0 && amount <= balance) {
            setBalance(prevBalance => prevBalance - amount);
            alert(`$${amount} sent successfully!`);
        }
        else {
            alert("Invalid amount or insufficient funds.");
        }
    };
    const handleRequestMoney = () => {
        const amount = parseFloat(prompt("Enter amount to request:") || '');
        if (amount > 0) {
            alert(`Request for $${amount} sent successfully!`);
        }
        else {
            alert("Invalid amount.");
        }
    };
    const handleAddFunds = () => {
        const amount = parseFloat(prompt("Enter amount to add:") || '');
        if (amount > 0) {
            setBalance(prevBalance => prevBalance + amount);
            alert(`$${amount} added successfully!`);
        }
        else {
            alert("Invalid amount.");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-5 sm:p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Total Balance" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-3xl font-bold", children: ["$", balance.toFixed(2)] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-5 sm:p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900 mb-4", children: "Quick Actions" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: handleSendMoney, className: "w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpRight, { className: "mr-2", size: 18 }), "Send Money"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: handleRequestMoney, className: "w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ArrowDownLeft, { className: "mr-2", size: 18 }), "Request Money"] }), (0, jsx_runtime_1.jsxs)("button", { onClick: handleAddFunds, className: "w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Wallet, { className: "mr-2", size: 18 }), "Add Funds"] })] })] }) })] }));
}
exports.default = HomeView;
