import { Octokit } from 'octokit';

console.log(import.meta.env.VITE_GITHUB_TOKEN);
export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
  userAgent: 'gitpeel.io/0.0.1',
});
