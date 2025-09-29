import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Truck } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";

// Custom Components
import BlockThree from "./BlockThree";
import BlockFour from "./BlockFour";
import Catalog from "../Components/Catalog";

// Background Images
import BgImg from "../assets/HomeImg/bgImg.png";
import BgImgTwo from "../assets/HomeImg/bgImgTwo.png";
import BgImgThree from "../assets/HomeImg/Block2.2.png";
import BgImgFour from "../assets/HomeImg/Block3.4.png";
import pushti from "../assets/pushti.png";
import kok from "../assets/kok.png";
import pushti2 from "../assets/pushti2.png";
import mushuk from "../assets/mushuk.png";
import fruktik from "../assets/fruktik.png";
import pushti3 from "../assets/pushti3.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Fetch products.json
    fetch("/src/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFeaturedProducts(
          data.filter((product) => product.featured).slice(0, 6)
        );
      })
      .catch(() => {
        // Fallback import
        import("../data/products.json").then((module) => {
          const data = module.default;
          setProducts(data);
          setFeaturedProducts(
            data.filter((product) => product.featured).slice(0, 6)
          );
        });
      });
  }, []);

  // Function to handle adding product to cart - matches CartModal format
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Create cart item in the format CartModal expects
    const cartItem = {
      id: product.id || Date.now(), // Use product id or generate one
      name: product.name || product.title,
      image: product.image || product.img,
      price: parseFloat(product.price) || 0,
      quantity: 1,
      size: product.size || null,
      color: product.color || null
    };
    
    // Check if item already exists in cart (same id, size, color)
    const existingItemIndex = cart.findIndex(
      item => item.id === cartItem.id && 
              item.size === cartItem.size && 
              item.color === cartItem.color
    );
    
    if (existingItemIndex > -1) {
      // If exists, increment quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Otherwise add new item
      cart.push(cartItem);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Framer Motion variants for animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Animation */}
      <motion.section
        className="bg-gradient-to-r from-blue-50 to-pink-50 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <div className="w-full mt-5 mb-15">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={1}
              spaceBetween={30}
            >
              {/* Slide 1 */}
              <SwiperSlide>
                <motion.div
                  className="flex flex-col md:flex-row items-center justify-around gap-8"
                  variants={fadeInUp}
                >
                  <div
                    className="flex-1 bg-no-repeat bg-cover bg-center p-8 rounded-lg text-white"
                    style={{
                      backgroundImage: `url(${BgImg})`,
                      minHeight: "400px",
                      maxWidth: "75%",
                    }}
                  >
                    <h1 className="text-black text-4xl font-bold mb-4">
                      Большая зимняя <br /> распродажа от LeoKid
                    </h1>
                    <p className="text-lg text-[#33394F9E] w-110">
                      Конверт Leokid Classic подходит для использования в любых
                      колясках, автокреслах и санках. Для прогулок осенью,
                      зимой, весной и даже прохладным летом.
                    </p>
                  </div>
                  <div
                    className="flex-1 bg-no-repeat bg-cover bg-center p-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${BgImgTwo})`,
                      minHeight: "400px",
                      maxWidth: "25%",
                    }}
                  >
                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition">
                      Подборка №106
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
              {/* Slide 2 */}
              <SwiperSlide>
                <motion.div
                  className="flex flex-col md:flex-row items-center justify-around gap-8"
                  variants={fadeInUp}
                >
                  <div
                    className="flex-1 bg-no-repeat bg-cover bg-center p-8 rounded-lg text-white"
                    style={{
                      backgroundImage: `url(${BgImgThree})`,
                      minHeight: "400px",
                      maxWidth: "75%",
                    }}
                  >
                    <h1 className="text-white text-4xl font-bold mb-4">
                      Весенняя коллекция <br /> LeoKid уже здесь
                    </h1>
                    <p className="text-lg text-[#33394F9E] w-110">
                      Новая коллекция уже доступна! Одежда и аксессуары для
                      малышей, созданные с заботой.
                    </p>
                  </div>
                  <div
                    className="flex-1 bg-no-repeat bg-cover bg-center p-8 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundImage: `url(${BgImgFour})`,
                      minHeight: "400px",
                      maxWidth: "25%",
                    }}
                  >
                    <button className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition">
                      Подборка №107
                    </button>
                  </div>
                </motion.div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </motion.section>

      {/* Categories with Animation */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Каталог</h2>
          <Catalog />
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <BlockThree />
        </div>
      </motion.section>

      {/* Address Section */}
      <motion.section
        className="py-16 bg-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4">
          <BlockFour />
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section
        className="py-16 bg-[#F4F4F4]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Подпишитесь на нашу рассылку
          </h2>
          <p className="text-[#33394F9E] mb-8">
            Присоединяйтесь к программе LFLF STORE, чтобы получать постоянные
            скидки и персональные предложения
          </p>
          <div className="max-w-md mx-auto flex justify-center">
            <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-6 py-3 rounded-full transition">
              ОФОРМИТЬ ПОДПИСКУ
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.section>

      {/* Features with Stagger Animation */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">О компании</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Безопасные материалы</h3>
              <p className="text-gray-600">
                Используем только гипоаллергенные и безопасные материалы для
                детской кожи
              </p>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">
                Предоставляем гарантию на всю продукцию и возможность возврата
              </p>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">
                Доставляем по всему Узбекистану в кратчайшие сроки
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Previously Viewed with Animation */}
<motion.section
  className="py-16"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
>
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">Ранее вы смотрели</h2>
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={2000}
      slidesPerView={2}
      breakpoints={{
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 6 },
      }}
      spaceBetween={16}
      className="pb-4"
    >
      {[
        {
          id: 1,
          badgeText: "В наличии",
          badgeClass: "bg-green-500 text-white",
          border: "border-4 border-blue-500",
          img: pushti,
          name: 'Боди без рукавов "ФРУК-ТИНК", розовый',
          price: 99900,
        },
        {
          id: 2,
          badgeText: "В наличии",
          badgeClass: "bg-green-500 text-white",
          border: "",
          img: kok,
          name: 'Боди без рукавов "ФРУК-ТИНК", голубой',
          price: 49900,
        },
        {
          id: 3,
          badgeText: "В наличии",
          badgeClass: "bg-lime-500 text-white",
          border: "",
          img: pushti2,
          name: 'Боди без рукавов "ФРУК-ТИНК", розовый',
          price: 99900,
        },
        {
          id: 4,
          badgeText: "Нет в наличии",
          badgeClass: "bg-red-500 text-white",
          border: "",
          img: mushuk,
          name: 'Боди без рукавов "ФРУК-ТИНК", розовый',
          price: 99900,
        },
        {
          id: 5,
          badgeText: "На складе",
          badgeClass: "bg-blue-500 text-white",
          border: "",
          img: fruktik,
          name: 'Боди без рукавов "ФРУК-ТИНК", бежевый',
          price: 49900,
        },
        {
          id: 6,
          badgeText: "В наличии",
          badgeClass: "bg-green-500 text-white",
          border: "",
          img: pushti3,
          name: 'Боди без рукавов "ФРУК-ТИНК", розовый',
          price: 99900,
        },
      ].map((item) => (
        <SwiperSlide key={item.id}>
          <motion.div
            className={`relative flex-shrink-0 w-full rounded-lg shadow-md bg-white p-2 ${item.border}`}
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="relative">
              <img
                src={item.img}
                alt="Product"
                className="w-full h-40 object-cover rounded-md"
              />
              <span
                className={`absolute top-2 left-2 rounded-full px-3 py-1 text-xs font-semibold ${item.badgeClass}`}
              >
                {item.badgeText}
              </span>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-800 truncate">
              {item.name}
            </p>
            <p className="text-blue-600 font-bold text-sm">
              {item.price.toLocaleString()} сум
            </p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 w-full bg-yellow-400 text-white py-2 rounded-full text-sm font-semibold hover:bg-yellow-500 transition"
            >
              КУПИТЬ В 1 КЛИК
            </button>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</motion.section>


      {/* Final Newsletter */}
      <motion.div
        className="flex flex-col items-center justify-center py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Подписаться на рассылку
        </h2>
        <form className="flex w-full max-w-md">
          <input
            type="email"
            placeholder="e-mail.com"
            className="flex-grow px-4 py-3 rounded-l-full bg-gray-100 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-6 rounded-r-full transition"
          >
            ПОДПИСАТЬСЯ
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;