import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartModal = ({ isOpen, onClose }) => {
  const [items, setItems] = useState([]);

  // Load items from localStorage when modal opens
  useEffect(() => {
    if (isOpen) {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setItems(storedCart);
    }
  }, [isOpen]);

  // Save items back to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return; // prevent going below 1
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm  z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Корзина</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">Ваша корзина пуста</p>
              <Link
                to="/catalog"
                onClick={onClose}
                className="bg-yellow-400 text-white py-2 px-6 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Перейти к покупкам
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3 border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-yellow-600 font-semibold">
                        {item.price.toLocaleString()} сум
                      </p>
                      {item.size && <p className="text-xs text-gray-500">Размер: {item.size}</p>}
                      {item.color && <p className="text-xs text-gray-500">Цвет: {item.color}</p>}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-gray-100 rounded text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Итого:</span>
                  <span className="font-bold text-lg">{totalPrice.toLocaleString()} сум</span>
                </div>
                
                <div className="space-y-2">
                  <Link
                    to="/cart"
                    onClick={onClose}
                    className="block w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-center hover:bg-gray-200 transition-colors"
                  >
                    Просмотреть корзину
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={onClose}
                    className="block w-full bg-yellow-400 text-white py-3 px-4 rounded-lg text-center hover:bg-yellow-500 transition-colors"
                  >
                    Оформить заказ
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
