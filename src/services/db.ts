// Simple LocalStorage wrapper to simulate a database for Vercel deployment
// Since Vercel is serverless/stateless, we can't use a local SQLite file.
// This allows the app to work fully in the browser.

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  color: string;
  borderColor: string;
  glow: string;
}

export interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

const INITIAL_PROJECTS: Project[] = [];

class LocalDB {
  private get<T>(key: string, initial: T): T {
    if (typeof window === 'undefined') return initial;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch {
      return initial;
    }
  }

  private set(key: string, value: any) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("LocalStorage write failed", e);
    }
  }

  // Projects
  getProjects(): Project[] {
    const projects = this.get<Project[]>("projects_v2", []);
    if (projects.length === 0) {
      this.set("projects_v2", INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
    return projects;
  }

  addProject(project: Omit<Project, "id">): Project {
    const projects = this.getProjects();
    const newProject = { ...project, id: Date.now() };
    this.set("projects_v2", [...projects, newProject]);
    return newProject;
  }

  deleteProject(id: number) {
    const projects = this.getProjects();
    this.set("projects_v2", projects.filter(p => p.id !== id));
  }

  // Messages
  getMessages(): Message[] {
    return this.get<Message[]>("messages", []);
  }

  addMessage(msg: Omit<Message, "id" | "created_at">): Message {
    const messages = this.getMessages();
    const newMessage = { 
      ...msg, 
      id: Date.now(), 
      created_at: new Date().toISOString() 
    };
    this.set("messages", [newMessage, ...messages]);
    return newMessage;
  }

  // Auth
  login(password: string): boolean {
    return password === "admin123";
  }
}

export const db = new LocalDB();
