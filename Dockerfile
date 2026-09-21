FROM python:3.12-alpine
WORKDIR /app
COPY index.html styles.css main.js favicon.svg robots.txt ./
ENV PORT=8080
EXPOSE 8080
# Bind Railway's PORT; serve this directory
CMD ["sh", "-c", "python -m http.server ${PORT:-8080} --bind 0.0.0.0"]
