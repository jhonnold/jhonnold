<a href="https://honnold.me"><img src="assets/banner.svg" width="100%" alt="$ whoami: Jay Honnold, senior software engineer building platforms for AI agents. At home I run a homelab and local LLMs. Phoenix, AZ."></a>

### `$ cat about.md`

**Agents by day, homelab by night.**

I'm a senior software engineer at Cognite, where I work on the platform behind Atlas AI: the agentic loop, model integrations, and the tools the agents call. Before that I spent five years at Amazon and AWS, mostly turning manual processes into automated systems. At AWS that work saved more than 50 developer-years.

At home I run a three-node Proxmox cluster the way I'd run production: configs in git with CI, monitoring, and encrypted offsite backups. It also hosts my local LLM stack on an RTX 4090. In my spare time I write [Berserk](https://github.com/jhonnold/berserk), an open-source chess engine in C that ranks among the strongest in the world.

```ts
export const jay = {
  role: "Senior Software Engineer",
  focus: ["AI agents", "LLM platforms", "system design"],
  languages: ["TypeScript", "Java", "Kotlin", "Go", "Python", "C", "C++"],
  basedIn: "Phoenix, AZ",  // saguaro country
  offHours: ["homelab", "local LLMs", "Berserk"],
};
```

### `$ git log --career --graph`

```diff
* 9e1c0af (HEAD -> main) Senior Software Engineer · Cognite
|   Mar 2026 — present
|   Harness and platform behind Atlas AI: the agentic loop, model
|   integrations across Azure, AWS and Google Cloud, and the CDF MCP server.
|
* a1f3c9e SDE I → II → Senior Software Engineer · AWS
|   Apr 2022 — Mar 2026
|   Led internal automation for AWS global and regional expansion.
+   +1,300 pipelines supported
+   +50 developer-years saved
|
* 7be20d4 SDE I · Amazon
|   Feb 2021 — Apr 2022
|   Order ingestion for Multi-Channel Fulfillment, thousands of orders a day.
|
* 3c91e02 Full-Stack Developer · Allstate
|   Mar 2019 — Jan 2021
|   Risk-assessment platform checking components for production readiness.
+   +100 components assessed / day
+   1 monolith → 6 services
|
* 0d4a7b1 Full-Stack Developer · Coder Inc.
    Jun 2017 — Aug 2018
    Victor, an Android app for veterans, and the Coder Platform.
```

### `$ ls -la ~/works`

| name | what | stack | |
| --- | --- | --- | --- |
| `homelab/` | Three-node Proxmox cluster run like production: every config in git behind PRs and CI, Prometheus/Grafana/Loki, encrypted offsite backups. | Proxmox · Docker · Prometheus · Grafana | `private` |
| `local-llm/` | Self-hosted model serving on an RTX 4090 host: one OpenAI-compatible endpoint for many models, Langfuse tracing, agent memory over MCP. | llama.cpp · MCP · Langfuse | `private` |
| `berserk/` | Open-source UCI chess engine. Rated 3514 on CCRL 40/15 and competes in TCEC's Premier Division. I wrote the NNUE trainer behind every net through v8.5.1. | C · NNUE | [github ↗](https://github.com/jhonnold/berserk) |
| `live-chess-viewer/` | Web viewer for Tom's Live Chess broadcasts, built on a reverse-engineered UDP protocol. CCRL uses it to broadcast its events. | TypeScript · Node | [ccrl.live ↗](https://ccrl.live) |
| `torch/` | UCI chess engine in C++; one of five founding developers. The #2 engine in the world within eight months, and it runs in Chess.com's game analysis. | C++ | [read ↗](https://www.chess.com/news/view/torch-chess-engine) |
| `react-chartjs-2/` | React wrapper for Chart.js. My rewrite became the current codebase; 5.4M npm downloads a week. | React · npm | [docs ↗](https://react-chartjs-2.js.org/) |
| `fndash/` | Fortnite statistics tracker with automated data collection. | Python · React · Postgres | [github ↗](https://github.com/jhonnold/fndash) |

### `$ ./contact.sh`

**Let's build something.** Happy to talk about AI agents, homelabs, or chess engine tuning.

[honnold.me ↗](https://honnold.me) · [linkedin ↗](https://www.linkedin.com/in/jay-honnold-158b553a9/)

<br>

<img src="assets/tmux.svg" width="100%" alt="tmux status bar: [jhonnold] 0:readme 1:about 2:experience 3:works 4:contact · honnold.me">

<sub>[process exited with code 0] · built in the Sonoran Desert</sub>
