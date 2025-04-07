import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Star } from 'lucide-react';
import { motion } from 'framer-motion';

function About() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <motion.div
      className={`min-h-screen bg-gradient-to-b from-black to-zinc-900 p-4 md:p-8 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl w-full mb-8">
        <Link 
          to="/"
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <img 
              src="/images/logo_big.png" 
              alt="BruzzCraft" 
              className="h-16 md:h-24 w-auto object-contain mx-auto hover:opacity-90 transition-opacity"
              loading="eager"
              decoding="async"
            />
          </h1>
          <p className="text-xl text-gray-400">Our story and mission</p>
        </motion.div>

        <div className="space-y-8">
          <motion.div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700/50" variants={itemVariants}>
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Our Beginning</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              It all started when we decided to revisit Minecraft, diving back into the blocky world we loved. We hosted our first server on Aternos, but the unbearable lag made gameplay frustrating. That's when we realized — we needed something better. Motivated by this, we set out to create a smoother, more reliable server — and that's how this journey began.
            </p>
          </motion.div>

          <motion.div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700/50" variants={itemVariants}>
            <div className="flex items-center mb-6">
              <Star className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Our goal is simple: to provide players with a hassle-free platform where they can jump in and play with friends without the struggles of setting up an Aternos server. We've built this server to be smoother, faster, and far more enjoyable — so you can focus on the fun.
            </p>
          </motion.div>

          <motion.div className="bg-zinc-800/50 rounded-xl p-8 border border-zinc-700/50" variants={itemVariants}>
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-red-500 mr-4" />
              <h2 className="text-2xl font-bold">Our Community</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Our community is growing stronger every day — a friendly space where players connect, collaborate, and create memories together. Whether you're a seasoned builder or a new adventurer, there's always a place for you here.
            </p>
          </motion.div>

          <motion.blockquote className="border-l-4 border-red-500 pl-6 my-8" variants={itemVariants}>
            <p className="text-2xl font-semibold text-gray-300 italic">
              "Made by the Bruzz for the Bruzz"
            </p>
            <p className="text-gray-500 mt-2">- The BruzzCraft Team</p>
          </motion.blockquote>
        </div>
      </div>
    </motion.div>
  );
}

export default About;