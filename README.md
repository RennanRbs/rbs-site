# RBS Tech — site institucional

Landing B2B em português (pt-BR) para serviços de tech sob demanda.
Stack: HTML + CSS + JS estático, servido por nginx via Docker no Railway.

## Rodar localmente

Opção A — abrir direto no navegador:

```bash
cd /workspace/rbs-site
# abra index.html, ou use um servidor estático:
python3 -m http.server 8080
# http://localhost:8080
```

Opção B — Docker (igual à produção):

```bash
docker build -t rbs-site .
docker run --rm -p 8080:80 rbs-site
# http://localhost:8080
```

## Contato (V1)

O formulário usa **mailto** + botão “Copiar texto do email”.

- Email padrão: `contato@rbs.tech`
- Para alterar: edite a constante `CONTACT_EMAIL` em `main.js` e faça novo deploy.

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

Projeto Railway: **rbs-site** (separado de `stems-mvp`).

```bash
cd /workspace/rbs-site
railway link   # se necessário: projeto rbs-site
railway up -y
railway domain # gera domínio *.up.railway.app
```

Build: Dockerfile (`nginx:alpine`) + `railway.toml` com healthcheck em `/health`.

## Estrutura

```
rbs-site/
  index.html      # página única
  styles.css
  main.js         # CONTACT_EMAIL + form
  favicon.svg
  robots.txt
  nginx.conf
  Dockerfile
  railway.toml
  CONTENT.md      # cópia para review de marketing
  README.md
```

## O que este site NÃO inclui (de propósito)

- Waitlist / preço / captura do produto Stems
- Páginas de rede social de livros, jogos ou amigo secreto
- Métricas, depoimentos ou logos inventados
