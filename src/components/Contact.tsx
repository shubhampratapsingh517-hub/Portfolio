import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Get In <span className="text-neon-blue text-glow-blue">Touch</span>
          </h2>
          <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full box-glow-blue"></div>
        </motion.div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl"
          >
            <h3 className="text-2xl font-display font-bold mb-6 text-white">Let's Connect</h3>
            <p className="text-gray-400 mb-8 font-body text-lg leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
              Feel free to reach out to me via social media.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 flex-wrap">
              <a href="https://www.linkedin.com/in/shubham-pratap-singh-44220336a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group bg-white/5 px-6 py-4 rounded-xl border border-white/10 hover:border-neon-pink hover:bg-neon-pink/10 transition-all">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-pink/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-neon-pink transition-colors" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors font-mono">LinkedIn</span>
              </a>
              
              <a href="https://github.com/shubhampratapsingh517-hub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group bg-white/5 px-6 py-4 rounded-xl border border-white/10 hover:border-neon-purple hover:bg-neon-purple/10 transition-all">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neon-purple/20 transition-colors">
                  <Github className="w-5 h-5 text-gray-300 group-hover:text-neon-purple transition-colors" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors font-mono">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
