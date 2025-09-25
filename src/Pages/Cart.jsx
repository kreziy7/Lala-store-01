import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
        <ShoppingBag className="h-24 w-24 text-gray-300 mb-8" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Ваша корзина пуста</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Добавьте товары в корзину, чтобы они появились здесь
        </p>
        <Link
          to="/catalog"
          className="bg-yellow-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
        >
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Очистить корзину
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-yellow-600 font-semibold text-lg">
                      {item.price.toLocaleString()} сум
                    </p>
                    {item.size && (
                      <p className="text-sm text-gray-500">Размер: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-500">Цвет: {item.color}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {(item.price * item.quantity).toLocaleString()} сум
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-2 text-red-500 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Итого по заказу</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{totalPrice.toLocaleString()} сум</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>К оплате</span>
                  <span>{totalPrice.toLocaleString()} сум</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  to="/checkout"
                  className="block w-full bg-yellow-400 text-white py-3 px-4 rounded-lg text-center font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Оформить заказ
                </Link>
                <Link
                  to="/quick-order"
                  className="block w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-center font-semibold hover:bg-gray-200 transition-colors"
                >
                  Быстрый заказ
                </Link>
                <Link
                  to="/catalog"
                  className="block w-full text-center text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Продолжить покупки
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;