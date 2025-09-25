import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import Pagination from '../components/Pagination';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 12;

  useEffect(() => {
    import('../data/products.json').then(module => {
      setProducts(module.default);
    });
  }, []);

  useEffect(() => {
    if (!query) {
      setFilteredProducts([]);
      return;
    }

    let result = products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );

    // Apply filters
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }

    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter(product =>
        product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    if (filters.colors && filters.colors.length > 0) {
      result = result.filter(product =>
        product.colors.some(color => filters.colors.includes(color))
      );
    }

    if (filters.priceMin) {
      result = result.filter(product => product.price >= parseInt(filters.priceMin));
    }

    if (filters.priceMax) {
      result = result.filter(product => product.price <= parseInt(filters.priceMax));
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, query, filters, sortBy]);

  const clearFilters = () => {
    setFilters({});
    setSortBy('');
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Введите поисковый запрос</h1>
          <p className="text-gray-600 mb-8">Используйте поиск в шапке сайта для поиска товаров</p>
          <Link
            to="/catalog"
            className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Результаты поиска: "{query}"
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">Найдено товаров: {filteredProducts.length}</p>
            
            <div className="flex items-center space-x-4">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2"
              >
                <Filter className="h-4 w-4" />
                <span>Фильтры</span>
              </button>

              {/* Sort dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-400"
              >
                <option value="">Сортировать по</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
                <option value="name">Название</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterPanel
              filters={filters}
              onFilterChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Products grid */}
          <div className="lg:col-span-3">
            {currentProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  По запросу "{query}" ничего не найдено
                </h2>
                <p className="text-gray-500 mb-8">
                  Попробуйте изменить поисковый запрос или сбросить фильтры
                </p>
                <div className="space-x-4">
                  <button
                    onClick={clearFilters}
                    className="bg-yellow-400 text-white px-6 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Сбросить фильтры
                  </button>
                  <Link
                    to="/catalog"
                    className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Все товары
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>

        {/* Search suggestions */}
        {filteredProducts.length === 0 && query && (
          <div className="mt-12 bg-white rounded-2xl shadow-md p-8">
            <h3 className="text-lg font-semibold mb-4">Возможно, вас заинтересует:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                to="/catalog?category=боди"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
              >
                Боди
              </Link>
              <Link
                to="/catalog?category=комплекты"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
              >
                Комплекты
              </Link>
              <Link
                to="/catalog?category=штанишки"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
              >
                Штанишки
              </Link>
              <Link
                to="/collections"
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors"
              >
                Готовые подборки
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;