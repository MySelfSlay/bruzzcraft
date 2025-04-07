import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Book, Signal, Users, BookOpen } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Info, label: 'About', path: '/about' },
  { icon: Book, label: 'Rules', path: '/rules' },
  { icon: Signal, label: 'Status', path: '/status' },
  { icon: BookOpen, label: 'Guide', path: '/guide' },
  { icon: Users, label: 'Social', path: '/social' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0.5 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-zinc-900/95 to-black/95 backdrop-blur-md z-50 flex flex-col"
          >
            {/* Header */}
            <div className="py-6 px-6 flex items-center justify-center border-b border-red-500/10">
              <Link
                to="/"
                onClick={onClose}
                className="w-full flex items-center justify-center transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src="/images/logo_small.png"
                  alt="BruzzCraft Logo"
                  className="w-36 h-auto object-contain filter brightness-105 hover:brightness-110 transition-all duration-300"
                  loading="eager"
                  decoding="async"
                />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="px-4 space-y-2">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className="flex items-center px-4 py-3 text-zinc-400 hover:text-white rounded-lg hover:bg-red-500/10 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-red-500/10 group-hover:to-red-500/5 transition-all duration-300" />
                      <item.icon size={20} className="flex-shrink-0" />
                      <span className="ml-3 flex-1 font-medium">{item.label}</span>
                      <div className="w-1 h-1 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-red-500/10">
              <div className="text-center">
                <p className="text-sm text-zinc-500">
                  Made by the Bruzz for the Bruzz
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;