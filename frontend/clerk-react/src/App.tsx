import NavBar from './components/NavBar';
import TraceLogicHomepage from './pages/HomePage';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main>
        <TraceLogicHomepage />
      </main>
    </div>
  );
}