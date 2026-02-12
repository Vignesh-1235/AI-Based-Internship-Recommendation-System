import type { Express } from "express";
import { createServer, type Server } from "http";
import { spawn } from "child_process";
import { join } from "path";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/recommend", async (req, res) => {
    try {
      const userProfile = req.body;
      // Path to python file relative to repo root:
      const pyPath = join(process.cwd(), "server", "model", "recommender.py");
      const pyProc = spawn("python3", [pyPath], { stdio: ["pipe", "pipe", "pipe"] });

      // send JSON to python stdin
      pyProc.stdin.write(JSON.stringify(userProfile));
      pyProc.stdin.end();

      let out = "";
      let err = "";
      pyProc.stdout.on("data", (d) => (out += d.toString()));
      pyProc.stderr.on("data", (d) => (err += d.toString()));

      pyProc.on("close", (code) => {
        if (code !== 0) {
          console.error("Python process error:", err);
          return res.status(500).json({ error: "Recommendation engine failed", detail: err });
        }
        // parse python stdout and return JSON
        try {
          const recommendations = JSON.parse(out);
          return res.json({ recommendations });
        } catch (parseErr) {
          console.error("Parse error from python output", parseErr, out);
          return res.status(500).json({ error: "Invalid response from recommender", detail: out });
        }
      });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: "Server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
