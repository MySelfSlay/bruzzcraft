import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Server, WifiOff, Wifi, Users, Globe, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServerStatus {
  online: boolean;
  players?: {
    online: number;
    max: number;
  };
  version?: string;
}

function Status() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkStatus = async () => {
    setIsChecking(true);
    setIsRefreshing(true);
    try {
      const response = await fetch('https://api.mcsrvstat.us/2/bruzzcraft.xyz');
      const data = await response.json();
      setStatus({
        online: data.online,
        players: data.players,
        version: data.version
      });
    } catch (error) {
      console.error("Error checking server status:", error);
      setStatus({ online: false });
    } finally {
      setTimeout(() => {
        setIsChecking(false);
        setTimeout(() => setIsRefreshing(false), 300);
      }, 1000);
    }
  };

  useEffect(() => {
    checkStatus();
    const intervalId = setInterval(checkStatus, 30000);
    return () => clearInterval(intervalId);
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

  const buttonTextVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-black to-zinc-900 p-4 md:p-8 flex flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl w-full items-center mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition-colors"
        >
          <ArrowLeft className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto flex-grow flex items-center justify-center">
        <div className="w-full">
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Server Status</span>
            </h1>
            <p className="text-xl text-gray-400">Real-time server status</p>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center space-y-8" 
            variants={itemVariants}
          >
            <motion.button
              onClick={checkStatus}
              className={`relative status-badge px-8 py-4 rounded-full text-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                isChecking ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' :
                status?.online ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              } flex items-center min-w-[200px] justify-center backdrop-blur-sm`}
              disabled={isChecking}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isChecking ? (
                  <motion.div
                    key="checking"
                    variants={buttonTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center"
                  >
                    <RefreshCw size={24} className="mr-2 animate-spin" />
                    <span>Refreshing...</span>
                  </motion.div>
                ) : status?.online ? (
                  <motion.div
                    key="online"
                    variants={buttonTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center"
                  >
                    <Wifi size={24} className="mr-2" />
                    <span>Online</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="offline"
                    variants={buttonTextVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center"
                  >
                    <WifiOff size={24} className="mr-2" />
                    <span>Offline</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <AnimatePresence>
              {status?.online && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl"
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <motion.div 
                    className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="text-lg font-semibold">Players</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-300">
                      {status.players?.online} / {status.players?.max}
                    </p>
                  </motion.div>

                  <motion.div 
                    className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700/50 hover:border-red-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center mb-2">
                      <Globe className="w-5 h-5 text-red-500 mr-2" />
                      <h3 className="text-lg font-semibold">Version</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-300">
                      {status.version}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="mt-16 text-center" variants={itemVariants}>
            <h2 className="text-3xl font-semibold mb-4 text-zinc-300">Server Information</h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              This page shows the real-time status of the BruzzCraft server.
              Click the status indicator above to refresh the server information manually.
              The status is automatically updated every 30 seconds.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Status;
