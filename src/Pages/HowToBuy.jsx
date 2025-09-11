import React from 'react';
import { ShoppingCart, CreditCard, Truck, CheckCircle, Search, User, Package, Phone } from 'lucide-react';

const HowToBuy = () => {
  const steps = [
    {
      id: 1,
      title: 'Выберите товары',
      description: 'Найдите нужные товары в каталоге или воспользуйтесь поиском',
      icon: Search,
      details: [
        'Просмотрите каталог товаров',
        'Используйте фильтры по размеру, цвету, цене',
        'Читайте описания и отзывы',
        'Добавляйте товары в корзину'
      ]
    },
    {
      id: 2,
      title: 'Оформите заказ',
      description: 'Заполните контактную информацию и выберите способ доставки',
      icon: ShoppingCart,
      details: [
        'Перейдите в корзину',
        'Проверьте выбранные товары',
        'Укажите контактные данные',
        'Выберите способ доставки'
      ]
    },
    {
      id: 3,
      title: 'Выберите оплату',
      description: 'Оплатите заказ удобным для вас способом',
      icon: CreditCard,
      details: [
        'Наличными при получении',
        'Банковской картой онлайн',
        'Через Click или Payme',
        'Банковским переводом'
      ]
    },
    {
      id: 4,
      title: 'Получите заказ',
      description: 'Дождитесь доставки или заберите заказ самостоятельно',
      icon: Truck,
      details: [
        'Курьерская доставка по адресу',
        'Самовывоз из магазина',
        'Проверка товара при получении',
        'Получение чека об оплате'
      ]
    }
  ];

  const orderMethods = [
    {
      title: 'Через сайт',
      description: 'Самый удобный способ - выбирайте товары и оформляйте заказ онлайн',
      icon: ShoppingCart,
      features: [
        'Полный каталог товаров',
        'Детальные описания и фото',
        'Отзывы покупателей',
        'Онлайн оплата со скидкой 3%'
      ],
      buttonText: 'Перейти в каталог',
      buttonLink: '/catalog'
    },
    {
      title: 'Быстрый заказ',
      description: 'Минимум полей - укажите только товар и контакты, мы сами перезвоним',
      icon: Package,
      features: [
        'Быстрое оформление',
        'Персональная консультация',
        'Помощь в выборе размера',
        'Индивидуальные условия'
      ],
      buttonText: 'Быстрый заказ',
      buttonLink: '/quick-order'
    },
    {
      title: 'По телефону',
      description: 'Позвоните нам, и мы поможем выбрать товары и оформить заказ',
      icon: Phone,
      features: [
        'Консультация специалиста',
        'Помощь в выборе',
        'Оформление по телефону',
        'Ответы на все вопросы'
      ],
      buttonText: '+998 71 123-45-67',
      buttonLink: 'tel:+998711234567'
    }
  ];

  const paymentMethods = [
    {
      title: 'Наличными при получении',
      description: 'Оплачивайте заказ наличными курьеру или в магазине',
      pros: ['Безопасно', 'Можно осмотреть товар', 'Не нужна карта'],
      cons: ['Нужна точная сумма']
    },
    {
      title: 'Банковской картой',
      description: 'Оплата картой онлайн или курьеру при получении',
      pros: ['Скидка 3% при онлайн оплате', 'Быстро', 'Безопасно'],
      cons: ['Нужна банковская карта']
    },
    {
      title: 'Click / Payme',
      description: 'Оплата через популярные платежные системы Узбекистана',
      pros: ['Удобно', 'Быстро', 'Привычно'],
      cons: ['Нужно приложение']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Как купить</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Покупка в LalaStore - это просто! Следуйте нашему пошаговому руководству 
              или выберите наиболее удобный для вас способ оформления заказа
            </p>
          </div>

          {/* Step by Step Guide */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Пошаговое руководство</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.id} className="relative">
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-yellow-200 z-0" 
                           style={{ width: 'calc(100% - 2rem)' }} />
                    )}
                    <div className="bg-white rounded-2xl shadow-md p-6 relative z-10">
                      <div className="w-16 h-16 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                        {step.id}
                      </div>
                      <div className="text-center mb-4">
                        <IconComponent className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Order Methods */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Способы оформления заказа</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {orderMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-yellow-500" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                      <p className="text-gray-600">{method.description}</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {method.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={method.buttonLink}
                      className="block w-full bg-yellow-400 text-white py-3 px-4 rounded-lg text-center font-semibold hover:bg-yellow-500 transition-colors"
                    >
                      {method.buttonText}
                    </a>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Payment Methods */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Способы оплаты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paymentMethods.map((method, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2">Преимущества:</h4>
                      <ul className="space-y-1">
                        {method.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-center text-sm text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Особенности:</h4>
                      <ul className="space-y-1">
                        {method.cons.map((con, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-4 h-4 mr-2 flex-shrink-0 flex items-center justify-center">
                              <div className="w-2 h-2 bg-gray-400 rounded-full" />
                            </div>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
            <div className="bg-white rounded-2xl shadow-md p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Можно ли примерить товар перед покупкой?</h3>
                  <p className="text-gray-600">
                    Да, при самовывозе в нашем магазине вы можете примерить товар. 
                    При курьерской доставке вы можете осмотреть товар перед оплатой.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Что делать, если товар не подошел?</h3>
                  <p className="text-gray-600">
                    Вы можете вернуть или обменять товар в течение 14 дней при сохранении товарного вида, 
                    упаковки и чека. Подробнее в разделе "Условия возврата".
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Сколько стоит доставка?</h3>
                  <p className="text-gray-600">
                    Доставка по Ташкенту - 15,000 сум, по области - 25,000 сум. 
                    При заказе от 200,000 сум доставка бесплатная. Самовывоз всегда бесплатный.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Как долго обрабатывается заказ?</h3>
                  <p className="text-gray-600">
                    Обычно заказ обрабатывается в течение 2-4 часов в рабочее время. 
                    После обработки мы свяжемся с вами для подтверждения.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Можно ли изменить или отменить заказ?</h3>
                  <p className="text-gray-600">
                    Да, вы можете изменить или отменить заказ до момента его отправки. 
                    Свяжитесь с нами по телефону +998 71 123-45-67.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Support */}
          <section className="bg-yellow-50 rounded-2xl p-8">
            <div className="text-center">
              <User className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Нужна помощь?</h2>
              <p className="text-gray-600 mb-6">
                Наши консультанты помогут вам выбрать товары и оформить заказ
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-yellow-600 font-semibold">+998 71 123-45-67</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-yellow-600 font-semibold">support@lalastore.uz</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Режим работы</h3>
                  <p className="text-gray-600">Пн-Вс: 9:00-21:00</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowToBuy;