"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function ProfileView() {
    const [profile, setProfile] = (0, react_1.useState)({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
    });
    const [isEditing, setIsEditing] = (0, react_1.useState)(false);
    const handleEdit = () => {
        setIsEditing(true);
    };
    const handleSave = () => {
        setIsEditing(false);
        alert('Profile updated successfully!');
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => (Object.assign(Object.assign({}, prevProfile), { [name]: value })));
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "bg-white shadow overflow-hidden sm:rounded-lg", children: [(0, jsx_runtime_1.jsx)("div", { className: "px-4 py-5 sm:px-6", children: (0, jsx_runtime_1.jsx)("h3", { className: "text-lg leading-6 font-medium text-gray-900", children: "User Profile" }) }), (0, jsx_runtime_1.jsx)("div", { className: "border-t border-gray-200", children: (0, jsx_runtime_1.jsxs)("dl", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6", children: [(0, jsx_runtime_1.jsxs)("dt", { className: "text-sm font-medium text-gray-500 flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "mr-2", size: 18 }), " Full name"] }), (0, jsx_runtime_1.jsx)("dd", { className: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2", children: isEditing ? ((0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", value: profile.name, onChange: handleChange, className: "w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" })) : (profile.name) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6", children: [(0, jsx_runtime_1.jsxs)("dt", { className: "text-sm font-medium text-gray-500 flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "mr-2", size: 18 }), " Email address"] }), (0, jsx_runtime_1.jsx)("dd", { className: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2", children: isEditing ? ((0, jsx_runtime_1.jsx)("input", { type: "email", name: "email", value: profile.email, onChange: handleChange, className: "w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" })) : (profile.email) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6", children: [(0, jsx_runtime_1.jsxs)("dt", { className: "text-sm font-medium text-gray-500 flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "mr-2", size: 18 }), " Phone number"] }), (0, jsx_runtime_1.jsx)("dd", { className: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2", children: isEditing ? ((0, jsx_runtime_1.jsx)("input", { type: "tel", name: "phone", value: profile.phone, onChange: handleChange, className: "w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" })) : (profile.phone) })] })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 py-3 sm:px-6 flex justify-end", children: isEditing ? ((0, jsx_runtime_1.jsx)("button", { onClick: handleSave, className: "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200", children: "Save" })) : ((0, jsx_runtime_1.jsx)("button", { onClick: handleEdit, className: "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200", children: "Edit" })) })] }));
}
exports.default = ProfileView;
