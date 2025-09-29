  
import React from 'react';
import { Heart, Shield, Award, Users, Phone, Mail, MapPin, Building } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-100">
      <div className="container mx-auto px-4 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            О компании <span className="text-yellow-500">LalaStore</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Мы создаем качественную и безопасную детскую одежду, 
            которая приносит радость детям и спокойствие родителям
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <h2 className="text-3xl font-bold text-gray-900">Наша история</h2>
              <p className="text-gray-700 leading-relaxed">
                LalaStore была основана в 2018 году молодыми родителями, которые не смогли найти 
                качественную детскую одежду по доступным ценам. Мы поставили цель — 
                объединить высокое качество, безопасность и доступность.
              </p>
              <p className="text-gray-700 leading-relaxed">
                За годы работы мы стали одним из ведущих производителей детской одежды в Узбекистане, 
                завоевав доверие тысяч семей по всей стране.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Сегодня LalaStore — это команда профессионалов, которые каждый день работают над тем, 
                чтобы ваши дети были счастливы и комфортно одеты.
              </p>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1648375/pexels-photo-1648375.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="О нас"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { icon: <Heart className="h-8 w-8 text-pink-500" />, title: "Забота", desc: "Мы заботимся о каждом ребенке, создавая одежду с любовью" },
              { icon: <Shield className="h-8 w-8 text-green-500" />, title: "Безопасность", desc: "Только сертифицированные материалы, безопасные для кожи" },
              { icon: <Award className="h-8 w-8 text-yellow-500" />, title: "Качество", desc: "Строгий контроль качества на каждом этапе производства" },
              { icon: <Users className="h-8 w-8 text-blue-500" />, title: "Семья", desc: "Мы понимаем семьи и делаем жизнь родителей проще" },
            ].map((item, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-tr from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

س sojida, [27.09.2025 18:04]
{/* Stats Section */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-3xl p-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "5+", label: "лет на рынке" },
              { number: "10,000+", label: "довольных клиентов" },
              { number: "500+", label: "моделей одежды" },
              { number: "99%", label: "положительных отзывов" },
            ].map((stat, i) => (
              <div key={i} className="transform hover:scale-110 transition-transform duration-300">
                <div className="text-5xl font-extrabold mb-2">{stat.number}</div>
                <div className="text-yellow-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { name: "Алина Петрова", role: "Дизайнер", img: "https://randomuser.me/api/portraits/women/65.jpg" },
              { name: "Игорь Сидоров", role: "Маркетолог", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Светлана Иванова", role: "Менеджер по качеству", img: "https://randomuser.me/api/portraits/women/45.jpg" },
            ].map((member, i) => (
              <div key={i} className="bg-white shadow-lg rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                <img src={member.img} alt={member.name} className="w-28 h-28 mx-auto rounded-full mb-4 shadow-lg" />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-3xl p-10 shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Контактная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Info */}
            <div className="space-y-4">
              <p className="flex items-center text-gray-700"><Building className="mr-3 text-yellow-500" /> ООО "СБВ ГРУПП"</p>
              <p className="text-gray-700">ИНН / КПП: <span className="font-semibold">7713795458 / 771701001</span></p>
              <p className="text-gray-700">ОГРН: <span className="font-semibold">5147746119220</span></p>
              <p className="flex items-center text-gray-700"><MapPin className="mr-3 text-red-500" /> г. Москва, Электролитный проезд, д. 3Б, стр. 6</p>
              <p className="flex items-center text-gray-700"><Phone className="mr-3 text-green-500" /> +7 916 361-30-00</p>
              <p className="flex items-center text-gray-700"><Mail className="mr-3 text-blue-500" /> lalastore.ru@yandex.ru</p>
            </div>

            {/* Map */}
            <div>
              <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A1c77df12c1d3cfcf09c7b8a94f9d5a8f9e&source=constructor" 
                width="100%" 
                height="300" 
                frameBorder="0" 
                className="rounded-2xl shadow-lg"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;