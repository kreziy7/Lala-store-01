import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck, Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('/src/data/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFeaturedProducts(data.filter(product => product.featured).slice(0, 6));
      })
      .catch(() => {
        // Fallback to imported data if fetch fails
        import('../data/products.json').then(module => {
          const data = module.default;
          setProducts(data);
          setFeaturedProducts(data.filter(product => product.featured).slice(0, 6));
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-pink-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Большая детская
                <br />
                <span className="text-yellow-500">распродажа от LalaStore</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Качественная детская одежда для самых маленьких. 
                Натуральные материалы, безопасные красители, доступные цены.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/catalog"
                  className="bg-yellow-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center"
                >
                  Найти
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/collections"
                  className="border border-yellow-400 text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors flex items-center justify-center"
                >
                  Готовые подборки
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1648375/pexels-photo-1648375.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Детская одежда"
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="text-sm text-gray-600">Цены от</div>
                <div className="text-2xl font-bold text-yellow-500">549 сум</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Каталог</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Боди',
                image: 'https://images.pexels.com/photos/1648375/pexels-photo-1648375.jpeg?auto=compress&cs=tinysrgb&w=400',
                link: '/catalog?category=боди'
              },
              {
                title: 'Комплекты',
                image: 'https://images.pexels.com/photos/1648382/pexels-photo-1648382.jpeg?auto=compress&cs=tinysrgb&w=400',
                link: '/catalog?category=комплекты'
              },
              {
                title: 'Штанишки',
                image: 'https://images.pexels.com/photos/1648378/pexels-photo-1648378.jpeg?auto=compress&cs=tinysrgb&w=400',
                link: '/catalog?category=штанишки'
              }
            ].map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">Популярные товары</h2>
            <Link
              to="/catalog"
              className="text-yellow-500 hover:text-yellow-600 flex items-center font-semibold"
            >
              Смотреть все
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Address Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Адрес магазина</h2>
              <div className="space-y-4 text-gray-600">
                <p><strong>Адрес:</strong> г. Ташкент, ул. Амира Темура, 15</p>
                <p><strong>Телефон:</strong> +998 71 123-45-67</p>
                <p><strong>Email:</strong> info@lalastore.uz</p>
                <p><strong>Режим работы:</strong> Пн-Вс 9:00-21:00</p>
              </div>
              <Link
                to="/contacts"
                className="inline-block mt-6 bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
            <div className="h-96 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.06473362516!2d69.13925051640625!3d41.32272395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQsNGI0LrQtdC90YLMgCDQo9C30LHQtdC60LjRgdGC0LDQvQ!5e0!3m2!1sru!2s!4v1640995200000!5m2!1sru!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Подпишитесь на нашу рассылку</h2>
          <p className="text-yellow-100 mb-8">Получайте уведомления о новинках и специальных предложениях</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
            />
            <button className="bg-white text-yellow-400 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-50 transition-colors">
              Подписаться
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">О компании</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Безопасные материалы</h3>
              <p className="text-gray-600">Используем только гипоаллергенные и безопасные материалы для детской кожи</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">Предоставляем гарантию на всю продукцию и возможность возврата</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем по всему Узбекистану в кратчайшие сроки</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earlier You Viewed */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Ранее вы смотрели</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-yellow-400 to-orange-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Подписаться на нашу рассылку</h2>
          <p className="text-yellow-100 mb-8">Будьте в курсе новинок и акций</p>
          <Link
            to="/register"
            className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Подписаться
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;