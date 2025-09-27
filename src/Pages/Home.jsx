import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Shield, Truck, Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
// Components
import BlockThree from "./BlockThree";
import BlockFour from "./BlockFour";
import Catalog from "../Components/Catalog";

// Backgrounds
import BgImg from "../assets/HomeImg/bgImg.png";
import BgImgTwo from "../assets/HomeImg/bgImgTwo.png";
import BgImgThree from "../assets/HomeImg/Block2.2.png";
import BgImgFour from "../assets/HomeImg/Block3.4.png";
import pushti from "../assets/pushti.png"
import kok from "../assets/kok.png"
import pushti2 from "../assets/pushti2.png"
import mushuk from "../assets/mushuk.png"
import  fruktik from "../assets/fruktik.png"
import pushti3 from "../assets/pushti3.png"

// OGL imports
import {
  Camera,
  Mesh,
  Plane,
  Program,
  Renderer,
  Texture,
  Transform,
} from "ogl";



const Home = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch("/src/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFeaturedProducts(
          data.filter((product) => product.featured).slice(0, 6)
        );
      })
      .catch(() => {
        // Fallback to imported data if fetch fails
        import("../data/products.json").then((module) => {
          const data = module.default;
          setProducts(data);
          setFeaturedProducts(
            data.filter((product) => product.featured).slice(0, 6)
          );
        });
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-pink-50 py-16">
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
                <div className="flex flex-col md:flex-row items-center justify-around gap-8">
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
                </div>
              </SwiperSlide>

              {/* Slide 2 */}
              <SwiperSlide>
                <div className="flex flex-col md:flex-row items-center justify-around gap-8">
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
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Каталог</h2>
          <Catalog />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <BlockThree />
        </div>
      </section>

      {/* Address Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
         <BlockFour/>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-[#F4F4F4]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Подпишитесь на нашу рассылку
          </h2>
          <p className=" text-[#33394F9E] mb-8">
          Присоединяйтесь к программе LFLF STORE, 
          чтобы получать постоянные скидки и персональные предложения
          </p>
          <div className="max-w-md mx-auto flex justify-center">
           
            {/* <button className="bg-white text-yellow-400 px-6 py-3 rounded-r-lg  font-semibold hover:bg-gray-50 transition-colors">
            оформить подписку
            </button> */}
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
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">О компании</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Безопасные материалы
              </h3>
              <p className="text-gray-600">
                Используем только гипоаллергенные и безопасные материалы для
                детской кожи
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">
                Предоставляем гарантию на всю продукцию и возможность возврата
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">
                Доставляем по всему Узбекистану в кратчайшие сроки
              </p>
            </div>
          </div>
        </div>
      </section>

  

<section className="py-16">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold mb-8">Ранее вы смотрели</h2>
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      slidesPerView={2}
      breakpoints={{
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 6 },
      }}
      spaceBetween={16}
      className="pb-4"
    >
      {[
        { badgeText: 'В наличии', badgeClass: 'bg-green-500 text-white', border: 'border-4 border-blue-500', img: pushti, title: 'Боди без рукавов "ФРУК-ТИНК", розовый', price: '349 Р/шт' },
        { badgeText: 'В наличии', badgeClass: 'bg-green-500 text-white', border: '', img: kok, title: 'Боди без рукавов "ФРУК-ТИНК", голубой', price: '349 Р/шт' },
        { badgeText: 'В наличии', badgeClass: 'bg-lime-500 text-white', border: '', img: pushti2, title: 'Боди без рукавов "ФРУК-ТИНК", розовый', price: '349 Р/шт' },
        { badgeText: 'Нет в наличии', badgeClass: 'bg-red-500 text-white', border: '', img: mushuk, title: 'Боди без рукавов "ФРУК-ТИНК", розовый', price: '349 Р/шт' },
        { badgeText: 'На складе', badgeClass: 'bg-blue-500 text-white', border: '', img: fruktik, title: 'Боди без рукавов "ФРУК-ТИНК", бежевый', price: '349 Р/шт' },
        { badgeText: 'В наличии', badgeClass: 'bg-green-500 text-white', border: '', img: pushti3, title: 'Боди без рукавов "ФРУК-ТИНК", розовый', price: '349 Р/шт' },
      ].map((item, i) => (
        <SwiperSlide key={i}>
          <div
            className={`relative flex-shrink-0 w-full rounded-lg shadow-md bg-white p-2 ${item.border}`}
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
              {item.title}
            </p>
            <p className="text-blue-600 font-bold text-sm">{item.price}</p>
            <button className="mt-2 w-full bg-yellow-400 text-white py-2 rounded-full text-sm font-semibold hover:bg-yellow-500 transition">
              КУПИТЬ В 1 КЛИК
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>
   
      <div className="flex flex-col items-center justify-center py-10">
  {/* Title */}
  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
    Подписаться на рассылку
  </h2>

  {/* Form */}
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
</div>
        
    </div>
  );
};

export default Home;
