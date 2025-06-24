# Repo Reviewer 🕵️‍♂️

An **AI-powered CLI tool** that quickly explains any public GitHub repository and suggests improvements.

> “Tell me what this repo does and how to make it better.” – *in one command*

---

## Why would I use this?

• **Instant insights** – skip digging through code, get a concise summary in seconds.

• **Actionable feedback** – the AI recommends concrete next steps (docs, tests, CI, etc.).

• **Plug-and-play** – point it at any public repo URL:

```bash
bun src/index.js https://github.com/vercel/ai
```

---

## How it works

1. **GitHub API** @octokit/rest fetches repo metadata & file tree.
2. **Vercel AI SDK** (`ai` package) calls an LLM (OpenAI’s `o3-mini` by default).
3. **Tools** defined with **Zod** schemas let the model ask for extra data (`repoInfo`, `fileTree`).
4. The LLM synthesises everything into a human-readable summary + suggestions.

---

## Quick start

### 1 · Prerequisites

| Requirement | Why |
|-------------|-----|
| [Bun](https://bun.sh/) ≥ 1.0 | Fast JS runtime & package manager |
| GitHub **PAT** in `.env` | Needed to access the GitHub API |
| OpenAI **API key** in `.env` | Lets the AI model run |

Create a `.env` file (in project root):

```env
GITHUB_TOKEN=ghp_xxx
OPENAI_API_KEY=sk-xxx
```

### 2 · Install deps

```bash
bun install
```

### 3 · Run!

```bash
bun src/index.js <owner>/<repo>
# or full URL
bun src/index.js https://github.com/daviddoswell/LAHikes
```

---

## Key libraries / links

| Package | Purpose | Docs |
|---------|---------|------|
| **ai** | Vercel AI SDK core (text / tool calling) | https://ai-sdk.dev |
| **@ai-sdk/openai** | OpenAI provider for the AI SDK | https://ai-sdk.dev/providers/openai |
| **@octokit/rest** | GitHub REST API client | https://github.com/octokit/rest.js |
| **zod** | Schema validation & type-safe tool params | https://zod.dev |
| **dotenv** | Loads `.env` variables | https://github.com/motdotla/dotenv |
| **bun** | JS runtime / PM | https://bun.sh |

---

## Extending

* **More tools** – wrap any function with a Zod schema (e.g. `getFileContent`).
* **Different models** – swap `openai('gpt-4o')` or use the [Vercel provider](https://ai-sdk.dev/providers/vercel).
* **Web UI** – pair with [`@ai-sdk/react`](https://ai-sdk.dev/providers/react) for live chat output.

PRs welcome!

---

## License

MIT © 2025 David Doswell
