import React from 'react';
import { Shield, Award, FileText, CheckCircle, Download, ExternalLink } from 'lucide-react';

const Licenses = () => {
  const licenses = [
    {
      id: 1,
      title: 'Лицензия на розничную торговлю',
      number: 'РТ-2024-001234',
      issuer: 'Министерство экономического развития и сокращения бедности РУз',
      issueDate: '15.01.2024',
      expiryDate: '15.01.2027',
      status: 'Действующая',
      description: 'Лицензия на осуществление розничной торговли детскими товарами',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Сертификат соответствия ГОСТ',
      number: 'ГОСТ-2024-567890',
      issuer: 'Узстандарт',
      issueDate: '20.02.2024',
      expiryDate: '20.02.2027',
      status: 'Действующий',
      description: 'Сертификат соответствия продукции требованиям ГОСТ',
      downloadUrl: '#'
    },
    {
      id: 3,
      title: 'Санитарно-эпидемиологическое заключение',
      number: 'СЭЗ-2024-112233',
      issuer: 'Санитарно-эпидемиологическая служба',
      issueDate: '10.03.2024',
      expiryDate: '10.03.2027',
      status: 'Действующее',
      description: 'Заключение о соответствии санитарно-эпидемиологическим требованиям',
      downloadUrl: '#'
    },
    {
      id: 4,
      title: 'Сертификат качества ISO 9001',
      number: 'ISO-9001-2024',
      issuer: 'Международная организация по стандартизации',
      issueDate: '05.04.2024',
      expiryDate: '05.04.2027',
      status: 'Действующий',
      description: 'Сертификат системы менеджмента качества ISO 9001:2015',
      downloadUrl: '#'
    }
  ];

  const certifications = [
    {
      title: 'Безопасность материалов',
      description: 'Все материалы проходят проверку на отсутствие вредных веществ',
      icon: Shield
    },
    {
      title: 'Качество продукции',
      description: 'Контроль качества на всех этапах производства',
      icon: Award
    },
    {
      title: 'Соответствие стандартам',
      description: 'Продукция соответствует международным стандартам безопасности',
      icon: CheckCircle
    }
  ];

  const getStatusColor = (status) => {
    return status.includes('Действующ') ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Лицензии и сертификаты</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              LalaStore работает в полном соответствии с законодательством Республики Узбекистан 
              и международными стандартами качества и безопасности детских товаров
            </p>
          </div>

          {/* Certifications Overview */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Наши гарантии качества</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-md p-6 text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{cert.title}</h3>
                    <p className="text-gray-600">{cert.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Licenses List */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-8">Действующие лицензии и сертификаты</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {licenses.map((license) => (
                <div key={license.id} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-lg">{license.title}</h3>
                        <p className="text-sm text-gray-600">№ {license.number}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(license.status)}`}>
                      {license.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Выдан:</span>
                      <p className="text-sm text-gray-600">{license.issuer}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Дата выдачи:</span>
                        <p className="text-sm text-gray-600">{license.issueDate}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Действует до:</span>
                        <p className="text-sm text-gray-600">{license.expiryDate}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Описание:</span>
                      <p className="text-sm text-gray-600">{license.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <button className="flex items-center text-yellow-600 hover:text-yellow-700 text-sm">
                      <Download className="h-4 w-4 mr-1" />
                      Скачать копию
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-700 text-sm">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Проверить подлинность
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Compliance Information */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Соответствие требованиям</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Национальные стандарты</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">ГОСТ 25295-2003 "Одежда верхняя пальтово-костюмного ассортимента"</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">ГОСТ 31307-2005 "Белье нательное"</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">ГОСТ 32119-2013 "Изделия швейные для детей"</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">СанПиН 2.4.7/1.1.1286-03 "Гигиенические требования к одежде для детей"</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Международные стандарты</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">ISO 9001:2015 "Системы менеджмента качества"</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">OEKO-TEX Standard 100 "Экологическая безопасность текстиля"</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">EN 14682:2014 "Безопасность детской одежды"</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">CPSIA "Закон о повышении безопасности потребительских товаров"</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Testing and Quality Control */}
          <section className="bg-white rounded-2xl shadow-md p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Контроль качества и тестирование</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="font-semibold mb-2">Тестирование материалов</h3>
                <p className="text-sm text-gray-600">
                  Проверка на содержание вредных веществ, аллергенов и соответствие гигиеническим требованиям
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="font-semibold mb-2">Контроль производства</h3>
                <p className="text-sm text-gray-600">
                  Многоступенчатый контроль качества на всех этапах производственного процесса
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="font-semibold mb-2">Финальная проверка</h3>
                <p className="text-sm text-gray-600">
                  Проверка готовой продукции перед поступлением в продажу на соответствие всем требованиям
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-yellow-50 rounded-2xl p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Вопросы о сертификации?</h2>
              <p className="text-gray-600 mb-6">
                Если у вас есть вопросы о наших лицензиях, сертификатах или стандартах качества, 
                мы с радостью предоставим дополнительную информацию
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Отдел качества</h3>
                  <p className="text-gray-600">quality@lalastore.uz</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-gray-600">+998 71 123-45-67</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Режим работы</h3>
                  <p className="text-gray-600">Пн-Пт: 9:00-18:00</p>
                </div>
              </div>
            </div>
          </section>

          {/* Legal Notice */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              Все представленные документы являются действующими на момент публикации. 
              Актуальную информацию о статусе лицензий можно проверить на официальных сайтах выдавших их организаций.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Licenses;