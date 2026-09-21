# RBS Tech — site institucional

Landing B2B em português (pt-BR) para serviços de tech sob demanda.
Stack: HTML + CSS + JS estático, servido por um `server.py` mínimo (Python) no Railway.

## Rodar localmente

```bash
cd /workspace/rbs-site
python3 server.py
# http://localhost:8080  (ou PORT=3000 python3 server.py)
```

Alternativa sem o script:

```bash
python3 -m http.server 8080
```

## Contato (V1)

O formulário usa **mailto** + botão “Copiar texto do email”.

- Email padrão: `rennan@icloud.com`
- Para alterar: edite a constante `CONTACT_EMAIL` em `main.js` e faça novo deploy (push em `main`).

Não há secrets no repositório.

### Evolução do formulário (documentado, não implementado)

**Formspree**

1. Crie um formulário em https://formspree.io e copie o endpoint.
2. No `index.html`, mude o `<form>` para `action="https://formspree.io/f/SEU_ID" method="POST"`.
3. Remova ou adapte o handler mailto em `main.js`.
4. Não commite tokens; Formspree free não exige secret no front.

**Resend (ou similar)**

1. Crie uma pequena API (ex.: Railway Function / Cloudflare Worker) que recebe POST e chama Resend.
2. Guarde `RESEND_API_KEY` só como variável de ambiente no host da API — nunca no front.
3. Aponte o form (fetch) para essa API; mantenha validação client-side.

## Deploy (Railway)

- Projeto Railway: **rbs-site** (ID `fe9c4f64-9f9e-47b4-ae4b-c82624177cac`) — **não** usa `stems-mvp`.
- Serviço: **rbs-site**, ambiente **production**.
- Código: GitHub `RennanRbs/rbs-site` (branch `main`), build via Dockerfile.
- Domínio público: https://rbs-site-production.up.railway.app
- Healthcheck: `GET /health` → `ok`

CLI (opcional, se autenticado):

```bash
cd /workspace/rbs-site
railway link   # projeto rbs-site
railway up -y
```

Neste ambiente o deploy foi feito via GitHub + Railway (MCP/auto-deploy), porque o Railway CLI local não estava logado.

## Estrutura

```
rbs-site/
  index.html      # página única
  styles.css
  main.js         # CONTACT_EMAIL + form
  server.py       # static + /health
  favicon.svg
  robots.txt
  health          # arquivo estático auxiliar
  Dockerfile
  CONTENT.md      # cópia para review de marketing
  README.md
```

## O que este site NÃO inclui (de propósito)

- Waitlist / preço / captura do produto Stems
- Páginas de rede social de livros, jogos ou amigo secreto
- Métricas, depoimentos ou logos inventados
