import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, Eye, Download, Filter, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');

  useEffect(() => {
    // Load orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('lalastore_orders') || '[]');
    const quickOrders = JSON.parse(localStorage.getItem('lalastore_quick_orders') || '[]');
    
    // Filter orders for current user
    const userOrders = [
      ...allOrders.filter(order => order.customerInfo?.email === user?.email),
      ...quickOrders
    ].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setOrders(userOrders);
    setFilteredOrders(userOrders);
  }, [user]);

  useEffect(() => {
    let filtered = [...orders];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.items && order.items.some(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
        (order.product && order.product.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by date range
    if (dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateRange) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
        default:
          break;
      }
      
      if (dateRange !== 'all') {
        filtered = filtered.filter(order => new Date(order.date) >= filterDate);
      }
    }

    setFilteredOrders(filtered);
  }, [orders, filterStatus, searchQuery, dateRange]);

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

  const exportOrders = () => {
    const csvContent = [
      ['ID заказа', 'Дата', 'Статус', 'Сумма', 'Товары'].join(','),
      ...filteredOrders.map(order => [
        order.id,
        new Date(order.date).toLocaleDateString('ru-RU'),
        getStatusText(order.status),
        order.total?.toLocaleString() || 'N/A',
        order.items ? order.items.map(item => item.name).join('; ') : order.product?.name || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'order_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Войдите в аккаунт</h1>
          <p className="text-gray-600 mb-8">Для просмотра истории заказов необходимо войти в систему</p>
          <Link
            to="/login"
            className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Войти в аккаунт
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">История заказов</h1>
              <p className="text-gray-600">Всего заказов: {filteredOrders.length}</p>
            </div>
            <button
              onClick={exportOrders}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Экспорт</span>
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Search className="h-4 w-4 inline mr-1" />
                  Поиск
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="ID заказа или название товара"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Статус
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                >
                  <option value="all">Все статусы</option>
                  <option value="pending">Ожидает обработки</option>
                  <option value="processing">В обработке</option>
                  <option value="shipped">Отправлен</option>
                  <option value="delivered">Доставлен</option>
                  <option value="cancelled">Отменен</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Период
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                >
                  <option value="all">Все время</option>
                  <option value="week">Последняя неделя</option>
                  <option value="month">Последний месяц</option>
                  <option value="year">Последний год</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFilterStatus('all');
                    setSearchQuery('');
                    setDateRange('all');
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {orders.length === 0 ? 'У вас пока нет заказов' : 'Заказы не найдены'}
              </h2>
              <p className="text-gray-600 mb-6">
                {orders.length === 0 
                  ? 'Оформите первый заказ в нашем каталоге'
                  : 'Попробуйте изменить параметры поиска'
                }
              </p>
              <Link
                to="/catalog"
                className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Перейти к покупкам
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-semibold text-lg">Заказ #{order.id}</h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.date).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      {order.type === 'quick' && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          Быстрый заказ
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {order.total?.toLocaleString() || 'N/A'} сум
                      </p>
                      <button className="text-yellow-600 hover:text-yellow-700 flex items-center text-sm mt-1">
                        <Eye className="h-4 w-4 mr-1" />
                        Подробнее
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t pt-4">
                    {order.items ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {order.items.slice(0, 4).map((item, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                {item.quantity} шт. × {item.price.toLocaleString()} сум
                              </p>
                            </div>
                          </div>
                        ))}
                        {order.items.length > 4 && (
                          <div className="flex items-center justify-center text-gray-500">
                            +{order.items.length - 4} товаров
                          </div>
                        )}
                      </div>
                    ) : order.product ? (
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.product.images[0]}
                          alt={order.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-medium">{order.product.name}</p>
                          <p className="text-sm text-gray-600">
                            Количество: {order.quantity}
                            {order.size && `, Размер: ${order.size}`}
                            {order.color && `, Цвет: ${order.color}`}
                          </p>
                          <p className="text-yellow-600 font-semibold">
                            {order.product.price.toLocaleString()} сум
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">Информация о товарах недоступна</p>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="border-t pt-4 mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {order.customerInfo ? (
                        <span>Доставка: {order.customerInfo.address || 'Самовывоз'}</span>
                      ) : (
                        <span>Контакт: {order.phone}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {order.status === 'pending' && (
                        <button className="text-red-600 hover:text-red-700 text-sm">
                          Отменить заказ
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="text-yellow-600 hover:text-yellow-700 text-sm">
                          Повторить заказ
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Order Statistics */}
          <div className="bg-white rounded-2xl shadow-md p-8 mt-8">
            <h2 className="text-xl font-semibold mb-6">Статистика заказов</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">
                  {orders.length}
                </div>
                <div className="text-gray-600">Всего заказов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">
                  {orders.filter(order => order.status === 'delivered').length}
                </div>
                <div className="text-gray-600">Доставлено</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">
                  {orders.reduce((sum, order) => sum + (order.total || 0), 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Общая сумма (сум)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500 mb-2">
                  {orders.length > 0 ? Math.round(orders.reduce((sum, order) => sum + (order.total || 0), 0) / orders.length).toLocaleString() : 0}
                </div>
                <div className="text-gray-600">Средний чек (сум)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;