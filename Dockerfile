FROM oven/bun:1.0.2 AS Build
COPY . /app
ENV NODE_ENV=production
WORKDIR /app
RUN bun i && bun run build

FROM oven/bun:1.0.2 AS Release
COPY --from=Build /app/dist /app
ENV HOST=0.0.0.0
ENV PORT=8080
WORKDIR /app
RUN bun add --global mime
CMD ["bun", "run", "./server/entry.mjs"]
EXPOSE 8080