import React, { useState, useEffect } from 'react';
import { ShoppingCart, Phone, User, Package, Check } from 'lucide-react';

const QuickOrder = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    productId: '',
    quantity: 1,
    size: '',
    color: '',
    notes: ''
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    import('../data/products.json').then(module => {
      setProducts(module.default);
    });
  }, []);

  useEffect(() => {
    if (formData.productId) {
      const product = products.find(p => p.id === formData.productId);
      setSelectedProduct(product);
      if (product) {
        setFormData(prev => ({
          ...prev,
          size: product.sizes?.[0] || '',
          color: product.colors?.[0] || ''
        }));
      }
    }
  }, [formData.productId, products]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    } else if (!/^\+998\s?\d{2}\s?\d{3}-?\d{2}-?\d{2}$/.test(formData.phone)) {
      newErrors.phone = 'Неверный формат телефона';
    }

    if (!formData.productId) {
      newErrors.productId = 'Выберите товар';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'Количество должно быть больше 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const order = {
      id: Date.now().toString(),
      ...formData,
      product: selectedProduct,
      total: selectedProduct.price * formData.quantity,
      status: 'pending',
      type: 'quick',
      date: new Date().toISOString()
    };

    // Save to localStorage
    const quickOrders = JSON.parse(localStorage.getItem('lalastore_quick_orders') || '[]');
    quickOrders.push(order);
    localStorage.setItem('lalastore_quick_orders', JSON.stringify(quickOrders));

    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        productId: '',
        quantity: 1,
        size: '',
        color: '',
        notes: ''
      });
      setSelectedProduct(null);
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Заказ принят!</h2>
          <p className="text-gray-600 mb-6">
            Спасибо за ваш заказ! Мы свяжемся с вами в ближайшее время для подтверждения.
          </p>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Товар:</strong> {selectedProduct?.name}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Количество:</strong> {formData.quantity}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Сумма:</strong> {(selectedProduct?.price * formData.quantity).toLocaleString()} сум
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Быстрый заказ</h1>
            <p className="text-gray-600">
              Оформите заказ быстро - укажите только необходимую информацию, 
              и мы свяжемся с вами для уточнения деталей
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    placeholder="Введите ваше имя"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    placeholder="+998 90 123-45-67"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Package className="h-4 w-4 inline mr-1" />
                  Выберите товар *
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                >
                  <option value="">Выберите товар</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - {product.price.toLocaleString()} сум
                    </option>
                  ))}
                </select>
                {errors.productId && (
                  <p className="text-red-500 text-sm mt-1">{errors.productId}</p>
                )}
              </div>

              {/* Product Details */}
              {selectedProduct && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
                      <p className="text-yellow-600 font-bold text-xl">
                        {selectedProduct.price.toLocaleString()} сум
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {selectedProduct.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Количество
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    {/* Size */}
                    {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Размер
                        </label>
                        <select
                          value={formData.size}
                          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                        >
                          {selectedProduct.sizes.map((size) => (
                            <option key={size} value={size}>{size}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Color */}
                    {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Цвет
                        </label>
                        <select
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                        >
                          {selectedProduct.colors.map((color) => (
                            <option key={color} value={color}>{color}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Итого:</span>
                      <span className="text-xl font-bold text-yellow-600">
                        {(selectedProduct.price * formData.quantity).toLocaleString()} сум
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дополнительные пожелания
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="Укажите дополнительные пожелания к заказу"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Оформить быстрый заказ
              </button>
            </form>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Преимущества быстрого заказа</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Phone className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-semibold mb-2">Быстро</h3>
                <p className="text-sm text-gray-600">Минимум полей для заполнения</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-semibold mb-2">Персонально</h3>
                <p className="text-sm text-gray-600">Индивидуальная консультация</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-yellow-500" />
                </div>
                <h3 className="font-semibold mb-2">Удобно</h3>
                <p className="text-sm text-gray-600">Мы сами вам перезвоним</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickOrder;