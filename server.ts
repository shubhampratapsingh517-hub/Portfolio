import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let db: any;
let useInMemory = true; 
let projects: any[] = [];
let messages: any[] = []; 

// Initialize Database Function
async function initDB() {
  try {
    console.log("Attempting to load better-sqlite3...");
    const Database = (await import("better-sqlite3")).default;
    db = new Database("portfolio.db");
    console.log("SQLite database initialized successfully");
    useInMemory = false;
    
    // Create Tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        tags TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        borderColor TEXT NOT NULL,
        glow TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed Data
    try {
      const msgCount = db.prepare("SELECT count(*) as count FROM messages").get() as { count: number };
      if (msgCount.count === 0) {
        const insertMsg = db.prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
        insertMsg.run("System Admin", "admin@system.com", "Welcome to your new database! This is a sample message.");
      }

      const projCount = db.prepare("SELECT count(*) as count FROM projects").get() as { count: number };
      if (projCount.count === 0) {
        const insertProj = db.prepare(`
          INSERT INTO projects (title, description, tags, icon, color, borderColor, glow)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        insertProj.run(
          "Sample Project", 
          "This is a placeholder project.", 
          JSON.stringify(["Database", "Demo"]), 
          "Bot", 
          "text-neon-blue", 
          "border-neon-blue", 
          "box-glow-blue"
        );
      }
    } catch (seedErr) {
      console.error("Seeding failed, but DB is usable:", seedErr);
    }

  } catch (error) {
    console.error("Failed to initialize SQLite database (using in-memory):", error);
    useInMemory = true;
    
    // Seed in-memory data
    projects = [{
      id: 1,
      title: "Sample Project (Memory)",
      description: "This is a placeholder project in memory.",
      tags: ["Database", "Demo"],
      icon: "Bot",
      color: "text-neon-blue",
      borderColor: "border-neon-blue",
      glow: "box-glow-blue"
    }];
    
    messages = [{
      id: 1,
      name: "System Admin",
      email: "admin@system.com",
      message: "Welcome! Running in in-memory mode.",
      created_at: new Date().toISOString()
    }];
  }
}

async function startServer() {
  await initDB();

  const app = express();
  const PORT = 3000;

  console.log("Starting server in mode:", process.env.NODE_ENV);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.method === 'POST') {
      console.log('Body:', JSON.stringify(req.body));
    }
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV, db: useInMemory ? "memory" : "sqlite" });
  });

  // API Routes
  app.post("/api/login", (req, res) => {
    try {
      const body = req.body || {};
      const password = body.password;
      
      console.log("Login attempt. Password provided:", !!password);
      
      if (!password) {
        return res.status(400).json({ success: false, message: "Password required" });
      }

      if (String(password).trim() === "admin123") {
        console.log("Login successful");
        res.json({ success: true, token: "admin-token-123" });
      } else {
        console.log("Login failed: Invalid password");
        res.status(401).json({ success: false, message: "Invalid password" });
      }
    } catch (e) {
      console.error("Login error:", e);
      res.status(500).json({ success: false, message: "Server error during login" });
    }
  });

  app.get("/api/projects", (req, res) => {
    try {
      if (useInMemory) {
        res.json(projects);
      } else {
        const dbProjects = db.prepare("SELECT * FROM projects").all();
        const parsedProjects = dbProjects.map((p: any) => {
          try {
            return { ...p, tags: JSON.parse(p.tags) };
          } catch {
            return { ...p, tags: [] };
          }
        });
        res.json(parsedProjects);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Fallback to memory on error
      res.json(projects); 
    }
  });

  app.post("/api/projects", (req, res) => {
    const { title, description, tags, icon, color, borderColor, glow } = req.body || {};
    
    // Fallback to memory if DB fails
    try {
      if (!useInMemory) {
        const insert = db.prepare(`
          INSERT INTO projects (title, description, tags, icon, color, borderColor, glow)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        const info = insert.run(title, description, JSON.stringify(tags), icon, color, borderColor, glow);
        return res.json({ id: info.lastInsertRowid, ...req.body });
      }
    } catch (err) {
      console.error("DB Write failed, using memory:", err);
    }

    // Memory fallback
    const newProject = {
      id: Date.now(),
      title,
      description,
      tags,
      icon,
      color,
      borderColor,
      glow
    };
    projects.push(newProject);
    res.json(newProject);
  });

  app.delete("/api/projects/:id", (req, res) => {
    const { id } = req.params;
    
    try {
      if (!useInMemory) {
        const del = db.prepare("DELETE FROM projects WHERE id = ?");
        del.run(id);
        return res.json({ success: true });
      }
    } catch (err) {
      console.error("DB Delete failed, using memory:", err);
    }

    projects = projects.filter(p => p.id !== parseInt(id));
    res.json({ success: true });
  });

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body || {};
    
    if (!name || !email || !message) {
      console.log("Contact failed: Missing fields", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      if (!useInMemory) {
        const insert = db.prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
        const info = insert.run(name, email, message);
        console.log("Message saved to DB:", info.lastInsertRowid);
        return res.json({ success: true, id: info.lastInsertRowid });
      }
    } catch (dbErr) {
      console.error("DB Write failed, falling back to memory", dbErr);
    }

    // Memory fallback
    const newMsg = {
      id: Date.now(),
      name,
      email,
      message,
      created_at: new Date().toISOString()
    };
    messages.unshift(newMsg);
    console.log("Message saved to memory");
    res.json({ success: true, id: newMsg.id });
  });

  app.get("/api/messages", (req, res) => {
    try {
      if (!useInMemory) {
        const msgs = db.prepare("SELECT * FROM messages ORDER BY created_at DESC").all();
        return res.json(msgs);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
    res.json(messages);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
