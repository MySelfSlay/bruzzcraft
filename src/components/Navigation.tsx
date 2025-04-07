import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/' && window.scrollY === 0) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    if (location.pathname === '/') {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  useEffect(() => {
    if (location.pathname === '/') {
      setShowNav(true);
    }
  }, [location.pathname]);

  const handleSidebarOpen = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
    window.dispatchEvent(new CustomEvent('sidebarStateChange', { detail: { isOpen } }));
  };

  return (
    <>
      <AnimatePresence>
        {showNav && (
          <motion.nav
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -100, transition: { duration: 0.3 }}}
          >
            <div className="px-5">
              <div className="flex items-center h-20">
                <div className="flex items-center space-x-5">
                  <button
                    onClick={() => handleSidebarOpen(true)}
                    className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Menu size={24} />
                  </button>
                  <Link
                    to="/"
                    className="transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <Sidebar isOpen={isSidebarOpen} onClose={() => handleSidebarOpen(false)} />
    </>
  );
};

export default Navigation;