import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import TraceLogicHomepage from './pages/HomePage';
import CareerPage from './pages/Career'; // Renamed from Career to CareerPage
import TeamPage from './pages/Team';
import Footer from './components/ui/Footer';
import AboutPage from './pages/AboutPage';
import AddProduct from './pages/AddProduct';
import TrackProduct from './pages/TrackProduct';
import MainPage from './pages/Main';
import ProductsPage from './pages/ProductPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<TraceLogicHomepage />} />
            <Route path="/career" element={<CareerPage />} /> {/* Updated to CareerPage */}
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/track-product" element={<TrackProduct />} />
            <Route path="/Main" element={<MainPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/reports" element={<div>Reports Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            <Route path="/integrations" element={<div>Integrations Page</div>} />
            <Route path="/resources" element={<div>Resources Page</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}