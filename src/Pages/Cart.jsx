import React from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import pushti from "../assets/pushti.png";
import kok from "../assets/kok.png";
import pushti2 from "../assets/pushti2.png";
import mushuk from "../assets/mushuk.png";
import fruktik from "../assets/fruktik.png";
import pushti3 from "../assets/pushti3.png";

// Sample cart items (in real app, this comes from context)
const cartItems = [
  {
    id: 1,
    image: pushti,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    composition: 'Скула 20% Размер 74',
    price: 349,
    quantity: 1,
    total: 349,
  },
  {
    id: 2,
    image: kok,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    composition: 'Скула 20% Размер 74',
    price: 349,
    quantity: 1,
    total: 349,
  },
  {
    id: 3,
    image: pushti2,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    composition: 'Скула 20% Размер 74',
    price: 500,
    quantity: 1,
    total: 500,
  },
];

// Sample previously viewed products
const previouslyViewed = [
  { id: 4, name: 'Боди без рукавов "ФРУК-ТИК", розовый', price: 349, image: mushuk },
  { id: 5, name: 'Боди без рукавов "ФРУК-ТИК", розовый', price: 349, image: fruktik },
  { id: 6, name: 'Боди без рукавов "ФРУК-ТИК", розовый', price: 349, image: pushti3 },
  { id: 7, name: 'Боди без рукавов "ДРУГ-ТИК", розовый', price: 349, image: pushti },
  { id: 8, name: 'Боди без рукавов "ФРУК-ТИК", розовый', price: 349, image: kok },
  { id: 9, name: 'Боди без рукавов "ФРУК-ТИК", розовый', price: 349, image: pushti2 },
];

const Cart = () => {
  const { removeFromCart, updateQuantity } = useCart(); // Assuming these functions exist in CartContext

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const discount = 232; // Sample discount
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Корзина</h1>
        
        {/* Cart Items Table */}
        <div className="bg-white rounded-lg shadow-md mb-8 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left"><input type="checkbox" className="accent-blue-500" /></th>
                <th className="p-4 text-left">Товар</th>
                <th className="p-4 text-left">Цена</th>
                <th className="p-4 text-left">Количество</th>
                <th className="p-4 text-left">В сумме</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t"
                >
                  <td className="p-4"><input type="checkbox" className="accent-blue-500" /></td>
                  <td className="p-4 flex items-center space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.composition}</p>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{item.price} P</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-gray-200 rounded"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-gray-200 rounded"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{item.total} P</td>
                  <td className="p-4">
                    <button onClick={() => removeFromCart(item.id)}>
                      <X className="h-5 w-5 text-gray-500 hover:text-red-500" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Totals */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Итого:</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Общая цена товаров:</span>
              <span>{subtotal} P</span>
            </div>
            <div className="flex justify-between text-red-500">
              <span>Скидка:</span>
              <span>-{discount} P</span>
            </div>
            <div className="flex justify-between font-bold text-xl border-t pt-2">
              <span>К оплате:</span>
              <span>{total} P</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-yellow-400 text-gray-800 py-3 rounded-lg font-bold hover:bg-yellow-500 transition">
            ОФОРМИТЬ ЗАКАЗ
          </button>
          <button className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition">
            БЫСТРАЯ ЗАКАЗ
          </button>
        </div>
        
        {/* Previously Viewed */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Ранее вы смотрели</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {previouslyViewed.map(product => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                <img src={product.image} alt={product.name} className="w-full h-40 object-contain mb-2" />
                <h3 className="text-sm font-medium text-gray-800 mb-1">{product.name}</h3>
                <p className="text-blue-600 font-bold mb-2">{product.price} P/шт</p>
                <button className="w-full bg-yellow-400 text-gray-800 py-2 rounded-full text-sm font-bold hover:bg-yellow-500 transition">
                  КУПИТЬ В 1 КЛИК
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;