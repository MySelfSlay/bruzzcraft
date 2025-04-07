import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

// Lazy load the App component
const App = lazy(() => import('./App'));

// Loading component with skeleton UI
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="animate-pulse space-y-8 w-full max-w-md">
      <div className="h-12 bg-zinc-800 rounded-lg"></div>
      <div className="space-y-3">
        <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
        <div className="h-4 bg-zinc-800 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

// Preload critical components
const preloadComponents = () => {
  const components = [
    import('./pages/Home'),
    import('./pages/About'),
    import('./pages/Status'),
    import('./components/Navigation'),
    import('./components/SocialBar')
  ];
  
  Promise.all(components).catch(console.error);
};

// Start preloading after initial render
setTimeout(preloadComponents, 1000);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>
);

// Report web vitals
onCLS(console.log);
onFID(console.log);
onFCP(console.log);
onLCP(console.log);
onTTFB(console.log);