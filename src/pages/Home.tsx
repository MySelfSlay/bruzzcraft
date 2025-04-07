import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  Copy, Check, Construction, ChevronDown,
  Sword, Gamepad, Shield, Zap, Users, Heart, Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import Navigation from '../components/Navigation';

function Home() {
  const [copied, setCopied] = useState(false);
  const [bedrockCopied, setBedrockCopied] = useState(false);
  const [showBedrockIP, setShowBedrockIP] = useState(false);
  const serverIP = 'bruzzcraft.xyz';
  const [showIPModal, setShowIPModal] = useState(false);
  const [copyStatus, setCopyStatus] = useState<{ java: 'initial' | 'copied', bedrock: 'initial' | 'copied' }>({
    java: 'initial',
    bedrock: 'initial',
  });

  const { ref: page1Ref, inView: page1InView } = useInView({ threshold: 0.5 });
  const { ref: page2Ref, inView: page2InView } = useInView({ threshold: 0.5 });
  const { ref: page3Ref, inView: page3InView } = useInView({ threshold: 0.5 });

  const javaIP = "bruzzcraft.xyz";
  const bedrockIP = "play.bruzzcraft.xyz:19132";

  const handleCopyToClipboard = (ip: string, type: 'java' | 'bedrock') => {
    navigator.clipboard.writeText(ip).then(() => {
      setCopyStatus(prevStatus => ({
        ...prevStatus,
        [type]: 'copied',
      }));
      setTimeout(() => {
        setCopyStatus(prevStatus => ({
          ...prevStatus,
          [type]: 'initial',
        }));
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy IP: ", err);
      alert("Failed to copy IP. Please copy manually: " + ip);
    });
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const buttonVariants = {
    initial: { backgroundColor: '#1f2937', text: 'Copy IP' },
    copied: { backgroundColor: '#4ade80', text: 'Copied!', transition: { duration: 0.2 } },
  };

  return (
    <>
      <Navigation />

      {/* Background Image */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/images/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.4) blur(3px)',
        }}
      />

      {/* Page 1 */}
      <section 
        ref={page1Ref} 
        className="min-h-screen flex flex-col relative snap-start px-4 md:px-0 z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
        
        <div className={`flex-1 flex flex-col items-center justify-center transition-all duration-1000 relative z-10 ${page1InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Server Logo */}
          <div className="mb-8 animate-float">
            <Icon icon="mdi:creeper" className="w-16 h-16 md:w-24 md:h-24 text-red-500 mx-auto" />
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-4">
              <img 
                src="/images/logo_big.png" 
                alt="BruzzCraft" 
                className="h-16 md:h-24 lg:h-32 w-auto object-contain mx-auto hover:opacity-90 transition-opacity"
                loading="eager"
                decoding="async"
              />
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
              "Made by the Bruzz for the Bruzz"
            </p>
          </div>

          <motion.button
            onClick={() => setShowIPModal(true)}
            className="flex items-center space-x-2 bg-red-500/80 hover:bg-red-400 text-white py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 backdrop-blur-sm shadow-lg shadow-red-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play size={16} />
            <span>Join Now</span>
          </motion.button>

          {/* Scroll Arrow */}
          <motion.div
            className="mt-12 text-zinc-400 hover:text-red-500 transition-colors duration-300 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>

        <AnimatePresence>
          {showIPModal && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShowIPModal(false)}
            >
              <motion.div
                className="bg-gradient-to-b from-zinc-900/95 to-black/95 rounded-2xl p-8 max-w-md w-full mx-4 border border-red-500/20 shadow-2xl shadow-red-500/10"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex flex-col items-center space-y-8">
                  {/* Logo */}
                  <img 
                    src="/images/logo_big.png" 
                    alt="BruzzCraft" 
                    className="h-12 w-auto object-contain"
                    loading="eager"
                    decoding="async"
                  />

                  {/* Java Edition */}
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-sm text-zinc-400 mb-2 ml-1">Java Edition</div>
                    <button
                      onClick={() => handleCopyToClipboard(javaIP, 'java')}
                      className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 p-4 border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-red-500/10 group-hover:to-red-500/5 transition-all duration-300" />
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg">{javaIP}</span>
                        {copyStatus.java === 'copied' ? 
                          <Check size={20} className="text-green-500" /> : 
                          <Copy size={20} className="text-zinc-400 group-hover:text-red-400" />
                        }
                      </div>
                    </button>
                  </motion.div>

                  {/* Bedrock Edition */}
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-sm text-zinc-400 mb-2 ml-1">Bedrock Edition</div>
                    <button
                      onClick={() => handleCopyToClipboard(bedrockIP, 'bedrock')}
                      className="w-full group relative overflow-hidden rounded-xl bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 p-4 border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-red-500/10 group-hover:to-red-500/5 transition-all duration-300" />
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-lg">{bedrockIP}</span>
                        {copyStatus.bedrock === 'copied' ? 
                          <Check size={20} className="text-green-500" /> : 
                          <Copy size={20} className="text-zinc-400 group-hover:text-red-400" />
                        }
                      </div>
                    </button>
                  </motion.div>

                  {/* Close Button */}
                  <motion.button
                    onClick={() => setShowIPModal(false)}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold shadow-lg shadow-red-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Page 2 - Server Description & Gamemodes */}
      <section id="features" ref={page2Ref} className="min-h-screen flex flex-col items-center justify-center px-4 md:px-20 snap-start py-10 md:py-0 bg-gradient-to-b from-black/90 via-zinc-900/90 to-black/90 relative z-10">
        <div className={`max-w-6xl mx-auto grid grid-cols-1 gap-8 md:gap-12 transition-all duration-1000 ${page2InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Gamemodes
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 md:mb-12">
              Dive in and enjoy the BruzzCraft experience!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <motion.div
              className="gamemode-card backdrop-blur-sm bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-red-500/30 hover:bg-zinc-700/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <Icon icon="mdi:pickaxe" className="w-10 h-10 md:w-12 md:h-12 text-red-500 mb-4 animate-pulse-glow" />
              <h3 className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                SMP
              </h3>
              <p className="text-gray-300">Custom biomes, endless adventures, and limitless exploration!</p>
            </motion.div>

            <motion.div
              className="gamemode-card backdrop-blur-sm bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-red-500/30 hover:bg-zinc-700/50 transition-all duration-300 opacity-50 cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
            >
              <Construction className="w-10 h-10 md:w-12 md:h-12 text-zinc-400 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Creative</h3>
              <p className="text-gray-400">Coming Soon</p>
            </motion.div>

            <motion.div
              className="gamemode-card backdrop-blur-sm bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-red-500/30 hover:bg-zinc-700/50 transition-all duration-300 opacity-50 cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
            >
              <Sword className="w-10 h-10 md:w-12 md:h-12 text-zinc-400 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Bedwars</h3>
              <p className="text-gray-400">Coming Soon</p>
            </motion.div>

            <motion.div
              className="gamemode-card backdrop-blur-sm bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-red-500/30 hover:bg-zinc-700/50 transition-all duration-300 opacity-50 cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
            >
              <Gamepad className="w-10 h-10 md:w-12 md:h-12 text-zinc-400 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">Duels</h3>
              <p className="text-gray-400">Coming Soon</p>
            </motion.div>
          </div>

          <div className="text-center mt-6 md:mt-8">
            <p className="text-lg md:text-xl text-gray-500">More exciting game modes in development!</p>
          </div>
        </div>
      </section>

      {/* Page 3 - Server Features */}
      <section ref={page3Ref} className="min-h-screen py-16 md:py-20 px-4 md:px-10 snap-start bg-gradient-to-b from-black/90 via-zinc-900/90 to-black/90 relative z-10">
        <div className={`transition-all duration-1000 max-w-7xl mx-auto ${page3InView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
              Server Features
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the best of both worlds with our cross-platform support
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <motion.div
              className="backdrop-blur-sm bg-zinc-800/50 p-6 md:p-8 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-red-500 mb-4 md:mb-6" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Active Staff</h3>
              <p className="text-gray-300">Our dedicated team ensures a safe and enjoyable experience for everyone</p>
            </motion.div>

            <motion.div
              className="backdrop-blur-sm bg-zinc-800/50 p-6 md:p-8 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Zap className="w-10 h-10 md:w-12 md:h-12 text-red-500 mb-4 md:mb-6" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">No Lag</h3>
              <p className="text-gray-300">Optimized performance for smooth gameplay across all devices</p>
            </motion.div>

            <motion.div
              className="backdrop-blur-sm bg-zinc-800/50 p-6 md:p-8 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <Users className="w-10 h-10 md:w-12 md:h-12 text-red-500 mb-4 md:mb-6" />
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Cross-Play</h3>
              <p className="text-gray-300">Play together with friends on Java or Bedrock Edition</p>
            </motion.div>
          </div>

          <motion.div
            className="mt-16 md:mt-20 text-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">Ready to start your journey?</p>
            <div className="inline-flex items-center space-x-2 text-red-500 animate-bounce">
              <Heart className="w-5 h-5 md:w-6 md:h-6 animate-impulse" />
              <span>Join our growing community today</span>
              <Heart className="w-5 h-5 md:w-6 md:h-6 animate-impulse" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default Home;