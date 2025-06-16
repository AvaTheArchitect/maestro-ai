import { Octokit } from "@octokit/rest";

export default async function handler(req, res) {
  const { content, path, message } = req.body;

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    const { data: file } = await octokit.repos.getContent({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
    });

    await octokit.repos.createOrUpdateFileContents({
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO,
      path,
      message,
      content,
      sha: file.sha,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("GitHub update error", err);
    res.status(500).json({ error: err.message });
  }
}

