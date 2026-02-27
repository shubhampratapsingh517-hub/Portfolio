import { motion } from "motion/react";
import { 
  FileCode2, 
  Brain, 
  Database,
  Sigma,
  Table,
  LineChart,
  Layers,
  Server,
  Code2,
  Coffee
} from "lucide-react";

const skillCategories = [
  {
    title: "Libraries & Frameworks",
    skills: [
      { name: "NumPy", icon: Sigma, color: "text-blue-400", border: "group-hover:border-blue-400", shadow: "group-hover:shadow-blue-400/50" },
      { name: "Pandas", icon: Table, color: "text-indigo-500", border: "group-hover:border-indigo-500", shadow: "group-hover:shadow-indigo-500/50" },
      { name: "Scikit-learn", icon: Brain, color: "text-orange-400", border: "group-hover:border-orange-400", shadow: "group-hover:shadow-orange-400/50" },
      { name: "Matplotlib", icon: LineChart, color: "text-green-500", border: "group-hover:border-green-500", shadow: "group-hover:shadow-green-500/50" },
    ]
  },
  {
    title: "Coursework",
    skills: [
      { name: "DBMS", icon: Database, color: "text-blue-500", border: "group-hover:border-blue-500", shadow: "group-hover:shadow-blue-500/50" },
      { name: "OOPS", icon: Layers, color: "text-purple-400", border: "group-hover:border-purple-400", shadow: "group-hover:shadow-purple-400/50" },
      { name: "OS", icon: Server, color: "text-gray-400", border: "group-hover:border-gray-400", shadow: "group-hover:shadow-gray-400/50" },
    ]
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", icon: Coffee, color: "text-red-500", border: "group-hover:border-red-500", shadow: "group-hover:shadow-red-500/50" },
      { name: "Python", icon: FileCode2, color: "text-yellow-400", border: "group-hover:border-yellow-400", shadow: "group-hover:shadow-yellow-400/50" },
      { name: "C", icon: Code2, color: "text-blue-600", border: "group-hover:border-blue-600", shadow: "group-hover:shadow-blue-600/50" },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-neon-pink text-glow-pink">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-neon-pink mx-auto rounded-full box-glow-pink"></div>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title}>
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.2 }}
                className="text-2xl font-display font-bold mb-8 text-white border-l-4 border-neon-blue pl-4"
              >
                {category.title}
              </motion.h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (catIndex * 0.2) + (index * 0.1) }}
                    whileHover={{ scale: 1.05 }}
                    className={`group glass-panel p-6 rounded-xl flex flex-col items-center justify-center gap-4 border border-white/5 transition-all duration-300 hover:bg-white/5 ${skill.border} hover:shadow-[0_0_20px_rgba(0,0,0,0)] ${skill.shadow}`}
                  >
                    <skill.icon className={`w-12 h-12 ${skill.color} transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                    <span className="font-mono text-gray-300 group-hover:text-white tracking-wider">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
