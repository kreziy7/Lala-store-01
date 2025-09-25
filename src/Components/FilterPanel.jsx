import React from 'react';
import { X } from 'lucide-react';

const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = ['боди', 'комплекты', 'штанишки', 'кофточки'];
  const sizes = ['56', '62', '68', '74', '80', '86'];
  const colors = ['розовый', 'голубой', 'белый', 'бежевый', 'мятный', 'желтый'];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Фильтры</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-500 hover:text-red-500 transition-colors flex items-center space-x-1"
        >
          <X className="h-4 w-4" />
          <span>Очистить</span>
        </button>
      </div>

      {/* Price range */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Цена</h4>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            placeholder="От"
            value={filters.priceMin || ''}
            onChange={(e) => onFilterChange({ ...filters, priceMin: e.target.value })}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="До"
            value={filters.priceMax || ''}
            onChange={(e) => onFilterChange({ ...filters, priceMax: e.target.value })}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Категория</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories?.includes(category) || false}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...(filters.categories || []), category]
                    : (filters.categories || []).filter(c => c !== category);
                  onFilterChange({ ...filters, categories: newCategories });
                }}
                className="mr-2 text-yellow-400 focus:ring-yellow-400"
              />
              <span className="capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Размер</h4>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => {
                const newSizes = filters.sizes?.includes(size)
                  ? (filters.sizes || []).filter(s => s !== size)
                  : [...(filters.sizes || []), size];
                onFilterChange({ ...filters, sizes: newSizes });
              }}
              className={`px-3 py-2 rounded-lg border text-sm ${
                filters.sizes?.includes(size)
                  ? 'bg-yellow-400 text-white border-yellow-400'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Цвет</h4>
        <div className="space-y-2">
          {colors.map((color) => (
            <label key={color} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.colors?.includes(color) || false}
                onChange={(e) => {
                  const newColors = e.target.checked
                    ? [...(filters.colors || []), color]
                    : (filters.colors || []).filter(c => c !== color);
                  onFilterChange({ ...filters, colors: newColors });
                }}
                className="mr-2 text-yellow-400 focus:ring-yellow-400"
              />
              <span className="capitalize">{color}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;