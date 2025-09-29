import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import pushti from "../assets/pushti.png";
import kok from "../assets/kok.png";
import pushti2 from "../assets/pushti2.png";
import mushuk from "../assets/mushuk.png";
import fruktik from "../assets/fruktik.png";
import pushti3 from "../assets/pushti3.png";

// Updated products to match screenshot: added color, size, stock status
const products = [
  {
    id: 1,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: pushti,
    color: "розовый",
    size: "56",
    stock: "in_stock",
  },
  {
    id: 2,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: kok,
    color: "голубой",
    size: "62-68",
    stock: "in_stock",
  },
  {
    id: 3,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: pushti2,
    color: "розовый",
    size: "68",
    stock: "in_stock",
  },
  {
    id: 4,
    name: 'Боди без рукавов "ДРУГ-ТИК", розовый',
    price: 99900,
    image: mushuk,
    color: "розовый",
    size: "74",
    stock: "out_of_stock",
  },
  {
    id: 5,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: fruktik,
    color: "бежевый",
    size: "80-86",
    stock: "warehouse",
  },
  {
    id: 6,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: pushti3,
    color: "розовый",
    size: "56",
    stock: "in_stock",
  },
  {
    id: 7,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: pushti,
    color: "голубой",
    size: "62-68",
    stock: "in_stock",
  },
  {
    id: 8,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: kok,
    color: "розовый",
    size: "68",
    stock: "in_stock",
  },
  {
    id: 9,
    name: 'Боди без рукавов "ДРУГ-ТИК", розовый',
    price: 99900,
    image: pushti2,
    color: "розовый",
    size: "74",
    stock: "out_of_stock",
  },
  {
    id: 10,
    name: 'Боди без рукавов "ФРУК-ТИК", розовый',
    price: 99900,
    image: mushuk,
    color: "бежевый",
    size: "80-86",
    stock: "warehouse",
  },
];

// Unique colors and sizes for filters
const colors = [
  "Оттенок белого",
  "Оттенок голубого",
  "Оттенок желтого",
  "Оттенок зеленого",
  "Оттенок розового",
  "Оттенок серого",
];
const sizes = ["56", "62-68", "68", "74", "80-86"];

const Catalog = () => {
  const [priceRange, setPriceRange] = React.useState([99900, 99900]);
  const [selectedColors, setSelectedColors] = React.useState([]);
  const [selectedSizes, setSelectedSizes] = React.useState([]);

  const handleColorChange = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleSizeChange = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetFilters = () => {
    setPriceRange([99900, 99900]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  // Filter logic
  const filteredProducts = products.filter((product) => {
    const inPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const inColor =
      selectedColors.length === 0 ||
      selectedColors.some((c) =>
        product.color.includes(c.replace("Оттенок ", ""))
      );
    const inSize =
      selectedSizes.length === 0 || selectedSizes.includes(product.size);
    return inPrice && inColor && inSize;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Formatter for prices: 99 900 ₽
  const formatPrice = (price) =>
    new Intl.NumberFormat("ru-RU").format(price) + " ₽/шт";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Filters */}
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-1/4 p-6 bg-white shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">Фильтры</h2>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-800">Цена</h3>
          <p className="text-sm text-gray-600 mt-2">
            {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
          </p>
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-800">Цвета</h3>
          {colors.map((color) => (
            <div key={color} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={color}
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
                className="mr-2 accent-yellow-500"
              />
              <label htmlFor={color} className="text-gray-700">
                {color}
              </label>
            </div>
          ))}
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-gray-800">Размер</h3>
          {sizes.map((size) => (
            <div key={size} className="flex items-center mb-1">
              <input
                type="checkbox"
                id={size}
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="mr-2 accent-yellow-500"
              />
              <label htmlFor={size} className="text-gray-700">
                {size}
              </label>
            </div>
          ))}
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full bg-yellow-400 text-gray-800 py-2 rounded-full font-bold hover:bg-yellow-500 transition"
        >
          СБРОСИТЬ
        </button>
      </motion.aside>

      {/* Main Catalog */}
      <main className="w-3/4 p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Каталог</h1>
        <motion.div
          className="grid grid-cols-5 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                }}
                className="bg-white p-4 rounded-lg shadow-md text-center"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-contain mb-2"
                  />
                  {product.stock === "in_stock" && (
                    <span className="absolute top-2 left-2 bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">
                      В наличии
                    </span>
                  )}
                  {product.stock === "out_of_stock" && (
                    <span className="absolute top-2 left-2 bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">
                      Нет в наличии
                    </span>
                  )}
                  {product.stock === "warehouse" && (
                    <span className="absolute top-2 left-2 bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs">
                      На складе
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-medium text-blue-600 mb-1">
                  {product.name}
                </h3>
                <p className="text-gray-800 font-bold mb-2">
                  {formatPrice(product.price)}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-yellow-400 text-gray-800 py-2 rounded-full font-bold hover:bg-yellow-500 transition"
                >
                  В КОРЗИНУ
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default Catalog;
