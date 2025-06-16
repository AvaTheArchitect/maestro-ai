// server.js
import express from "express";
import cors from "cors";
import { exec } from "child_process";
import { Octokit } from "@octokit/rest";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const repo = { owner: process.env.GITHUB_OWNER, repo: process.env.GITHUB_REPO };

app.post("/api/run", (req, res) => {
  exec(req.body.command, (error, stdout, stderr) => {
    res.json({ output: stdout + stderr });
  });
});

app.post("/api/update-code", async (req, res) => {
  try {
    const content = Buffer.from("/* Ava's code update */").toString("base64");
    const resp = await octokit.repos.createOrUpdateFileContents({
      ...repo,
      path: req.body.path || "README.md",
      message: req.body.message || "Ava: auto update",
      content,
      branch: req.body.branch || "main",
    });
    res.json({ output: JSON.stringify(resp.data) });
  } catch (err) {
    res.json({ output: err.message });
  }
});

app.post("/api/deploy", async (req, res) => {
  try {
    const resp = await fetch("https://api.vercel.com/v13/deployments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: process.env.VERCEL_PROJECT_NAME,
        gitSource: {
          type: "github",
          repoId: process.env.VERCEL_GIT_REPO_ID,
        },
      }),
    });
    const json = await resp.json();
    res.json({ output: JSON.stringify(json) });
  } catch (err) {
    res.json({ output: err.message });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Ava Agent listening");
});
