import 'dotenv/config';
import { generateText } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';
import { getRepositoryInfo, getFileTree } from './tools.js';

// (Optional) future tool registry can go here

// Main function to analyze a repository
async function analyzeRepository(repoOwner, repoName) {
  const tools = {
    repoInfo: {
      description: 'Fetch GitHub repository metadata',
      parameters: z.object({ owner: z.string(), repo: z.string() }),
      execute: ({ owner, repo }) => getRepositoryInfo(owner, repo)
    },
    fileTree: {
      description: 'Get full file tree for a repository',
      parameters: z.object({ owner: z.string(), repo: z.string() }),
      execute: ({ owner, repo }) => getFileTree(owner, repo)
    }
  };

  const { text } = await generateText({
    model: openai('o3-mini'),
    prompt: `You are a GitHub repository analyzer. Analyze the repo ${repoOwner}/${repoName}. Use the available tools as needed, then provide:
    • a concise high-level summary
    • three language-specific technical improvement suggestions focused on code smell, code quality, and domain modelling best practices. Reference concrete files or patterns you detect.`,
    tools,
    toolChoice: 'auto',
    maxSteps: 6,
    args: { owner: repoOwner, repo: repoName }
  });

  return text;
}

// CLI entry
async function main() {
  const [, , arg1, arg2] = process.argv;
  let repoOwner = 'facebook';
  let repoName  = 'react';

  if (arg1 && !arg2) {
    // single argument – could be owner/repo or full url
    const cleaned = arg1.replace('https://github.com/', '').replace('http://github.com/', '').replace(/^github.com\//, '');
    if (cleaned.includes('/')) {
      const [o, r] = cleaned.split('/');
      repoOwner = o;
      repoName  = r;
    }
  } else if (arg1 && arg2) {
    repoOwner = arg1;
    repoName  = arg2;
  }

  try {
    const analysis = await analyzeRepository(repoOwner, repoName);
    console.log(`Analysis for ${repoOwner}/${repoName} ->\n`);
    console.log(analysis);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
