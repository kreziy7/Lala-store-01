import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.featured && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Хит
            </span>
          )}
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-gray-900">
              {product.price.toLocaleString()} сум
            </span>
            {product.inStock ? (
              <span className="text-green-600 text-sm">В наличии</span>
            ) : (
              <span className="text-red-600 text-sm">Нет в наличии</span>
            )}
          </div>
          
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-3">
              <span className="text-sm text-gray-600">Размеры: </span>
              <span className="text-sm text-gray-800">{product.sizes.join(', ')}</span>
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>В корзину</span>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;