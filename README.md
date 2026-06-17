# PR Generator - AI Workshop Webapp

Mic webapp local pentru un workshop de AI, cu:

- un mini Prompt Studio
- exemple de use-case-uri
- quiz rapid pentru concepte de baza

## Rulare locala

Cerinta: Node.js 18+

1. Porneste serverul:

```bash
npm start
```

2. Deschide in browser:

```text
http://localhost:3000
```

## Structura

- `server.js` - server HTTP simplu pentru fisiere statice
- `public/index.html` - interfata web
- `public/styles.css` - stiluri
- `public/app.js` - logica interactiva

## Pipeline PR (auto description + changelog)

Exista workflow-ul GitHub Actions [`.github/workflows/pr-ai-docs.yml`](.github/workflows/pr-ai-docs.yml) care ruleaza la fiecare PR (`opened`, `synchronize`, `reopened`, `ready_for_review`) si face:

- analizeaza fisierele modificate in PR
- genereaza automat descrierea PR-ului cu AI
- genereaza `CHANGELOG_PR.md`
- face commit automat pe branch-ul PR-ului (cand PR-ul este din acelasi repository)

Permisiuni necesare in workflow:

- `pull-requests: write`
- `contents: write`

Nota:

- pentru PR-uri din fork, workflow-ul poate actualiza descrierea PR-ului, dar in general nu poate face push in branch-ul fork-ului cu token-ul implicit.