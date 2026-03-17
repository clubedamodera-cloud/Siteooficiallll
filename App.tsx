

import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { CheckoutProvider } from './context/CheckoutContext';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider } from './context/StoreContext'; // Nova importação
import Layout from './components/Layout';
import SuspenseFallback from './components/SuspenseFallback';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import TrackingSection from './pages/account/TrackingSection';

// Páginas
const Home = lazy(() => import('./pages/Home'));
const Catalog = lazy(() => import('./pages/Catalog'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Favorites = lazy(() => import('./pages/Favorites'));
const CustomerLogin = lazy(() => import('./pages/CustomerLogin'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const ExchangePolicy = lazy(() => import('./pages/ExchangePolicy'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const CustomerRegistration = lazy(() => import('./pages/CustomerRegistration'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Payment = lazy(() => import('./pages/Payment'));
const TrackOrder = lazy(() => import('./pages/TrackOrder'));
// Área do Cliente
const AccountLayout = lazy(() => import('./pages/account/AccountLayout'));
const MyOrders = lazy(() => import('./pages/account/MyOrders'));
const Installments = lazy(() => import('./pages/account/Installments'));
const MyData = lazy(() => import('./pages/account/MyData'));

// Componente simples para proteger rotas admin
// FIX: Changed component definition to use React.FC for typing consistency.
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdminAuthenticated'); // Usamos uma chave diferente
  return isAdmin === 'true' ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

// Se estiver na Vercel, ele usa apenas '/api', que é o que seu vercel.json entende.
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:3001' 
  : ''; // Removido o localhost fixo

function App() {
  return (
    <StoreProvider>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <CheckoutProvider>
              <HashRouter>
                <ScrollToTop />
                <Suspense fallback={<SuspenseFallback />}>
                  <Routes>
                    {/* Rotas da Loja */}
                    <Route path="/" element={<Layout />}>
                      <Route index element={<Home />} />
                      <Route path="catalogo" element={<Catalog />} />
                      <Route path="produto/:id" element={<ProductDetail />} />
                      <Route path="carrinho" element={<Cart />} />
                      <Route path="sobre-nos" element={<About />} />
                      <Route path="contato" element={<Contact />} />
                      <Route path="favoritos" element={<Favorites />} />
                      <Route path="area-do-cliente" element={<CustomerLogin />} />
                      <Route path="politica-de-privacidade" element={<PrivacyPolicy />} />
                      <Route path="termos-de-servico" element={<TermsOfService />} />
                      <Route path="politica-de-trocas" element={<ExchangePolicy />} />
                      <Route path="forgot-password" element={<ForgotPassword />} />
                      <Route path="cadastro" element={<CustomerRegistration />} />
                      <Route path="checkout" element={<Checkout />} />
                      <Route path="confirmacao-pedido" element={<OrderConfirmation />} />
                      <Route path="pagamento" element={<Payment />} />
                      <Route path="rastrear-pedido" element={<TrackOrder />} />

                      <Route path="minha-conta" element={<ProtectedRoute />}>
                        <Route path="/minha-conta" element={<AccountLayout />}>
                          <Route path="meus-dados" element={<MyData />} />
                          <Route path="meus-pedidos" element={<MyOrders />} />
                          <Route path="vencimentos" element={<Installments />} />
                          <Route path="rastreio" element={<TrackingSection />} />
                        </Route>
                      </Route>
                    </Route>

                    {/* Rotas do Painel Admin */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <AdminProtectedRoute>
                          <AdminDashboard />
                        </AdminProtectedRoute>
                      }
                    />

                    {/* Redirecionamento para rotas não encontradas */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </HashRouter>
            </CheckoutProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </StoreProvider>
  );
}

export default App;