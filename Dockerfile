FROM nginx:1.27-alpine

# Template uses ${PORT}; Railway injects PORT at runtime (default 8080 for local).
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY index.html styles.css main.js favicon.svg robots.txt /usr/share/nginx/html/

ENV PORT=8080
EXPOSE 8080

# Official nginx image runs /docker-entrypoint.d/20-envsubst-on-templates.sh
# which substitutes ${PORT} into /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/health" || exit 1
