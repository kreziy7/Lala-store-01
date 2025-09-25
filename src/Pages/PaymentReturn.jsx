import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, XCircle, CreditCard, RotateCcw, Shield } from 'lucide-react';

const PaymentReturn = () => {
  const location = useLocation();
  const { orderId, success } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Order Status */}
        {orderId && (
          <div className="text-center mb-12">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              success ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {success ? (
                <CheckCircle className="h-10 w-10 text-green-600" />
              ) : (
                <XCircle className="h-10 w-10 text-red-600" />
              )}
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${
              success ? 'text-green-600' : 'text-red-600'
            }`}>
              {success ? 'Заказ успешно оформлен!' : 'Ошибка при оформлении заказа'}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              {success 
                ? `Ваш заказ №${orderId} принят в обработку. Мы свяжемся с вами в ближайшее время.`
                : 'Произошла ошибка при обработке вашего заказа. Пожалуйста, попробуйте еще раз.'
              }
            </p>
            <div className="space-x-4">
              <Link
                to="/profile"
                className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Мои заказы
              </Link>
              <Link
                to="/catalog"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Продолжить покупки
              </Link>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Условия оплаты и возврата
          </h1>

          {/* Payment Methods */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <CreditCard className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-semibold">Способы оплаты</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Онлайн оплата</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Банковские карты (Visa, MasterCard, МИР)
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Click - мгновенная оплата
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Payme - удобно и безопасно
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Банковский перевод
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Оплата при получении</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Наличными курьеру
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    Банковской картой курьеру
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                    При самовывозе в магазине
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Важно:</strong> При онлайн оплате действует скидка 3% от суммы заказа. 
                Все платежи защищены SSL-шифрованием.
              </p>
            </div>
          </section>

          {/* Return Policy */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <RotateCcw className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-semibold">Условия возврата</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Сроки возврата</h3>
                <p className="text-gray-600 mb-4">
                  Вы можете вернуть товар в течение <strong>14 дней</strong> с момента получения, 
                  если товар не подошел по размеру, цвету или не понравился по другим причинам.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Условия для возврата</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Товар не был в использовании</li>
                  <li>• Сохранены все ярлыки и упаковка</li>
                  <li>• Товар не имеет следов стирки или повреждений</li>
                  <li>• Наличие чека или документа об оплате</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Процедура возврата</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      1
                    </div>
                    <p className="text-sm">Свяжитесь с нами по телефону или email</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      2
                    </div>
                    <p className="text-sm">Передайте товар курьеру или привезите в магазин</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                      3
                    </div>
                    <p className="text-sm">Получите возврат средств в течение 3-5 дней</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Обмен товара</h3>
                <p className="text-gray-600">
                  Если товар не подошел по размеру, вы можете обменять его на другой размер 
                  бесплатно в течение 14 дней. Обмен производится при наличии нужного размера на складе.
                </p>
              </div>
            </div>
          </section>

          {/* Warranty */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-8">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-semibold">Гарантия качества</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3">Наши гарантии</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Все товары сертифицированы</li>
                  <li>• Используются только безопасные материалы</li>
                  <li>• Контроль качества на всех этапах</li>
                  <li>• Гарантия на швы и фурнитуру - 6 месяцев</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Брак и дефекты</h3>
                <p className="text-gray-600 mb-4">
                  Если вы обнаружили производственный брак или дефект, мы:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>• Заменим товар бесплатно</li>
                  <li>• Вернем полную стоимость</li>
                  <li>• Компенсируем расходы на доставку</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-yellow-50 rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Остались вопросы?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-gray-600">+998 71 123-45-67</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">support@lalastore.uz</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Режим работы</h3>
                <p className="text-gray-600">Пн-Вс: 9:00-21:00</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link
                to="/contacts"
                className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Связаться с нами
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentReturn;