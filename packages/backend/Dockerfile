FROM oven/bun:latest

WORKDIR /app

ARG GOOGLE_GENAI_API_KEY
ARG PORT

COPY package.json ./
COPY . ./

RUN bun install --omit=dev --omit=peer --omit=optional

ENV GOOGLE_GENAI_API_KEY=$GOOGLE_GENAI_API_KEY
ENV PORT=$PORT

EXPOSE $PORT

CMD [ "bun", "run", "start" ]