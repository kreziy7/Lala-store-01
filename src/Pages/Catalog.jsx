// src/pages/Catalog.jsx
import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import AnimatedCard from '../components/AnimatedCard';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Catalog = () => {
  const { theme, isAnimated } = useTheme();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Fetch products and categories from db.json
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:3000/products'),
          fetch('http://localhost:3000/categories'),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(['All', ...categoriesData.map((cat) => cat.name)]);
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки данных. Попробуйте позже.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply sorting
    if (sortOption === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name-asc') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setProducts(filtered);
  }, [searchTerm, selectedCategory, sortOption]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme.background} ${theme.text}`}>
        <LoadingSpinner size="xl" text="Загрузка каталога..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme.background} ${theme.text}`}>
        <AnimatedCard className="p-6 text-center">
          <p className={`text-lg ${theme.text}`}>{error}</p>
        </AnimatedCard>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 ${theme.background} ${theme.text}`}>
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <AnimatedCard className="text-center mb-8" hover3D={true} glowEffect={true}>
          <h1 className={`text-3xl font-bold ${theme.text} mb-4`}>Каталог товаров</h1>
          <p className={`${theme.textSecondary}`}>
            Найдите идеальные товары для вашего ребенка
          </p>
        </AnimatedCard>

        {/* Search and Filter Section */}
        <AnimatedCard className="p-6 mb-8" hover3D={true} glowEffect={true}>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme.textSecondary}`} />
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={handleSearch}
                className={`w-full pl-10 pr-4 py-2 border ${theme.border} rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${theme.surface} ${theme.text}`}
              />
            </div>
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative">
                <button
                  onClick={toggleFilter}
                  className={`flex items-center px-4 py-2 ${theme.secondary} rounded-lg ${theme.primaryHover} ${isAnimated ? 'transition-all hover:scale-105' : ''}`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span>{selectedCategory}</span>
                  <ChevronDown className={`h-4 w-4 ml-2 ${isAnimated ? 'transition-transform' : ''} ${isFilterOpen ? 'rotate-180' : ''}`} />
                </button>
                {isFilterOpen && (
                  <div className={`absolute mt-2 w-48 ${theme.surface} border ${theme.border} rounded-lg ${theme.shadow} ${isAnimated ? 'animate-fade-in' : ''} z-10`}>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsFilterOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 ${theme.text} hover:${theme.secondary} ${isAnimated ? 'transition-colors' : ''}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className={`px-4 py-2 ${theme.secondary} rounded-lg ${theme.text} focus:outline-none focus:ring-2 focus:ring-[var(--primary)] ${isAnimated ? 'transition-all' : ''}`}
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Цена: по возрастанию</option>
                  <option value="price-desc">Цена: по убыванию</option>
                  <option value="name-asc">Название: A-Z</option>
                </select>
                <ArrowUpDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4" />
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Products Grid */}
        {products.length === 0 ? (
          <AnimatedCard className="p-6 text-center" hover3D={true}>
            <p className={`text-lg ${theme.text}`}>Товары не найдены</p>
          </AnimatedCard>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <AnimatedCard className={`mt-12 p-8 text-center ${theme.gradient} ${isAnimated ? 'animate-pulse' : ''}`} hover3D={true} glowEffect={true}>
          <h2 className="text-2xl font-bold text-white mb-4">Не нашли нужный товар?</h2>
          <p className="text-white mb-6">Оформите быструю заявку, и мы поможем вам!</p>
          <Link
            to="/quick-order"
            className={`inline-block px-8 py-3 ${theme.primary} text-white rounded-lg font-semibold ${theme.primaryHover} ${isAnimated ? 'hover:scale-105 transition-all' : ''} ${theme.glowEffect}`}
          >
            Оформить заявку
          </Link>
        </AnimatedCard>
      </div>
    </div>
  );
};

export default Catalog;