import React, { useState, useEffect } from 'react';
import { FaInstagram, FaXTwitter, FaYoutube, FaDiscord } from "react-icons/fa6";
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SocialBar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const { ref: page3Ref, inView: page3InView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const handleSidebarState = (event: CustomEvent) => {
      setIsVisible(!event.detail.isOpen);
    };

    window.addEventListener('sidebarStateChange', handleSidebarState as EventListener);

    return () => {
      window.removeEventListener('sidebarStateChange', handleSidebarState as EventListener);
    };
  }, []);

  // Only render the SocialBar on the homepage (path === "/")
  if (location.pathname !== "/") {
    return null;
  }

  return (
    <>
      <div ref={page3Ref} className="h-1 w-1 absolute bottom-0" />
      <AnimatePresence>
        {isVisible && page3InView && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-transparent z-50 py-3"
          >
            <div className="flex justify-center items-center space-x-8 max-w-7xl mx-auto px-4">
              <motion.a
                href="https://www.instagram.com/bruzzcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={22} />
              </motion.a>
              <motion.a
                href="https://x.com/bruzzcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaXTwitter size={22} />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/@playbruzzcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaYoutube size={22} />
              </motion.a>
              <motion.a
                href="https://dsc.gg/bruzzcraft"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaDiscord size={22}/>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialBar;