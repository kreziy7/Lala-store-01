import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Package, Settings, Heart, Bell, Edit, Save, X, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Profile = () => {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Load orders
    const userOrders = JSON.parse(localStorage.getItem('lalastore_orders') || '[]');
    setOrders(userOrders.filter(order => order.customerInfo.email === user?.email));

    // Load favorites (simulated from localStorage)
    const userFavorites = JSON.parse(localStorage.getItem(`favorites_${user?.email}`) || '[]');
    setFavorites(userFavorites);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = () => {
    // Simulate saving (in real app, call API)
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Ожидает обработки';
      case 'processing': return 'В обработке';
      case 'shipped': return 'Отправлен';
      case 'delivered': return 'Доставлен';
      case 'cancelled': return 'Отменен';
      default: return 'Неизвестно';
    }
  };

  const addToFavorites = (item) => {
    const newFavorites = [...favorites, item];
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user?.email}`, JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (id) => {
    const newFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(newFavorites);
    localStorage.setItem(`favorites_${user?.email}`, JSON.stringify(newFavorites));
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Sidebar with animation */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <User className="h-12 w-12 text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.firstName} {user?.lastName}</h2>
                <p className="text-gray-500 mt-1">{user?.email}</p>
              </div>

              <nav className="space-y-3">
                {[
                  { tab: 'profile', icon: User, label: 'Профиль' },
                  { tab: 'orders', icon: Package, label: 'Мои заказы' },
                  { tab: 'favorites', icon: Heart, label: 'Избранное' },
                ].map(({ tab, icon: Icon, label }) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                      activeTab === tab 
                        ? 'bg-yellow-50 text-yellow-600 shadow-md' 
                        : 'hover:bg-gray-50 hover:shadow-sm'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </button>
                ))}
                <Link
                  to="/subscriptions"
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-all duration-300 hover:shadow-sm"
                >
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Подписки</span>
                </Link>
                <Link
                  to="/change-password"
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left hover:bg-gray-50 transition-all duration-300 hover:shadow-sm"
                >
                  <Settings className="h-5 w-5" />
                  <span className="font-medium">Сменить пароль</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left hover:bg-red-50 text-red-600 transition-all duration-300 hover:shadow-sm"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Выйти</span>
                </button>
              </nav>
            </div>
          </motion.div>

          {/* Main Content with animation */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Личная информация</h1>
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-700 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                        <span>Редактировать</span>
                      </button>
                    ) : (
                      <div className="flex space-x-4">
                        <button 
                          onClick={saveProfile}
                          className="flex items-center space-x-2 bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                        >
                          <Save className="h-5 w-5" />
                          <span>Сохранить</span>
                        </button>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors"
                        >
                          <X className="h-5 w-5" />
                          <span>Отмена</span>
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Имя
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Фамилия
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Статистика</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div 
                        className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl shadow-md text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-3xl font-bold text-yellow-600">{orders.length}</div>
                        <div className="text-sm text-gray-600 mt-2">Всего заказов</div>
                      </motion.div>
                      <motion.div 
                        className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-md text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-3xl font-bold text-green-600">
                          {orders.filter(order => order.status === 'delivered').length}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">Доставлено</div>
                      </motion.div>
                      <motion.div 
                        className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-md text-center"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-3xl font-bold text-blue-600">
                          {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} сум
                        </div>
                        <div className="text-sm text-gray-600 mt-2">Общая сумма</div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  <h1 className="text-3xl font-bold text-gray-800 mb-8">Мои заказы</h1>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                      <p className="text-xl text-gray-500 mb-6">У вас пока нет заказов</p>
                      <Link
                        to="/catalog"
                        className="bg-yellow-400 text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Перейти к покупкам
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <motion.div 
                          key={order.id} 
                          className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 hover:shadow-md transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-between mb-6">
                            <div>
                              <h3 className="text-xl font-bold text-gray-800">Заказ #{order.id}</h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(order.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                              <p className="text-2xl font-bold text-gray-800 mt-2">{order.total.toLocaleString()} сум</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                            {order.items.slice(0, 4).map((item, index) => (
                              <motion.div 
                                key={index} 
                                className="flex items-center space-x-3 bg-white p-3 rounded-xl shadow-sm"
                                whileHover={{ scale: 1.05 }}
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div>
                                  <p className="font-medium text-sm text-gray-800">{item.name}</p>
                                  <p className="text-xs text-gray-500 mt-1">{item.quantity} шт. × {item.price} сум</p>
                                </div>
                              </motion.div>
                            ))}
                            {order.items.length > 4 && (
                              <div className="flex items-center justify-center text-gray-500 font-medium">
                                +{order.items.length - 4} товаров
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end space-x-4">
                            <button 
                              onClick={() => setSelectedOrder(order)}
                              className="bg-blue-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-600 transition-all duration-300"
                            >
                              Подробности
                            </button>
                            {order.status !== 'cancelled' && order.status !== 'delivered' && (
                              <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-red-600 transition-all duration-300">
                                Отменить
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'favorites' && (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  <h1 className="text-3xl font-bold text-gray-800 mb-8">Избранное</h1>
                  
                  {favorites.length === 0 ? (
                    <div className="text-center py-12">
                      <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                      <p className="text-xl text-gray-500 mb-6">Ваш список избранного пуст</p>
                      <Link
                        to="/catalog"
                        className="bg-yellow-400 text-white px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Перейти к каталогу
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {favorites.map((item) => (
                        <motion.div 
                          key={item.id} 
                          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-md p-6 text-center"
                          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                          transition={{ duration: 0.3 }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-contain mb-4 rounded-xl"
                          />
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                          <p className="text-yellow-600 font-bold text-xl mb-4">{item.price} сум</p>
                          <div className="flex justify-between space-x-4">
                            <button className="flex-1 bg-yellow-400 text-white px-4 py-2 rounded-xl font-medium hover:bg-yellow-500 transition-all duration-300">
                              В корзину
                            </button>
                            <button 
                              onClick={() => removeFromFavorites(item.id)}
                              className="flex-1 bg-red-100 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-200 transition-all duration-300"
                            >
                              Удалить
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Order Details Modal */}
            <AnimatePresence>
              {selectedOrder && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                  onClick={() => setSelectedOrder(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl p-8 max-w-4xl w-full m-4 max-h-[80vh] overflow-y-auto"
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">Детали заказа #{selectedOrder.id}</h2>
                      <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-gray-700">
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Дата</p>
                          <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString('ru-RU')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Статус</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                            {getStatusText(selectedOrder.status)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Адрес доставки</p>
                          <p className="font-medium">{selectedOrder.customerInfo.address}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Метод оплаты</p>
                          <p className="font-medium">{selectedOrder.paymentMethod}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4">Товары</h3>
                        <div className="space-y-4">
                          {selectedOrder.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b pb-4">
                              <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-sm text-gray-500">Количество: {item.quantity}</p>
                                </div>
                              </div>
                              <p className="font-bold">{(item.price * item.quantity).toLocaleString()} сум</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between text-xl font-bold pt-4 border-t">
                        <span>Итого</span>
                        <span>{selectedOrder.total.toLocaleString()} сум</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;