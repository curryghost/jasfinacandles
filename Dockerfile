FROM oven/bun:1.0.2 AS build
COPY . /app
ENV NODE_ENV=production
WORKDIR /app
RUN bun i && bun run build

FROM oven/bun:1.0.2 AS bunsetup
COPY --from=build /app/dist /app
RUN bun add --global mime

FROM bunsetup AS final
ENV HOST=0.0.0.0
ENV PORT=8080
WORKDIR /app
CMD ["bun", "run", "./server/entry.mjs"]
EXPOSE 8080