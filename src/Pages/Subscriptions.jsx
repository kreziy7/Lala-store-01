// src/pages/Subscriptions.jsx
import React, { useState, useEffect } from 'react';
import { Bell, Mail, Smartphone, Settings, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AnimatedCard from '../components/AnimatedCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Subscriptions = () => {
  const { user } = useAuth();
  const { theme, isAnimated } = useTheme();
  const [subscriptions, setSubscriptions] = useState({
    newProducts: true,
    priceDrops: true,
    orderUpdates: true,
    newsletter: false,
    promotions: true,
    smsNotifications: false,
  });
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading subscriptions
    setTimeout(() => {
      const savedSubscriptions = localStorage.getItem('lalastore_subscriptions');
      if (savedSubscriptions) {
        setSubscriptions(JSON.parse(savedSubscriptions));
      }
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubscriptionChange = (key) => {
    const newSubscriptions = {
      ...subscriptions,
      [key]: !subscriptions[key],
    };
    setSubscriptions(newSubscriptions);
    localStorage.setItem('lalastore_subscriptions', JSON.stringify(newSubscriptions));
  };

  const handleSaveSettings = () => {
    const settings = {
      subscriptions,
      email,
      phone,
      userId: user?.id,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem('lalastore_subscription_settings', JSON.stringify(settings));
    setIsUpdated(true);
    setTimeout(() => setIsUpdated(false), 3000);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center`}>
        <LoadingSpinner size="xl" text="Loading Subscriptions..." />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${theme.background} ${theme.text}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <AnimatedCard className="text-center mb-8" hover3D={true} glowEffect={true}>
            <h1 className={`text-3xl font-bold ${theme.text} mb-4`}>Управление подписками</h1>
            <p className={`${theme.textSecondary}`}>
              Настройте уведомления и подписки, чтобы быть в курсе всех новостей и предложений
            </p>
          </AnimatedCard>

          {isUpdated && (
            <AnimatedCard
              className={`bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 flex items-center ${isAnimated ? 'animate-fade-in' : ''}`}
              hover3D={true}
            >
              <Check className="h-5 w-5 mr-2" />
              Настройки успешно сохранены!
            </AnimatedCard>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Email Subscriptions */}
            <AnimatedCard className="p-6" hover3D={true} glowEffect={true}>
              <div className="flex items-center mb-6">
                <Mail className={`h-6 w-6 ${theme.accent} mr-3`} />
                <h2 className={`text-xl font-semibold ${theme.text}`}>Email уведомления</h2>
              </div>
              <div className="space-y-4">
                {[
                  { key: 'newProducts', title: 'Новые товары', desc: 'Уведомления о поступлении новых товаров' },
                  { key: 'priceDrops', title: 'Снижение цен', desc: 'Уведомления о скидках и акциях' },
                  { key: 'orderUpdates', title: 'Статус заказов', desc: 'Обновления по вашим заказам' },
                  { key: 'newsletter', title: 'Новостная рассылка', desc: 'Еженедельные новости и советы' },
                  { key: 'promotions', title: 'Промо-акции', desc: 'Специальные предложения и конкурсы' },
                ].map(({ key, title, desc }) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-4 ${theme.secondary} rounded-lg ${isAnimated ? 'hover:scale-105 transition-transform' : ''}`}
                  >
                    <div>
                      <h3 className={`font-medium ${theme.text}`}>{title}</h3>
                      <p className={`text-sm ${theme.textSecondary}`}>{desc}</p>
                    </div>
                    <button
                      onClick={() => handleSubscriptionChange(key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        subscriptions[key] ? theme.primary : theme.secondary
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          subscriptions[key] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </AnimatedCard>

            {/* SMS and Contact Settings */}
            <div className="space-y-6">
              {/* SMS Notifications */}
              <AnimatedCard className="p-6" hover3D={true} glowEffect={true}>
                <div className="flex items-center mb-6">
                  <Smartphone className={`h-6 w-6 ${theme.accent} mr-3`} />
                  <h2 className={`text-xl font-semibold ${theme.text}`}>SMS уведомления</h2>
                </div>
                <div className="space-y-4">
                  <div
                    className={`flex items-center justify-between p-4 ${theme.secondary} rounded-lg ${isAnimated ? 'hover:scale-105 transition-transform' : ''}`}
                  >
                    <div>
                      <h3 className={`font-medium ${theme.text}`}>SMS уведомления</h3>
                      <p className={`text-sm ${theme.textSecondary}`}>Важные уведомления по SMS</p>
                    </div>
                    <button
                      onClick={() => handleSubscriptionChange('smsNotifications')}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        subscriptions.smsNotifications ? theme.primary : theme.secondary
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          subscriptions.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </AnimatedCard>

              {/* Contact Information */}
              <AnimatedCard className="p-6" hover3D={true} glowEffect={true}>
                <div className="flex items-center mb-6">
                  <Settings className={`h-6 w-6 ${theme.accent} mr-3`} />
                  <h2 className={`text-xl font-semibold ${theme.text}`}>Контактная информация</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2`}>Email адрес</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full px-3 py-2 border ${theme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${theme.surface} ${theme.text}`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${theme.text} mb-2`}>Номер телефона</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full px-3 py-2 border ${theme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${theme.surface} ${theme.text}`}
                      placeholder="+998 90 123-45-67"
                    />
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center mt-8">
            <button
              onClick={handleSaveSettings}
              className={`${theme.primary} text-white px-8 py-3 rounded-lg font-semibold ${theme.primaryHover} ${isAnimated ? 'hover:scale-105 transition-all' : ''} ${theme.glowEffect}`}
            >
              Сохранить настройки
            </button>
          </div>

          {/* Subscription Statistics */}
          <AnimatedCard className="p-8 mt-8" hover3D={true} glowEffect={true}>
            <h2 className={`text-xl font-semibold ${theme.text} mb-6`}>Статистика подписок</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { value: Object.values(subscriptions).filter(Boolean).length, label: 'Активных подписок' },
                { value: 24, label: 'Уведомлений в месяц' },
                { value: '95%', label: 'Доставляемость' },
                { value: 3, label: 'Дня назад последнее' },
              ].map(({ value, label }, index) => (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${theme.accent} mb-2`}>{value}</div>
                  <div className={`${theme.textSecondary}`}>{label}</div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;