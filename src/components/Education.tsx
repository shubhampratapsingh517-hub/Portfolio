import { motion } from "motion/react";
import { GraduationCap, Calendar } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            <span className="text-neon-purple">Education</span> Journey
          </h2>
          <div className="h-1 w-20 bg-neon-purple mx-auto rounded-full shadow-[0_0_10px_#bc13fe]"></div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-8 rounded-2xl border-l-4 border-neon-purple relative"
          >
            <div className="absolute -left-[21px] top-8 w-10 h-10 bg-black border-2 border-neon-purple rounded-full flex items-center justify-center shadow-[0_0_10px_#bc13fe]">
              <GraduationCap className="w-5 h-5 text-neon-purple" />
            </div>
            
            <div className="ml-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-2xl font-display font-bold text-white">B.Tech Computer Science</h3>
                <div className="flex items-center gap-2 text-neon-purple font-mono text-sm mt-2 md:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>2025 - 2029</span>
                </div>
              </div>
              
              <h4 className="text-lg text-gray-300 font-body mb-4">GLA University, Mathura</h4>
              
              <p className="text-gray-400 leading-relaxed">
                Specializing in Artificial Intelligence and Data Science. 
                Relevant coursework includes Data Structures, Algorithms, Database Management Systems, 
                Operating Systems, and Neural Networks.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
