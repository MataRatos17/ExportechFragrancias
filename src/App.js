import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Stats from './components/Stats';
import FeaturedProducts from './components/FeaturedProducts';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import CookieConsent from './components/CookieConsent';
import Segmentos from './pages/Segmentos';
import Sobre from './pages/Sobre';
import Contactos from './pages/Contactos';
import Perfil from './pages/Perfil';
import Difusores from './pages/Difusores';
import Fragrancias from './pages/Fragrancias';
import PoliticaPrivacidade from './pages/PoliticaPrivacidade';
import Aromaterapia from './pages/Aromaterapia';

const Home = () => (
  <div className="min-h-screen bg-[#0a0a0a]">
    <Header />
    <main>
      <Hero />
      <Categories />
      <Stats />
      <FeaturedProducts />
      <Testimonials />
    </main>
    <Footer />
    <FloatingChat />
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/segmentos" element={<Segmentos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/aromaterapia" element={<Aromaterapia />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/difusores" element={<Difusores />} />
          <Route path="/fragrancias" element={<Fragrancias />} />
          <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
