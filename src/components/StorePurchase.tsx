import React, { useState, KeyboardEvent } from 'react';
import { CreditCard, QrCode, X } from 'lucide-react';

interface QRCode {
  id: number;
  name: string;
  distance?: string;
  price?: number;
}

interface StorePurchaseProps {
  darkMode: boolean;
}

const StorePurchase: React.FC<StorePurchaseProps> = ({ darkMode }) => {
  const [scanningMode, setScanningMode] = useState<'store' | 'item' | null>(null);
  const [selectedStore, setSelectedStore] = useState<QRCode | null>(null);
  const [cart, setCart] = useState<QRCode[]>([]);
  const [total, setTotal] = useState(0);

  const qrCodes: Record<string, QRCode> = {
    store123: { id: 1, name: 'Grocery Store', distance: '0.5 miles' },
    store456: { id: 2, name: 'Electronics Shop', distance: '1.2 miles' },
    item789: { id: 1, name: 'Milk', price: 3.99 },
    itemABC: { id: 2, name: 'Bread', price: 2.49 },
  };

  const startScanning = (mode: 'store' | 'item') => {
    setScanningMode(mode);
  };

  const handleScan = (qrCode: string) => {
    const scannedData = qrCodes[qrCode];
    if (scanningMode === 'store' && scannedData && 'distance' in scannedData) {
      setSelectedStore(scannedData);
      setScanningMode(null);
    } else if (scanningMode === 'item' && scannedData && 'price' in scannedData) {
      addToCart(scannedData);
      setScanningMode(null);
    } else {
      alert('Invalid QR code');
    }
  };

  const addToCart = (item: QRCode) => {
    setCart((prevCart) => [...prevCart, item]);
    setTotal((prevTotal) => prevTotal + (item.price ?? 0));
  };

  const removeFromCart = (item: QRCode) => {
    setCart((prevCart) => prevCart.filter((i) => i.id !== item.id));
    setTotal((prevTotal) => prevTotal - (item.price ?? 0));
  };

  const processPayment = () => {
    alert(`Payment of $${total.toFixed(2)} processed successfully!`);
    setCart([]);
    setTotal(0);
    setSelectedStore(null);
  };

  const QRScanner: React.FC<{ onScan: (qrCode: string) => void }> = ({ onScan }) => (
    <div className={`p-4 rounded-lg text-center ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-900'}`}>
      <p className="mb-2">Scanning QR Code...</p>
      <input
        type="text"
        placeholder="Enter QR code"
        className={`p-2 border rounded ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-900 border-gray-300'}`}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            onScan(e.currentTarget.value);
            e.currentTarget.value = '';
          }
        }}
      />
      <p className="mt-2 text-sm">(In a real app, this would use the device's camera)</p>
    </div>
  );

  return (
    <div className={`space-y-6 ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-transparent text-gray-900'} p-4 sm:p-6 lg:p-8`}>
      {!selectedStore ? (
        <div className={`shadow overflow-hidden sm:rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 sm:p-6`}>
          <div className={`px-4 py-5 sm:px-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
            <h3 className={`text-lg leading-6 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Select a Store</h3>
          </div>
          <div className={`border-t px-4 py-5 sm:p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            {scanningMode === 'store' ? (
              <QRScanner onScan={handleScan} />
            ) : (
              <button
                onClick={() => startScanning('store')}
                className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${darkMode ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
              >
                <QrCode size={18} className="mr-2" />
                Scan Store QR Code
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={`shadow overflow-hidden sm:rounded-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-4 sm:p-6`}>
          <div className={`px-4 py-5 sm:px-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
            <h3 className={`text-lg leading-6 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{selectedStore.name}</h3>
            <p className={`mt-1 max-w-2xl text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedStore.distance}</p>
          </div>
          <div className={`border-t px-4 py-5 sm:p-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className={`text-md font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'} mb-2`}>Scan Items</h4>
                {scanningMode === 'item' ? (
                  <QRScanner onScan={handleScan} />
                ) : (
                  <button
                    onClick={() => startScanning('item')}
                    className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${darkMode ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' : 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
                  >
                    <QrCode size={18} className="mr-2" />
                    Scan Item QR Code
                  </button>
                )}
              </div>
              <div>
                <h4 className={`text-md font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'} mb-2`}>Your Cart</h4>
                <ul className={`divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                  {cart.map((item) => (
                    <li key={item.id} className={`py-2 flex justify-between items-center ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-900'} rounded-lg`}>
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>{item.name} - ${item.price?.toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item)}
                        className={`inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md ${darkMode ? 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'}`}
                      >
                        <X size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>Total: ${total.toFixed(2)}</p>
                  <button
                    onClick={processPayment}
                    className={`mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md ${darkMode ? 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' : 'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`}
                  >
                    <CreditCard size={18} className="mr-2" />
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePurchase;
