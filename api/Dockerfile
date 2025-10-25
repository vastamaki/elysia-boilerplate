FROM oven/bun:1.3.0 AS build

WORKDIR /app

COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./src ./src
COPY ./tools ./tools
COPY tsconfig.json tsconfig.json

ENV NODE_ENV=production

RUN bun run build

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/out/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
