"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function NotificationsView() {
    const [notifications, setNotifications] = (0, react_1.useState)([
        { id: 1, type: 'alert', message: 'Low balance in your checking account', time: '2 hours ago' },
        { id: 2, type: 'transaction', message: 'You received $500 from John Doe', time: '1 day ago' },
        { id: 3, type: 'card', message: 'Your new credit card has been shipped', time: '3 days ago' },
    ]);
    const getIcon = (type) => {
        switch (type) {
            case 'alert':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "text-yellow-500" });
            case 'transaction':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.DollarSign, { className: "text-green-500" });
            case 'card':
                return (0, jsx_runtime_1.jsx)(lucide_react_1.CreditCard, { className: "text-blue-500" });
            default:
                return (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { className: "text-gray-500" });
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "space-y-4", children: notifications.map((notification) => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white shadow overflow-hidden sm:rounded-lg p-4 flex items-start", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-shrink-0 mr-4", children: getIcon(notification.type) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1 min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium text-gray-900", children: notification.message }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-gray-500", children: notification.time })] })] }, notification.id))) }));
}
exports.default = NotificationsView;
