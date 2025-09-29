import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "../assets/logo.png";
import Mir from "../assets/mir.png";
import Paykeeper from "../assets/paykeeper.png";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="">
      <div className="container mx-auto px-4 py-12">
        <div className="">
          <hr color="gray " />
          <div className="flex justify-around items-center py-5">
            <div className="flex items-center justify-around">
              <div className="text-gray-500">
                <p className="text-black font-bold">Главная</p>
                <p className="my-2">Как купить</p>
                <p className="">Доставка</p>
                <p className="my-2">О компании</p>
                <p className="">Мы в instagram</p>
                <p className="my-2">Акции</p>
                <p className="">Как купить</p>
              </div>
              <div className="text-gray-500 ml-20">
                <p className="">Как купить</p>
                <p className="my-2">Новости</p>
                <p className="">Отзывы</p>
                <p className="my-2">Контакты</p>
                <p className="">Лицензии</p>
                <p className="my-2">Оплата и возврат</p>
                <p className="">Условия доставки</p>
              </div>
            </div>
            <div className="">
              <div className="">
                <img src={Logo} alt="" className="" />
              </div>
              <p className="text-gray-400 font-light">2022 © «LalaSTORE»</p>
              <div className="flex items-center gap-10">
                <a href="https://bank.uz/uz/card/karta-mir-uz-mir-kartasi">
                  {" "}
                  <img src={Mir} alt="" className="" />
                </a>
                <a href="https://paykeeper.com/">
                  {" "}
                  <img src={Paykeeper} alt="" className="" />
                </a>
                <a href="https://www.mastercard.uz/ru-uz.html">
                  {" "}
                  <FaCcMastercard size={35} />
                </a>

                <a
                  href="https://cis.visa.com/visa-in-uzbekistan.html"
                  target="_blank"
                >
                  {" "}
                  <FaCcVisa size={35} />
                </a>
              </div>
              <p className="text-gray-500 font-light">
                ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
              </p>
            </div>
            <div className="text-gray-500">
              <p className=" flex items-center gap-2">
                <FaLocationDot color="black" />
                Адрес шоурума:, г. Москва, <br /> Электролитный проезд 3Б стр 6
              </p>
              <p className=" flex items-center gap-2">
                <MdEmail color="black" />
                info@lalastore.ru
              </p>
              <p className=" flex items-center gap-2">
                <FaPhoneAlt color="black" />
                +7 916 361-30-00
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
