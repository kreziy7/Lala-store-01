// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import AnimatedCard from './AnimatedCard';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { theme, isAnimated } = useTheme();

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
    <AnimatedCard className="overflow-hidden group" hover3D={true} glowEffect={true}>
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-48 object-cover ${isAnimated ? 'group-hover:scale-110 transition-transform duration-500' : ''}`}
          />
          {product.featured && (
            <span className={`absolute top-2 left-2 ${theme.primary} text-white px-2 py-1 rounded-full text-xs font-semibold ${isAnimated ? 'animate-pulse' : ''}`}>
              Хит
            </span>
          )}
          <button className={`absolute top-2 right-2 p-2 ${theme.surface} rounded-full ${theme.shadow} ${isAnimated ? 'opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110' : ''}`}>
            <Heart className={`h-4 w-4 ${theme.textSecondary} hover:text-red-500 transition-colors`} />
          </button>
        </div>
       
        <div className="p-4">
          <h3 className={`font-medium ${theme.text} mb-2 line-clamp-2 group-hover:${theme.accent} ${isAnimated ? 'transition-colors duration-300' : ''}`}>
            {product.name}
          </h3>
         
          <div className="flex items-center justify-between mb-3">
            <span className={`text-lg font-bold ${theme.text}`}>
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
              <span className={`text-sm ${theme.textSecondary}`}>Размеры: </span>
              <span className={`text-sm ${theme.text}`}>{product.sizes.join(', ')}</span>
            </div>
          )}
         
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full ${theme.primary} text-white py-2 px-4 rounded-lg ${theme.primaryHover} ${isAnimated ? 'transition-all duration-300 hover:scale-105' : ''} flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed ${theme.glowEffect}`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>В корзину</span>
          </button>
        </div>
      </Link>
    </AnimatedCard>
  );
};

export default ProductCard;