import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import BrandsPage from './pages/BrandsPage';
import ContactPage from './pages/ContactPage';

import './index.css';
import ScrollToTop from './helpers/ScrollToTop';

import fs from "fs";
function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)' }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout><HomePage /></Layout>} />
          <Route path="/about" element={<Layout><AboutPage /></Layout>} />
          <Route path="/brands" element={<Layout><BrandsPage /></Layout>} />
          <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
          {/* <Route path="/solutions" element={<Layout><SolutionsPage /></Layout>} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

