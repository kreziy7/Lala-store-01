import React from 'react';

const Collections = ({ 
  products = [
    { id: 1, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/5982376/pexels-photo-5982376.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Beige and brown
    { id: 2, name: 'Baby Outfit', image: 'https://cdn.pixabay.com/photo/2019/03/12/12/30/baby-clothes-4056011_1280.jpg' }, // Animal print
    { id: 3, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/5982373/pexels-photo-5982373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Yellow and blue
    { id: 4, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/16681603/pexels-photo-16681603.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Green patterns
    { id: 5, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/32410088/pexels-photo-32410088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Pink blanket
    { id: 6, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/19163668/pexels-photo-19163668.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Yellow romper
    { id: 7, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/4858394/pexels-photo-4858394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Blue hoodie
    { id: 8, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/32233693/pexels-photo-32233693.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Pink onesie
    { id: 9, name: 'Baby Outfit', image: 'https://cdn.pixabay.com/photo/2021/03/01/17/30/baby-6058718_1280.jpg' }, // More varied
    { id: 10, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/7988714/pexels-photo-7988714.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Beige set
    { id: 11, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/5982378/pexels-photo-5982378.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Animal print
    { id: 12, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/30791355/pexels-photo-30791355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Green
    { id: 13, name: 'Baby Outfit', image: 'https://cdn.pixabay.com/photo/2022/05/18/19/16/baby-7204207_1280.jpg' }, // Blue set
    { id: 14, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/3875080/pexels-photo-3875080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Pink
    { id: 15, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/5088022/pexels-photo-5088022.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // Colorful
    { id: 16, name: 'Baby Outfit', image: 'https://images.pexels.com/photos/16100336/pexels-photo-16100336.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }, // More
  ] 
}) => {
  return (
    <div className="min-h-screen bg-white font-sans px-4">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 my-6">
        Готовые подборки 92
      </h1>

      {/* Masonry layout */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            className="mb-4 relative w-full break-inside-avoid rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg"
            onClick={() => console.log(`Clicked on product №${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
            {/* Номер */}
            <div className="absolute bottom-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded font-bold">
              №{product.id}
            </div>
            {/* Источник */}
            <div className="absolute bottom-0 right-0 text-xs text-gray-500 pr-2 pb-1">
              @lalastore.ru
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Collections;
