"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function AccountsView() {
    const [accounts, setAccounts] = (0, react_1.useState)([
        { id: 1, name: 'Checking Account', balance: 2500, number: '****1234' },
        { id: 2, name: 'Savings Account', balance: 10000, number: '****5678' },
    ]);
    const handleAddAccount = () => {
        const name = prompt("Enter account name:");
        if (name) {
            const newAccount = {
                id: accounts.length + 1,
                name,
                balance: 0,
                number: `****${Math.floor(1000 + Math.random() * 9000)}`,
            };
            setAccounts([...accounts, newAccount]);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [accounts.map((account) => ((0, jsx_runtime_1.jsx)("div", { className: "bg-white overflow-hidden shadow rounded-lg", children: (0, jsx_runtime_1.jsxs)("div", { className: "px-4 py-5 sm:p-6", children: [(0, jsx_runtime_1.jsx)("h3", { className: "text-lg font-medium text-gray-900", children: account.name }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-3xl font-semibold text-gray-900", children: ["$", account.balance.toFixed(2)] }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-1 text-sm text-gray-500", children: ["Account number: ", account.number] })] }) }, account.id))), (0, jsx_runtime_1.jsxs)("button", { onClick: handleAddAccount, className: "w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, { className: "mr-2", size: 18 }), "Add New Account"] })] }));
}
exports.default = AccountsView;
