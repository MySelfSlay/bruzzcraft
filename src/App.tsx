import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SocialBar from './components/SocialBar';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Status = lazy(() => import('./pages/Status'));
const About = lazy(() => import('./pages/About'));
const Rules = lazy(() => import('./pages/Rules'));
const Guide = lazy(() => import('./pages/Guide'));
const Social = lazy(() => import('./pages/Social'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="animate-pulse text-red-500 text-2xl">Loading...</div>
  </div>
);

// Layout component to wrap routes
const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    {children}
    <SocialBar />
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen relative">
        <Suspense fallback={<LoadingFallback />}>
          <div className="relative z-10">
            <Routes>
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/status" element={<Layout><Status /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/rules" element={<Layout><Rules /></Layout>} />
              <Route path="/guide" element={<Layout><Guide /></Layout>} />
              <Route path="/social" element={<Layout><Social /></Layout>} />
            </Routes>
          </div>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;