import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 relative"
        >
          <div className="absolute inset-0 bg-neon-blue blur-[50px] opacity-20 rounded-full"></div>
          <h2 className="text-neon-blue font-mono tracking-[0.2em] text-sm md:text-base mb-2 uppercase">
            Hello, World! I am
          </h2>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-8xl font-bold font-display mb-6 tracking-tighter"
        >
          <span className="text-neon-blue text-glow-blue">Shubham </span>
          <span className="text-neon-purple drop-shadow-[0_0_10px_rgba(188,19,254,0.5)]">Pratap </span>
          <span className="text-neon-pink text-glow-pink">Singh</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="h-8 md:h-10 mb-10"
        >
          <p className="text-xl md:text-2xl font-mono text-gray-400">
            {text}
            <span className="animate-pulse text-neon-blue">_</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-none"
          >
            <div className="absolute inset-0 w-3 bg-neon-blue transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
            <div className="absolute inset-0 border border-neon-blue box-glow-blue"></div>
            <span className="relative flex items-center gap-2 text-neon-blue group-hover:text-white font-mono uppercase tracking-wider">
              View Projects <ArrowRight className="w-4 h-4" />
            </span>
          </a>

          <a
            href="#contact"
            className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-none"
          >
            <div className="absolute inset-0 w-3 bg-neon-pink transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
            <div className="absolute inset-0 border border-neon-pink box-glow-pink"></div>
            <span className="relative flex items-center gap-2 text-neon-pink group-hover:text-white font-mono uppercase tracking-wider">
              Contact Me <Mail className="w-4 h-4" />
            </span>
          </a>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-neon-blue rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
