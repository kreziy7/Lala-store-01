import React from 'react';
import { Heart, Shield, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">О компании LalaStore</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаем качественную и безопасную детскую одежду, которая приносит радость детям и спокойствие родителям
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <p className="text-gray-600 mb-4">
                LalaStore была основана в 2018 году молодыми родителями, которые не смогли найти 
                качественную детскую одежду по доступным ценам. Мы поставили перед собой цель - 
                создать бренд, который объединит в себе высокое качество, безопасность и доступность.
              </p>
              <p className="text-gray-600 mb-4">
                За годы работы мы стали одним из ведущих производителей детской одежды в Узбекистане, 
                завоевав доверие тысяч семей по всей стране.
              </p>
              <p className="text-gray-600">
                Сегодня LalaStore - это команда профессионалов, которые каждый день работают над тем, 
                чтобы ваши дети были счастливы и комфортно одеты.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1648375/pexels-photo-1648375.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="О нас"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Забота</h3>
              <p className="text-gray-600">
                Мы заботимся о каждом ребенке, создавая одежду с любовью и вниманием к деталям
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Безопасность</h3>
              <p className="text-gray-600">
                Используем только сертифицированные материалы, безопасные для детской кожи
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Качество</h3>
              <p className="text-gray-600">
                Каждое изделие проходит строгий контроль качества на всех этапах производства
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Семья</h3>
              <p className="text-gray-600">
                Мы понимаем потребности семей и создаем продукты, которые делают жизнь легче
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-yellow-400 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-yellow-100">лет на рынке</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-yellow-100">довольных клиентов</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-yellow-100">моделей одежды</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-yellow-100">положительных отзывов</div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша миссия</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Обеспечить каждого ребенка качественной, безопасной и красивой одеждой, 
            которая способствует его здоровому развитию и приносит радость каждый день.
          </p>
          <p className="text-gray-600">
            Мы стремимся стать ведущим брендом детской одежды в регионе, 
            устанавливая новые стандарты качества и заботы о детях.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;