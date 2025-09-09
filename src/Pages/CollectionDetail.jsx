import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

const CollectionDetail = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    Promise.all([
      import('../data/collections.json'),
      import('../data/products.json')
    ]).then(([collectionsModule, productsModule]) => {
      const collections = collectionsModule.default;
      const allProducts = productsModule.default;
      
      const foundCollection = collections.find(c => c.id === id);
      setCollection(foundCollection);
      setProducts(allProducts);
      
      if (foundCollection) {
        const collectionItems = allProducts.filter(p => 
          foundCollection.products.includes(p.id)
        );
        setCollectionProducts(collectionItems);
        
        // Get related products from the same category
        const relatedItems = allProducts
          .filter(p => 
            !foundCollection.products.includes(p.id) && 
            collectionItems.some(cp => cp.category === p.category)
          )
          .slice(0, 6);
        setRelatedProducts(relatedItems);
      }
    });
  }, [id]);

  const handleAddCollectionToCart = () => {
    collectionProducts.forEach(product => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
      });
    });
  };

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  const discountedPrice = Math.round(collection.totalPrice * (1 - collection.discount / 100));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-yellow-500">Главная</Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-yellow-500">Готовые подборки</Link>
          <span>/</span>
          <span className="text-gray-900">{collection.title}</span>
        </nav>

        {/* Collection Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <img
              src={collection.image}
              alt={collection.title}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{collection.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{collection.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-yellow-500">
                  {discountedPrice.toLocaleString()} сум
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {collection.totalPrice.toLocaleString()} сум
                </span>
              </div>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                Скидка {collection.discount}%
              </span>
            </div>

            <button
              onClick={handleAddCollectionToCart}
              className="bg-yellow-400 text-white py-3 px-8 rounded-lg font-semibold hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2 mb-4"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Добавить всю подборку в корзину</span>
            </button>

            <p className="text-sm text-gray-500">
              * При покупке всей подборки вы экономите {(collection.totalPrice - discountedPrice).toLocaleString()} сум
            </p>
          </div>
        </div>

        {/* Collection Products */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Товары look'a</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collectionProducts.map((product, index) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <div className="absolute -top-2 -left-2 bg-yellow-400 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Ранее вы смотрели</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-2xl p-8 text-center mt-16">
          <h2 className="text-2xl font-bold mb-4">Оформите заявку на сайте</h2>
          <p className="text-gray-600 mb-6">
            Мы свяжемся с вами в ближайшее время для уточнения деталей заказа и оформления доставки
          </p>
          <Link
            to="/quick-order"
            className="bg-yellow-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors inline-block"
          >
            Оформить заявку
          </Link>
        </section>
      </div>
    </div>
  );
};

export default CollectionDetail;