import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet

const BlockFour = () => {
  // Create a custom icon for the marker to avoid the default icon issue
  const customIcon = new L.Icon({
    iconUrl: '/marker-icon.png', // Path to the marker icon in the public folder
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: '/marker-shadow.png', // Path to the marker shadow
    shadowSize: [41, 41],
  });

  return (
    <div >
      <h2 className="text-3xl font-semibold mb-6">Адрес шоурума</h2>
      <div className="w-full h-[600px] relative rounded-lg overflow-hidden shadow-lg">

        <MapContainer
          center={[55.751244, 37.618423]} // Moscow coords
          zoom={11}
          style={{ height: "100%", width: "100%" }}
          className="absolute z-40"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className=""
          />
          <Marker position={[55.751244, 37.618423]} icon={customIcon}>
            <Popup>Это Москва!</Popup>
          </Marker>
        </MapContainer>
          {/* Info Box */}
          <div className="absolute z-50  top-20 left-20 bg-white p-6 rounded-lg shadow-md max-w-md w-full text-gray-700 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-500 text-sm">Адрес шоурума:</h3>
              <p className="text-base font-medium">г. Москва, Электролитный проезд 3Б стр 6</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500 text-sm">Метро:</h3>
              <p className="text-base font-medium">Нагорная</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500 text-sm">Режим работы:</h3>
              <p className="text-base font-medium">Вторник-суббота: 10:00-19:00</p>
              <p className="text-sm text-gray-400 mt-1">Воскресенье, понедельник — выходной</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500 text-sm">Телефон:</h3>
              <p className="text-base font-medium">+7 916 361-30-00</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-500 text-sm">Почта:</h3>
              <p className="text-base font-medium">info@lalastore.ru</p>
            </div>

            <p className="border-l-4 border-gray-300 pl-4 text-sm text-gray-500 italic">
              Пожалуйста, свяжитесь с нами перед посещением, чтобы мы могли согласовать время вашего визита и наличие товаров.
            </p>

            <button className="mt-3 py-2 px-6 bg-yellow-400 text-white font-semibold rounded-full hover:bg-yellow-500 transition">
              Написать нам
            </button>
          </div>
        </div>
      </div>
  );
};

export default BlockFour;
