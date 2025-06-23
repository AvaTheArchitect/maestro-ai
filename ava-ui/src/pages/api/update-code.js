import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  const { content, path, message, branch = "main" } = req.body;

  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  try {
    const resp = await octokit.repos.createOrUpdateFileContents({
      owner: process.env.AvaTheArchitect,
      repo: process.env.ava_ui,
      path,
      message,
      content,
      branch,
    });

    res.json({ output: JSON.stringify(resp.data) });
  } catch (err) {
    res.json({ output: err.message });
  }
}

