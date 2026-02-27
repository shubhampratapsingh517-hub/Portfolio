import { useState } from "react";
import { useAdmin } from "../context/AdminContext";

export default function Footer() {
  const { isAdmin, logout } = useAdmin();

  return (
    <footer className="py-8 border-t border-white/10 bg-black/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <p className="text-gray-400 font-mono text-sm">
            © {new Date().getFullYear()} Shubham Pratap Singh. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-gray-500 text-sm font-mono">Designed with <span className="text-neon-pink">♥</span> & React</span>
          
          {isAdmin && (
            <button 
              onClick={logout}
              className="text-xs text-red-400 hover:text-red-300 font-mono border border-red-900/50 px-2 py-1 rounded bg-red-900/10"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
