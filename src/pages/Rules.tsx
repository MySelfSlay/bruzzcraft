import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Rule {
  title: string;
  rules: string[];
}

const rules: Rule[] = [
  {
    title: "Maintain Decency",
    rules: [
      "No discrimination of any kind",
      "Respect all religions/communities",
      "Keep chat & behavior appropriate"
    ]
  },
  {
    title: "Limited Griefing Policy",
    rules: [
      "Minor pranks/raids allowed",
      "No complete base destruction",
      "No stealing essential items",
      "No repeated targeting"
    ]
  },
  {
    title: "No Cheating or Exploits",
    rules: [
      "No hacks/modifications",
      "No X-ray/Fly/Duping",
      "Fair gameplay required"
    ]
  },
  {
    title: "Fair Play & No Unnecessary Lag",
    rules: [
      "Avoid excessive redstone clocks",
      "No mass entity spawning",
      "Responsible farm usage",
      "No AFK abuse"
    ]
  }
];

const Rules = () => {
  const [expandedRules, setExpandedRules] = useState<string[]>([]);

  const toggleRule = (title: string) => {
    setExpandedRules(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
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

      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Server Rules
          </span>
        </motion.h1>

        <div className="space-y-4 mb-12">
          {rules.map((rule, index) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-zinc-800/50 rounded-lg border border-zinc-700/50 overflow-hidden"
            >
              <button
                onClick={() => toggleRule(rule.title)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-zinc-700/30 transition-colors"
              >
                <span className="text-lg font-semibold">{rule.title}</span>
                <motion.div
                  animate={{ rotate: expandedRules.includes(rule.title) ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-zinc-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedRules.includes(rule.title) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-zinc-800">
                      {rule.rules.map((item, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-zinc-300"
                        >
                          • {item}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact Staff Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-200">Need Help?</h2>
          <blockquote className="italic text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            "Our staff is here to help! If you encounter any issues, have questions, or need to report a concern, 
            don't hesitate to reach out. We're committed to ensuring fair play and a positive experience for everyone."
          </blockquote>
          <p className="text-zinc-500">
            Contact our staff through Discord for quick assistance
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Rules;
