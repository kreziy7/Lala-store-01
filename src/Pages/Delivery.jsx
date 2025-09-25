import React from 'react';
import { Truck, Clock, MapPin, CreditCard } from 'lucide-react';

const Delivery = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">Доставка</h1>

          {/* Delivery Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <Truck className="h-8 w-8 text-yellow-500 mr-3" />
                <h2 className="text-2xl font-semibold">Курьерская доставка</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• По Ташкенту: 15 000 сум</li>
                <li>• По области: 25 000 сум</li>
                <li>• Время доставки: 1-3 рабочих дня</li>
                <li>• Бесплатная доставка при заказе от 200 000 сум</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">
              <div className="flex items-center mb-4">
                <MapPin className="h-8 w-8 text-yellow-500 mr-3" />
                <h2 className="text-2xl font-semibold">Самовывоз</h2>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li>• Бесплатно</li>
                <li>• г. Ташкент, ул. Амира Темура, 15</li>
                <li>• Режим работы: Пн-Вс 9:00-21:00</li>
                <li>• Готовность заказа: 2-4 часа</li>
              </ul>
            </div>
          </div>

          {/* Delivery Times */}
          <div className="bg-white p-8 rounded-2xl shadow-md mb-12">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-semibold">Сроки доставки</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">По Ташкенту</h3>
                <p className="text-3xl font-bold text-yellow-500 mb-2">1-2 дня</p>
                <p className="text-gray-600">Стандартная доставка</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">По Узбекистану</h3>
                <p className="text-3xl font-bold text-yellow-500 mb-2">3-5 дней</p>
                <p className="text-gray-600">В зависимости от региона</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">Самовывоз</h3>
                <p className="text-3xl font-bold text-yellow-500 mb-2">2-4 часа</p>
                <p className="text-gray-600">После оформления заказа</p>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white p-8 rounded-2xl shadow-md mb-12">
            <div className="flex items-center mb-6">
              <CreditCard className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-semibold">Способы оплаты</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">При получении</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Наличными курьеру</li>
                  <li>• Банковской картой курьеру</li>
                  <li>• При самовывозе в магазине</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Онлайн</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Банковской картой на сайте</li>
                  <li>• Через Click или Payme</li>
                  <li>• Банковским переводом</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Наш адрес</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Адрес магазина</h3>
                      <p className="text-gray-600">г. Ташкент, ул. Амира Темура, 15</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-yellow-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold">Режим работы</h3>
                      <p className="text-gray-600">Пн-Вс: 9:00-21:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-64 rounded-xl overflow-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default Delivery;