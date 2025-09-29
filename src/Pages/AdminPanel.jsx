// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Palette,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Search,
  Filter
} from 'lucide-react';
import AnimatedCard from '../components/AnimatedCard';

import LoadingSpinner from '../components/LoadingSpinner';

const AdminPanel = () => {
  const { user } = useAuth();
  const { theme, themes, changeTheme, currentTheme, isAnimated } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setProducts(JSON.parse(localStorage.getItem('lalastore_products') || '[]'));
      setOrders(JSON.parse(localStorage.getItem('lalastore_orders') || '[]'));
      setUsers(JSON.parse(localStorage.getItem('lalastore_users') || '[]'));
      setLoading(false);
    }, 1000);
  }, []);

  // Check if user is admin (simple check - in real app would be more secure)
  if (!user || user.email !== 'admin@lalastore.uz') {
    return (
      <div className={`min-h-screen flex items-center justify-center`}>
        <AnimatedCard className="p-8 text-center">
          <h1 className={`text-2xl font-bold ${theme.text} mb-4`}>Access Denied</h1>
          <p className={theme.textSecondary}>You don't have permission to access the admin panel.</p>
        </AnimatedCard>
      </div>
    );
  }

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0)
  };

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3 },
    { id: 'products', name: 'Products', icon: Package },
    { id: 'orders', name: 'Orders', icon: ShoppingCart },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'themes', name: 'Themes', icon: Palette },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center`}>
        <LoadingSpinner size="xl" text="Loading Admin Panel..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${theme.text} mb-2`}>Admin Panel</h1>
          <p className={theme.textSecondary}>Manage your LalaStore e-commerce platform</p>
        </div>
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className={`${theme.surface} rounded-2xl p-2 ${theme.shadow}`}>
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? `${theme.primary} text-white`
                        : `${theme.textSecondary} hover:${theme.secondary}`
                    } ${isAnimated ? 'hover:scale-105' : ''}`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedCard className="p-6" hover3D={true} glowEffect={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${theme.textSecondary} text-sm`}>Total Products</p>
                    <p className={`${theme.text} text-2xl font-bold`}>{stats.totalProducts}</p>
                  </div>
                  <Package className={`h-8 w-8 ${theme.accent}`} />
                </div>
              </AnimatedCard>
              <AnimatedCard className="p-6" hover3D={true} glowEffect={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${theme.textSecondary} text-sm`}>Total Orders</p>
                    <p className={`${theme.text} text-2xl font-bold`}>{stats.totalOrders}</p>
                  </div>
                  <ShoppingCart className={`h-8 w-8 ${theme.accent}`} />
                </div>
              </AnimatedCard>
              <AnimatedCard className="p-6" hover3D={true} glowEffect={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${theme.textSecondary} text-sm`}>Total Users</p>
                    <p className={`${theme.text} text-2xl font-bold`}>{stats.totalUsers}</p>
                  </div>
                  <Users className={`h-8 w-8 ${theme.accent}`} />
                </div>
              </AnimatedCard>
              <AnimatedCard className="p-6" hover3D={true} glowEffect={true}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${theme.textSecondary} text-sm`}>Total Revenue</p>
                    <p className={`${theme.text} text-2xl font-bold`}>{stats.totalRevenue.toLocaleString()} сум</p>
                  </div>
                  <TrendingUp className={`h-8 w-8 ${theme.accent}`} />
                </div>
              </AnimatedCard>
            </div>
            {/* Recent Activity */}
            <AnimatedCard className="p-6">
              <h2 className={`text-xl font-bold ${theme.text} mb-4`}>Recent Activity</h2>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 ${theme.secondary} rounded-lg`}>
                    <div>
                      <p className={`font-medium ${theme.text}`}>Order #{order.id}</p>
                      <p className={`text-sm ${theme.textSecondary}`}>
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedCard>
          </div>
        )}
        {/* Themes Tab */}
        {activeTab === 'themes' && (
          <div className="space-y-8">
            <AnimatedCard className="p-6">
              <h2 className={`text-xl font-bold ${theme.text} mb-6`}>Theme Management</h2>
             
              {/* Current Theme */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Current Theme: {themes[currentTheme].name}</h3>
                <div className={`p-6 rounded-xl ${theme.gradient}`}>
                  <p className="text-white font-medium">Theme Preview</p>
                </div>
              </div>
              {/* Theme Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(themes).map(([key, themeOption]) => (
                  <AnimatedCard
                    key={key}
                    className={`p-6 cursor-pointer ${currentTheme === key ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    onClick={() => changeTheme(key)}
                    hover3D={true}
                  >
                    <div className="space-y-4">
                      <h4 className={`font-semibold ${theme.text}`}>{themeOption.name}</h4>
                      <div className={`h-20 rounded-lg ${themeOption.gradient} flex items-center justify-center`}>
                        <span className="text-white font-medium">Preview</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          changeTheme(key);
                        }}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                          currentTheme === key
                            ? `${theme.primary} text-white`
                            : `${theme.secondary} ${theme.text} hover:${theme.primary} hover:text-white`
                        }`}
                      >
                        {currentTheme === key ? 'Active' : 'Apply Theme'}
                      </button>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </AnimatedCard>
          </div>
        )}
        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <AnimatedCard className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textSecondary}`} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`pl-10 pr-4 py-2 border ${theme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.surface} ${theme.text}`}
                    />
                  </div>
                  <button className={`p-2 ${theme.secondary} rounded-lg hover:${theme.primary} hover:text-white transition-colors`}>
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button className={`flex items-center space-x-2 px-4 py-2 ${theme.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}>
                    <Plus className="h-4 w-4" />
                    <span>Add Product</span>
                  </button>
                  <button className={`flex items-center space-x-2 px-4 py-2 ${theme.secondary} ${theme.text} rounded-lg hover:${theme.primary} hover:text-white transition-colors`}>
                    <Upload className="h-4 w-4" />
                    <span>Import</span>
                  </button>
                </div>
              </div>
            </AnimatedCard>
            {/* Products Table */}
            <AnimatedCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${theme.secondary}`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}>Product</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}>Category</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}>Price</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}>Stock</th>
                      <th className={`px-6 py-3 text-left text-xs font-medium ${theme.textSecondary} uppercase tracking-wider`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className={`${theme.surface} divide-y ${theme.border}`}>
                    {products.slice(0, 10).map((product, index) => (
                      <tr key={index} className={`hover:${theme.secondary} transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img className="h-10 w-10 rounded-lg object-cover" src={product.images?.[0]} alt={product.name} />
                            <div className="ml-4">
                              <div className={`text-sm font-medium ${theme.text}`}>{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.textSecondary}`}>
                          {product.category}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme.text} font-medium`}>
                          {product.price?.toLocaleString()} сум
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className={`${theme.textSecondary} hover:${theme.accent} transition-colors`}>
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className={`${theme.textSecondary} hover:${theme.accent} transition-colors`}>
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className={`${theme.textSecondary} hover:text-red-500 transition-colors`}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </AnimatedCard>
          </div>
        )}
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <AnimatedCard className="p-6">
              <h2 className={`text-xl font-bold ${theme.text} mb-6`}>System Settings</h2>
             
              <div className="space-y-6">
                {/* Site Settings */}
                <div>
                  <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Site Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${theme.text} mb-2`}>Site Name</label>
                      <input
                        type="text"
                        defaultValue="LalaStore"
                        className={`w-full px-3 py-2 border ${theme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.surface} ${theme.text}`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${theme.text} mb-2`}>Contact Email</label>
                      <input
                        type="email"
                        defaultValue="info@lalastore.uz"
                        className={`w-full px-3 py-2 border ${theme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${theme.surface} ${theme.text}`}
                      />
                    </div>
                  </div>
                </div>
                {/* Export/Import */}
                <div>
                  <h3 className={`text-lg font-semibold ${theme.text} mb-4`}>Data Management</h3>
                  <div className="flex space-x-4">
                    <button className={`flex items-center space-x-2 px-4 py-2 ${theme.primary} text-white rounded-lg hover:opacity-90 transition-opacity`}>
                      <Download className="h-4 w-4" />
                      <span>Export Data</span>
                    </button>
                    <button className={`flex items-center space-x-2 px-4 py-2 ${theme.secondary} ${theme.text} rounded-lg hover:${theme.primary} hover:text-white transition-colors`}>
                      <Upload className="h-4 w-4" />
                      <span>Import Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;