import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

const Guide = () => {
  const modpack = {
    title: 'Remarkably Optimized Modpack',
    description: 'A lightweight, performance-focused modpack.',
    url: 'https://modrinth.com/modpack/remarkably',
  };

  const shaders = [
    {
      title: 'BSL Shaders',
      description: 'A high-performance shader with a classic look.',
      url: 'https://modrinth.com/shader/bsl-shaders',
    },
    {
      title: 'Bliss Shaders',
      description: 'A modern shader with advanced visual effects.',
      url: 'https://modrinth.com/shader/bliss-shader',
    },
  ];

  const mods = [
    {
      title: 'Journeymap',
      description: 'A real-time map mod for your Minecraft world.',
      url: 'https://modrinth.com/mod/journeymap',
    },
    {
      title: 'Simple Voice Chat',
      description: 'Adds proximity-based voice chat to your server.',
      url: 'https://modrinth.com/plugin/simple-voice-chat',
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const disclaimerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.1,
        type: "spring",
        stiffness: 120,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 p-4 md:p-8">
      <div className="max-w-6xl w-full mb-8">
        <Link to="/" className="inline-flex items-center text-zinc-400 hover:text-red-500 transition-colors">
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Disclaimer */}
        <motion.div
          variants={disclaimerVariants}
          initial="hidden"
          animate="visible"
          className="bg-red-600/20 border border-red-500/50 rounded-lg p-4 flex items-center justify-center mb-8"
        >
          <AlertTriangle className="text-red-500 mr-2" />
          <p className="text-red-400 text-sm">
            <strong className="text-red-300">Important:</strong> Mods are optional but enhance the experience. Do not use mods that give unfair advantages.
          </p>
        </motion.div>

        {/* Recommended Modpack */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-semibold text-center mb-6"
        >
          Recommended Modpack
        </motion.h2>
        <motion.div
          className="bg-zinc-900/70 rounded-lg p-5 shadow-lg transition-all duration-300 hover:bg-zinc-800/70"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div>
            <h3 className="text-xl font-semibold text-zinc-200">{modpack.title}</h3>
            <p className="text-zinc-400 mt-1 text-sm">{modpack.description}</p>
            <a
              href={modpack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center text-red-400 hover:text-red-500 transition-colors"
            >
              Get it here &rarr;
            </a>
          </div>
        </motion.div>

        {/* Recommended Shaders */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-semibold text-center mt-12 mb-6"
        >
          Recommended Shaders
        </motion.h2>
        <div className="space-y-4">
          {shaders.map((shader, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900/70 rounded-lg p-5 shadow-lg transition-all duration-300 hover:bg-zinc-800/70"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index + 1}
            >
              <div>
                <h3 className="text-xl font-semibold text-zinc-200">{shader.title}</h3>
                <p className="text-zinc-400 mt-1 text-sm">{shader.description}</p>
                <a
                  href={shader.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-red-400 hover:text-red-500 transition-colors"
                >
                  Get it here &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>

         {/* Shader Note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-zinc-400 text-center mt-8"
          >
            <strong className="text-red-400">Shader Note:</strong> Pick shaders based on your PC’s power—strong PCs can handle more!
          </motion.p>

        {/* Recommended Mods */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-3xl font-semibold text-center mt-12 mb-6"
        >
          Recommended Mods
        </motion.h2>
        <div className="space-y-4">
          {mods.map((mod, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900/70 rounded-lg p-5 shadow-lg transition-all duration-300 hover:bg-zinc-800/70"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index + 3}
            >
              <div>
                <h3 className="text-xl font-semibold text-zinc-200">{mod.title}</h3>
                <p className="text-zinc-400 mt-1 text-sm">{mod.description}</p>
                <a
                  href={mod.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-red-400 hover:text-red-500 transition-colors"
                >
                  Get it here &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guide;
