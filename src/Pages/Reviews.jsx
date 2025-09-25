import React, { useState, useEffect } from 'react';
import { Star, User, ThumbsUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    productId: ''
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem('lalastore_reviews') || '[]');
    setReviews(savedReviews);

    // Load products for review selection
    import('../data/products.json').then(module => {
      setProducts(module.default);
    });
  }, []);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    
    if (!user) {
      alert('Для оставления отзыва необходимо войти в аккаунт');
      return;
    }

    const review = {
      id: Date.now().toString(),
      ...newReview,
      userName: `${user.firstName} ${user.lastName}`,
      userEmail: user.email,
      date: new Date().toISOString(),
      likes: 0
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('lalastore_reviews', JSON.stringify(updatedReviews));

    // Reset form
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      productId: ''
    });
  };

  const handleLike = (reviewId) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, likes: review.likes + 1 }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem('lalastore_reviews', JSON.stringify(updatedReviews));
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onRatingChange(star) : undefined}
            className={`${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            } ${interactive ? 'hover:text-yellow-400 cursor-pointer' : ''}`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Общий отзыв';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Отзывы покупателей</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Поделитесь своим опытом покупок в LalaStore и помогите другим родителям сделать правильный выбор
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Оставить отзыв</h2>
              
              {user ? (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Товар (необязательно)
                    </label>
                    <select
                      value={newReview.productId}
                      onChange={(e) => setNewReview({ ...newReview, productId: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                    >
                      <option value="">Общий отзыв о магазине</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Оценка
                    </label>
                    {renderStars(newReview.rating, true, (rating) => 
                      setNewReview({ ...newReview, rating })
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Заголовок отзыва
                    </label>
                    <input
                      type="text"
                      required
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                      placeholder="Кратко опишите ваш опыт"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Комментарий
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
                      placeholder="Расскажите подробнее о вашем опыте покупки"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-white py-3 px-4 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Опубликовать отзыв
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    Войдите в аккаунт, чтобы оставить отзыв
                  </p>
                  <a
                    href="/login"
                    className="bg-yellow-400 text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Войти
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {reviews.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                  <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Пока нет отзывов
                  </h3>
                  <p className="text-gray-600">
                    Станьте первым, кто оставит отзыв о наших товарах!
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{review.userName}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>

                    {review.productId && (
                      <div className="mb-3">
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {getProductName(review.productId)}
                        </span>
                      </div>
                    )}

                    <h4 className="font-semibold text-lg mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleLike(review.id)}
                        className="flex items-center space-x-2 text-gray-500 hover:text-yellow-600 transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.likes}</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Статистика отзывов</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {reviews.length}
              </div>
              <div className="text-gray-600">Всего отзывов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {reviews.length > 0 
                  ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                  : '0'
                }
              </div>
              <div className="text-gray-600">Средняя оценка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {reviews.filter(review => review.rating === 5).length}
              </div>
              <div className="text-gray-600">5-звездочных</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {reviews.reduce((sum, review) => sum + review.likes, 0)}
              </div>
              <div className="text-gray-600">Лайков</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;