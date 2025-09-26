import React from 'react'
import accessor from "../assets/HomeImg/Block2.1.png"
import converts from "../assets/HomeImg/Block2.2.png"
import clothes from "../assets/HomeImg/Block2.3.png"
import fourth from "../assets/HomeImg/Block2.4.png"
import fifth from "../assets/HomeImg/Block2.5.png"
import { Link } from "react-router-dom"

const ProductCard = ({ image, title, items, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover rounded-lg"
      />
      
      {/* DaisyUI Dropdown positioned at bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-2">
        <details className="dropdown dropdown-top w-full">
          <summary className="btn bg-yellow-400 hover:bg-yellow-500 border-0 text-white font-semibold w-full text-sm uppercase tracking-wide">
            {title}
          </summary>
          <ul className="menu dropdown-content bg-white text-black font-semibold p-2 shadow-lg rounded-box w-full z-10 mb-2">
            {items.map((item, index) => (
              <Link to={'/'} key={index} className="hover:bg-yellow-400 py-2 px-1 duration-300 rounded-box">
                <a className="text-sm">{item}</a>
              </Link>
            ))}
          </ul>
        </details>
      </div>
    </div>
  );
};

const BabyProductsLayout = () => {
  // Placeholder images - replace with your actual imports
  const babyImage1 = accessor;
  const babyImage2 = converts;
  const babyImage3 = fourth;
  const babyImage4 = fifth;
  const babyImage5 = clothes;

  return (
    <div className="max-w-6xl mx-auto md:mb-72 p-4">
      <div className="grid grid-cols-12 gap-2 h-96">
        {/* Left card - Accessories */}
        <ProductCard
          image={babyImage1}
          title="АКСЕССУАРЫ"
          items={["Пеленки", "Аксессуары", "Другие товары"]}
          className="col-span-3 row-span-1"
        />
        
        {/* Middle section */}
        <div className="col-span-6 grid grid-rows-2 gap-2">
          {/* Top middle card - Blankets */}
          <ProductCard
            image={babyImage2}
            title="КОНВЕРТЫ И ПЛЕДЫ"
            items={["Конверты и пледы", "Пеленки", "Аксессуары"]}
            className="row-span-1"
          />
          
          {/* Bottom middle - two cards side by side */}
          <div className="grid grid-cols-2 gap-2">
            <ProductCard
              image={babyImage3}
              title="ОДЕЖДА"
              items={["Боди", "Песочники"]}
            />
            
            <ProductCard
              image={babyImage4}
              title="ПЕЛЕНКИ"
              items={["Боди", "Песочники", "Материал и комфортность"]}
            />
          </div>
        </div>
        
        {/* Right card - Ready Gifts */}
        <ProductCard
          image={babyImage5}
          title="ГОТОВЫЕ ПОДАРКИ"
          items={["Готовые наборы", "Персональные подарки"]}
          className="col-span-3 row-span-1"
        />
      </div>
    </div>
  );
};

export default BabyProductsLayout;