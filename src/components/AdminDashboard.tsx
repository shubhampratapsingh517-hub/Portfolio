import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useAdmin } from "../context/AdminContext";
import { Trash2, Mail, Calendar, User, Database as DbIcon, FolderGit2, Plus } from "lucide-react";
import { db, Message, Project } from "../services/db";

export default function AdminDashboard() {
  const { isAdmin, logout } = useAdmin();
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState<"messages" | "projects">("messages");

  useEffect(() => {
    if (isAdmin) {
      fetchMessages();
      fetchProjects();
    }
  }, [isAdmin, activeTab]); // Refresh when tab changes

  const fetchMessages = () => {
    setMessages(db.getMessages());
  };

  const fetchProjects = () => {
    setProjects(db.getProjects());
  };

  const handleDeleteProject = (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    db.deleteProject(id);
    fetchProjects();
  };

  if (!isAdmin) return null;

  return (
    <section id="admin-dashboard" className="py-20 bg-black/80 backdrop-blur-md border-t border-white/10 min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-display font-bold text-white">
              Database <span className="text-neon-green">Viewer</span>
            </h2>
            <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
              <button
                onClick={() => setActiveTab("messages")}
                className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                  activeTab === "messages" ? "bg-neon-blue text-black font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2 rounded-md text-sm font-mono transition-all ${
                  activeTab === "projects" ? "bg-neon-purple text-black font-bold" : "text-gray-400 hover:text-white"
                }`}
              >
                Projects
              </button>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/50 rounded-lg hover:bg-red-500/40 transition-colors text-sm font-mono"
          >
            Logout Admin
          </button>
        </div>

        {activeTab === "messages" && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid gap-6"
          >
            <div className="flex items-center gap-2 text-neon-blue mb-4">
              <Mail className="w-5 h-5" />
              <h3 className="text-xl font-mono">Messages Table ({messages.length})</h3>
            </div>
            
            {messages.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                <p className="text-gray-500 italic">No messages found in database.</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-neon-blue/50 transition-colors relative group"
                  >
                    <div className="absolute top-4 right-4 text-xs text-gray-600 font-mono">ID: {msg.id}</div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2 text-neon-blue">
                        <User className="w-4 h-4" />
                        <span className="font-bold">{msg.name}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                      <Mail className="w-3 h-3" />
                      <span className="select-all">{msg.email}</span>
                    </div>
                    
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5 mb-3">
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-gray-600 mt-auto">
                      <Calendar className="w-3 h-3" />
                      {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "projects" && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid gap-6"
          >
            <div className="flex items-center gap-2 text-neon-purple mb-4">
              <FolderGit2 className="w-5 h-5" />
              <h3 className="text-xl font-mono">Projects Table ({projects.length})</h3>
            </div>
            
            <div className="mb-4">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-neon-purple/20 text-neon-purple border border-neon-purple/50 rounded-lg hover:bg-neon-purple/40 transition-colors text-sm font-bold"
              >
                <Plus className="w-4 h-4" /> Add New Project
              </a>
              <p className="text-xs text-gray-500 mt-2 ml-1">
                * To add a project, use the "Add Project" button in the main Projects section above.
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
                <p className="text-gray-500 italic">No projects found in database.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 font-mono text-sm">
                      <th className="p-4">ID</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Description</th>
                      <th className="p-4">Tags</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300 text-sm">
                    {projects.map((project) => (
                      <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="p-4 font-mono text-gray-500">{project.id}</td>
                        <td className="p-4 font-bold text-white">{project.title}</td>
                        <td className="p-4 max-w-xs truncate">{project.description}</td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, i) => (
                              <span key={i} className="px-2 py-0.5 bg-white/10 rounded text-xs text-gray-400">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
