import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    import('../data/collections.json').then(module => {
      setCollections(module.default);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Готовые подборки</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы подготовили для вас специальные наборы детской одежды. 
            Все необходимое для вашего малыша в одной покупке.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-16 aspect-h-10">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                  {collection.title}
                </h3>
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-yellow-500">
                      {Math.round(collection.totalPrice * (1 - collection.discount / 100)).toLocaleString()} сум
                    </span>
                    <span className="text-gray-400 line-through ml-2">
                      {collection.totalPrice.toLocaleString()} сум
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold ml-2">
                      -{collection.discount}%
                    </span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-yellow-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Оформите заявку на сайте</h2>
          <p className="text-yellow-100 mb-6">
            Мы свяжемся с вами в ближайшее время для уточнения деталей заказа и оформления доставки
          </p>
          <Link
            to="/quick-order"
            className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-block"
          >
            Оформить заявку
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Collections;