import { motion } from "motion/react";
import { Brain, Code, Cpu, Globe } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel p-8 md:p-12 rounded-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-neon-pink/10 rounded-full blur-3xl"></div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              <span className="text-white">About</span> <span className="text-neon-blue">Me</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed font-body text-lg max-w-2xl mx-auto">
              I am a passionate <span className="text-neon-pink font-semibold">AI Engineer</span> and Computer Science student dedicated to building intelligent systems. I specialize in Machine Learning, Deep Learning, and Computer Vision, constantly exploring new technologies to solve real-world problems.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-neon-purple transition-colors group">
                <Brain className="text-neon-purple w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm">Problem Solver</span>
              </div>
              
              <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-neon-pink transition-colors group">
                <Cpu className="text-neon-pink w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm">ML Enthusiast</span>
              </div>
              <div className="flex flex-col items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-green-400 transition-colors group">
                <Globe className="text-green-400 w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm">Tech Explorer</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
