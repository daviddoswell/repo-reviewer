import { Octokit } from '@octokit/rest';

export const getRepositoryInfo = async (repoOwner, repoName) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  const repo = await octokit.request('GET /repos/{owner}/{repo}', {
    owner: repoOwner,
    repo: repoName,
  });

  const contents = await octokit.request('GET /repos/{owner}/{repo}/contents', {
    owner: repoOwner,
    repo: repoName,
    path: '',
  });

  return {
    repo: repo.data,
    contents: contents.data
  };
};

// Fetch full file tree (paths and types)
export const getFileTree = async (repoOwner, repoName) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
  });

  const treeResponse = await octokit.request('GET /repos/{owner}/{repo}/git/trees/HEAD', {
    owner: repoOwner,
    repo: repoName,
    recursive: 1
  });

  return treeResponse.data.tree.map(({ path, type, size }) => ({ path, type, size }));
};
