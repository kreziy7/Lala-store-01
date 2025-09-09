import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, MapPin, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { totalItems, toggleCart, isOpen } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Top bar */}
        <div className="bg-gray-100 py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>г. Ташкент, ул. Амира Темура, 15</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-1" />
                  <span>+998 71 123-45-67</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <span>Режим работы: Пн-Вс 9:00-21:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800">LALA</span>
                <span className="text-sm text-gray-600 -mt-1">STORE</span>
              </div>
            </Link>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 px-4 bg-yellow-400 text-white rounded-r-lg hover:bg-yellow-500 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative p-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User menu */}
              <div className="relative group">
                <button className="flex items-center space-x-1 p-2 text-gray-600 hover:text-yellow-500 transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:inline">{user ? user.firstName : 'Войти'}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Личный кабинет
                      </Link>
                      <Link
                        to="/order-history"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Мои заказы
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Выйти
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Войти
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Регистрация
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-yellow-500 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="md:hidden mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:border-yellow-400"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-yellow-400 text-white rounded-r-lg hover:bg-yellow-500 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-50 border-t">
          <div className="container mx-auto px-4">
            <div className="hidden md:flex items-center space-x-8 py-3">
              <Link to="/" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Главная
              </Link>
              <Link to="/catalog" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Каталог
              </Link>
              <Link to="/collections" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Готовые подборки
              </Link>
              <Link to="/delivery" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Доставка
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-yellow-500 transition-colors">
                О компании
              </Link>
              <Link to="/news" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Новости
              </Link>
              <Link to="/contacts" className="text-gray-700 hover:text-yellow-500 transition-colors">
                Контакты
              </Link>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
              <div className="md:hidden py-4 border-t">
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/"
                    className="py-2 text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Главная
                  </Link>
                  <Link
                    to="/catalog"
                    className="py-2 text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Каталог
                  </Link>
                  <Link
                    to="/collections"
                    className="py-2 text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Готовые подборки
                  </Link>
                  <Link
                    to="/delivery"
                    className="py-2 text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Доставка
                  </Link>
                  <Link
                    to="/about"
                    className="py-2 text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    О компании
                  </Link>
                  <Link
                    to="/news"
                    className="py-2 text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Новости
                  </Link>
                  <Link
                    to="/contacts"
                    className="py-2 text-gray-700 hover:text-yellow-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Контакты
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Cart Modal */}
      <CartModal isOpen={isOpen} onClose={toggleCart} />
    </>
  );
};

export default Header;