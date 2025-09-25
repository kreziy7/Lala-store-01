import React from 'react';
import { Truck, Clock, MapPin, Package, CreditCard, Phone } from 'lucide-react';

const ShippingTerms = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Условия доставки
          </h1>

          {/* Delivery Methods Section */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Truck className="h-8 w-8 text-yellow-500 mr-3" aria-hidden="true" />
              <h2 className="text-2xl font-semibold">Способы доставки</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border border-gray-200 rounded-lg p-6 transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Truck className="h-6 w-6 text-yellow-500 mr-2" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">Курьерская доставка</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li>• По Ташкенту: <strong>15,000 сум</strong></li>
                  <li>• По Ташкентской области: <strong>25,000 сум</strong></li>
                  <li>• По другим регионам: <strong>35,000 сум</strong></li>
                  <li>• Время доставки: 1-3 рабочих дня</li>
                  <li>• Доставка до двери</li>
                </ul>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <strong>Бесплатная доставка</strong> при заказе от 200,000 сум
                  </p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 transition-transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-yellow-500 mr-2" aria-hidden="true" />
                  <h3 className="text-xl font-semibold">Самовывоз</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li>• <strong>Бесплатно</strong></li>
                  <li>• г. Ташкент, ул. Амира Темура, 15</li>
                  <li>• ТЦ "Mega Planet", 2 этаж</li>
                  <li>• Готовность: 2-4 часа после заказа</li>
                  <li>• Режим работы: Пн-Вс 9:00-21:00</li>
                </ul>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Примерка и консультация специалиста
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Times Section */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-yellow-500 mr-3" aria-hidden="true" />
              <h2 className="text-2xl font-semibold">Сроки доставки</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-yellow-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">По Ташкенту</h3>
                <p className="text-2xl font-bold text-yellow-500 mb-2">1-2 дня</p>
                <p className="text-sm text-gray-600">Стандартная доставка</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-yellow-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">По области</h3>
                <p className="text-2xl font-bold text-yellow-500 mb-2">2-3 дня</p>
                <p className="text-sm text-gray-600">Ташкентская область</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-yellow-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">По Узбекистану</h3>
                <p className="text-2xl font-bold text-yellow-500 mb-2">3-5 дней</p>
                <p className="text-sm text-gray-600">Все регионы</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-xl transition-transform hover:scale-105">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="h-8 w-8 text-yellow-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Самовывоз</h3>
                <p className="text-2xl font-bold text-yellow-500 mb-2">2-4 часа</p>
                <p className="text-sm text-gray-600">После оформления</p>
              </div>
            </div>
          </section>

          {/* Delivery Process Section */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Как происходит доставка</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  1
                </div>
                <h3 className="font-semibold mb-2">Оформление заказа</h3>
                <p className="text-sm text-gray-600">
                  Выберите товары, укажите адрес и способ оплаты
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  2
                </div>
                <h3 className="font-semibold mb-2">Подтверждение</h3>
                <p className="text-sm text-gray-600">
                  Мы свяжемся с вами для подтверждения заказа
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  3
                </div>
                <h3 className="font-semibold mb-2">Сборка и отправка</h3>
                <p className="text-sm text-gray-600">
                  Товары упаковываются и передаются курьеру
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  4
                </div>
                <h3 className="font-semibold mb-2">Получение</h3>
                <p className="text-sm text-gray-600">
                  Курьер доставит заказ по указанному адресу
                </p>
              </div>
            </div>
          </section>

          {/* Payment on Delivery Section */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <CreditCard className="h-8 w-8 text-yellow-500 mr-3" aria-hidden="true" />
              <h2 className="text-2xl font-semibold">Оплата при получении</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Способы оплаты курьеру</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Наличными (точная сумма приветствуется)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Банковской картой через терминал
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Переводом на карту курьера
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Важная информация</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Осмотр товара перед оплатой</li>
                  <li>• Проверка комплектности заказа</li>
                  <li>• Получение чека об оплате</li>
                  <li>• Возможность частичного отказа</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Special Conditions Section */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Особые условия</h2>
            <div className="space-y-6">
              <div className="p-4 bg-yellow-50 rounded-lg transition-transform hover:scale-105">
                <h3 className="font-semibold text-yellow-800 mb-2">Экспресс-доставка</h3>
                <p className="text-yellow-700">
                  Доставка в день заказа по Ташкенту за дополнительную плату 25,000 сум.
                  Заказ должен быть оформлен до 14:00.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg transition-transform hover:scale-105">
                <h3 className="font-semibold text-blue-800 mb-2">Доставка в выходные</h3>
                <p className="text-blue-700">
                  Доставка в субботу и воскресенье осуществляется с 10:00 до 18:00
                  без дополнительной платы.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg transition-transform hover:scale-105">
                <h3 className="font-semibold text-green-800 mb-2">Крупные заказы</h3>
                <p className="text-green-700">
                  При заказе от 500,000 сум доставка бесплатная по всему Узбекистану,
                  включая отдаленные регионы.
                </p>
              </div>
            </div>
          </section>

          {/* Contact for Delivery Section */}
          <section className="bg-yellow-50 rounded-2xl p-8">
            <div className="text-center">
              <Phone className="h-12 w-12 text-yellow-500 mx-auto mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-semibold mb-4">Вопросы по доставке?</h2>
              <p className="text-gray-600 mb-6">
                Наши специалисты помогут выбрать оптимальный способ доставки и ответят на все вопросы
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Телефон службы доставки</h3>
                  <p className="text-lg text-yellow-600">
                    <a href="tel:+998123456789" aria-label="Позвонить в службу доставки">
                      +998 12 345 67 89
                    </a>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Электронная почта</h3>
                  <p className="text-lg text-yellow-600">
                    <a href="mailto:delivery@example.com" aria-label="Отправить email в службу доставки">
                      delivery@example.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingTerms;