import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import TraceLogicHomepage from './pages/HomePage';
import Career from './pages/Career';
import TeamPage from './pages/Team';
import Footer from './components/ui/Footer';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TraceLogicHomepage />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/reports" element={<div>Reports Page</div>} />
            <Route path="/analytics" element={<div>Analytics Page</div>} />
            <Route path="/dashboards" element={<div>Dashboards Page</div>} />
            <Route path="/integrations" element={<div>Integrations Page</div>} />
            <Route path="/resources" element={<div>Resources Page</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}