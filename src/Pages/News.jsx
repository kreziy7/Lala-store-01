import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    import('../data/news.json').then(module => {
      setNews(module.default);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Новости</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Следите за последними новостями и обновлениями от LalaStore
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-10">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(article.date).toLocaleDateString('ru-RU')}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center text-yellow-500 font-medium">
                  <span>Читать далее</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <section className="bg-white rounded-2xl p-8 text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Подпишитесь на новости</h2>
          <p className="text-gray-600 mb-6">
            Получайте уведомления о новых статьях и специальных предложениях
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:border-yellow-400"
            />
            <button className="bg-yellow-400 text-white px-6 py-3 rounded-r-lg font-semibold hover:bg-yellow-500 transition-colors">
              Подписаться
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default News;