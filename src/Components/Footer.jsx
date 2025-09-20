import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
             <img src={Logo} alt="" />
            </div>
            <p className="text-gray-300 mb-4">
              Интернет-магазин качественной детской одежды. Заботимся о комфорте ваших малышей.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">МИР</span>
              </div>
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">VISA</span>
              </div>
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">MC</span>
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/collections" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Готовые подборки
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Доставка
                </Link>
              </li>
              <li>
                <Link to="/payment-return" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Оплата и возврат
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Отзывы
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Покупателям</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-to-buy" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Как купить
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Условия доставки
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/licenses" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Лицензии
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">г. Ташкент, ул. Амира Темура, 15</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">+998 71 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300">info@lalastore.uz</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Пн-Вс: 9:00-21:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LalaStore. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;