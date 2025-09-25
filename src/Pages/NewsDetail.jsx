import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    import('../data/news.json').then(module => {
      const news = module.default;
      const foundArticle = news.find(item => item.id === id);
      setArticle(foundArticle);
      
      // Get related news (excluding current article)
      const related = news.filter(item => item.id !== id).slice(0, 3);
      setRelatedNews(related);
    });
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link
          to="/news"
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к новостям
        </Link>

        <article className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
          {/* Article header */}
          <div className="aspect-w-16 aspect-h-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(article.date).toLocaleDateString('ru-RU')}
              </div>
              
              <button className="flex items-center text-gray-500 hover:text-yellow-600 transition-colors">
                <Share2 className="h-4 w-4 mr-2" />
                Поделиться
              </button>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-gray-600 mb-6 font-medium">
                {article.excerpt}
              </p>
              
              <div className="text-gray-700 leading-relaxed">
                {article.body.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Related news */}
        {relatedNews.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Похожие новости</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedNews.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/news/${relatedArticle.id}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-w-16 aspect-h-10">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(relatedArticle.date).toLocaleDateString('ru-RU')}
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;