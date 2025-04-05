FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY . ./

RUN bun install --omit=dev --omit=peer --omit=optional

CMD [ "bun", "run", "start" ]