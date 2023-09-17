FROM oven/bun:1.0.2
WORKDIR /app
COPY . .
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
RUN bun i && bun run build
EXPOSE 8080
CMD ["bun", "run", "./dist/server/entry.mjs"]