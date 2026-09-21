FROM python:3.12-alpine
WORKDIR /app
COPY index.html styles.css main.js favicon.svg robots.txt server.py ./
ENV PORT=8080
EXPOSE 8080
CMD ["python", "server.py"]
