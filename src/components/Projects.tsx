import { motion } from "motion/react";
import { Github, ExternalLink, Bot, ScanFace, ThumbsUp, TrendingUp, Trash2, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { db, Project } from "../services/db";

// Icon mapping
const iconMap: any = {
  Bot,
  ScanFace,
  ThumbsUp,
  TrendingUp,
  Github, // Fallback
};

export default function Projects() {
  const { isAdmin } = useAdmin();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tags: "",
    icon: "Bot",
    color: "text-neon-blue",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    setProjects(db.getProjects());
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    db.deleteProject(id);
    fetchProjects();
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine styles based on selected color
    let borderColor = "border-neon-blue";
    let glow = "box-glow-blue";
    
    if (newProject.color === "text-neon-pink") {
      borderColor = "border-neon-pink";
      glow = "box-glow-pink";
    } else if (newProject.color === "text-neon-purple") {
      borderColor = "border-neon-purple";
      glow = "shadow-[0_0_10px_#bc13fe]";
    } else if (newProject.color === "text-green-400") {
      borderColor = "border-green-400";
      glow = "shadow-[0_0_10px_#4ade80]";
    }

    const projectData = {
      ...newProject,
      tags: newProject.tags.split(',').map(t => t.trim()),
      borderColor,
      glow
    };

    db.addProject(projectData);
    fetchProjects();
    setIsModalOpen(false);
    setNewProject({
      title: "",
      description: "",
      tags: "",
      icon: "Bot",
      color: "text-neon-blue",
    });
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Featured <span className="text-neon-blue text-glow-blue">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-neon-blue mx-auto rounded-full box-glow-blue"></div>
          
          {isAdmin && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute right-0 top-0 bg-neon-blue/20 hover:bg-neon-blue/40 text-neon-blue border border-neon-blue rounded-full p-2 transition-all"
            >
              <Plus className="w-6 h-6" />
            </button>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.length === 0 && (
            <div className="col-span-full text-center py-20 border border-dashed border-white/10 rounded-2xl bg-white/5">
              <p className="text-gray-400 font-mono text-lg">
                No projects added yet. <span className="text-neon-blue">Stay tuned!</span>
              </p>
            </div>
          )}
          {projects.map((project, index) => {
            const IconComponent = iconMap[project.icon] || Bot;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group glass-panel rounded-2xl overflow-hidden relative"
              >
                {/* Admin Delete Button */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(project.id);
                    }}
                    className="absolute top-4 right-4 z-20 bg-red-500/20 hover:bg-red-500/40 text-red-500 p-2 rounded-full transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                {/* Hover Glow Background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-${project.color.replace('text-', '')}`}></div>
                
                <div className="p-8 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-lg bg-white/5 ${project.color} ${project.glow} bg-opacity-10`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex gap-3">
                      <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-gray-300 hover:text-white">
                        <Github className="w-5 h-5" />
                      </a>
                      <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-gray-300 hover:text-white">
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-neon-blue transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 font-body leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-gray-300 border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Bottom Border Line */}
                <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-current ${project.color}`}></div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Add Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0a0a0a] border border-neon-blue/50 rounded-2xl w-full max-w-md p-6 relative box-glow-blue">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-display font-bold mb-6 text-neon-blue">Add New Project</h3>
            
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-neon-blue outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-1">Description</label>
                <textarea
                  required
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-neon-blue outline-none"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-mono text-gray-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="React, Node, AI"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-neon-blue outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-1">Icon</label>
                  <select
                    value={newProject.icon}
                    onChange={(e) => setNewProject({...newProject, icon: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-neon-blue outline-none"
                  >
                    <option value="Bot">Bot</option>
                    <option value="ScanFace">ScanFace</option>
                    <option value="ThumbsUp">ThumbsUp</option>
                    <option value="TrendingUp">TrendingUp</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-mono text-gray-400 mb-1">Color Theme</label>
                  <select
                    value={newProject.color}
                    onChange={(e) => setNewProject({...newProject, color: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-neon-blue outline-none"
                  >
                    <option value="text-neon-blue">Blue</option>
                    <option value="text-neon-pink">Pink</option>
                    <option value="text-neon-purple">Purple</option>
                    <option value="text-green-400">Green</option>
                  </select>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-neon-blue text-black font-bold py-2 rounded-lg hover:bg-neon-blue/80 transition-colors mt-4"
              >
                Add Project
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
