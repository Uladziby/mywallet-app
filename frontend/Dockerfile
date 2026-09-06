# syntax=docker/dockerfile:1

FROM node:22-bookworm-slim

WORKDIR /app

RUN corepack enable && corepack prepare yarn@1.22.22 --activate

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ENV EXPO_NO_TELEMETRY=1

EXPOSE 8081

CMD ["yarn", "expo", "start", "--web", "--host", "lan", "--port", "8081"]
