import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FaInstagram, FaXTwitter, FaYoutube, FaDiscord } from "react-icons/fa6";
import { Heart } from 'lucide-react';

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: typeof FaInstagram; label: string }) => {
  // Function to format the URL
  const formatUrl = (url: string) => {
    return url.replace(/https?:\/\/(www\.)?/g, '');
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-4 bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-red-500/30 hover:bg-zinc-700/50 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon size={24} className="text-red-500" />
      <div>
        <h3 className="text-xl font-semibold text-white">{label}</h3>
        <p className="text-zinc-400 text-sm">{formatUrl(href)}</p>
      </div>
    </motion.a>
  );
};

const Social = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 p-4 md:p-8">
      <div className="max-w-6xl w-full mb-8">
        <Link 
          to="/"
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <motion.div
        className="max-w-2xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Connect With Us
          </span>
        </motion.h1>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SocialLink
              href="https://dsc.gg/bruzzcraft"
              icon={FaDiscord}
              label="Discord"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <SocialLink
              href="https://instagram.com/bruzzcraft"
              icon={FaInstagram}
              label="Instagram"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SocialLink
              href="https://youtube.com/@playbruzzcraft"
              icon={FaYoutube}
              label="YouTube"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SocialLink
              href="https://x.com/bruzzcraft"
              icon={FaXTwitter}
              label="X (Twitter)"
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 md:mt-20 text-center"
          variants={itemVariants}
        >
          <div className="inline-flex items-center space-x-2 text-red-500 animate-bounce">
            <Heart className="w-5 h-5 md:w-6 md:h-6 animate-impulse" />
            <span>Follow us to stay updated</span>
            <Heart className="w-5 h-5 md:w-6 md:h-6 animate-impulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Social;
