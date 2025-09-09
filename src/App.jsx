import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Collections from './pages/Collections';
import CollectionDetail from './pages/CollectionDetail';
import Delivery from './pages/Delivery';
import About from './pages/About';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Contacts from './pages/Contacts';
import Reviews from './pages/Reviews';
import SearchResults from './pages/SearchResults';
import PaymentReturn from './pages/PaymentReturn';
import ShippingTerms from './pages/ShippingTerms';
import HowToBuy from './pages/HowToBuy';
import Licenses from './pages/Licenses';
import QuickOrder from './pages/QuickOrder.jsx';
import OrderHistory from './pages/OrderHistory';
import ChangePassword from './pages/ChangePassword';
import Subscriptions from './pages/Subscriptions';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:id" element={<CollectionDetail />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/about" element={<About />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/payment-return" element={<PaymentReturn />} />
                <Route path="/shipping" element={<ShippingTerms />} />
                <Route path="/how-to-buy" element={<HowToBuy />} />
                <Route path="/licenses" element={<Licenses />} />
                <Route path="/quick-order" element={<QuickOrder />} />
                <Route path="/change-password" element={<ChangePassword />} />
                
                {/* Protected routes */}
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/order-history"
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/subscriptions"
                  element={
                    <ProtectedRoute>
                      <Subscriptions />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;