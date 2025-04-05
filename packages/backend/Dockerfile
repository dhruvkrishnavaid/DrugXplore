FROM oven/bun:latest

WORKDIR /app

ARG GOOGLE_GENAI_API_KEY

COPY package.json ./
COPY . ./

RUN bun install --omit=dev --omit=peer --omit=optional

ENV GOOGLE_GENAI_API_KEY=$GOOGLE_GENAI_API_KEY
ENV PORT=8080

EXPOSE 8080

CMD [ "bun", "run", "start" ]