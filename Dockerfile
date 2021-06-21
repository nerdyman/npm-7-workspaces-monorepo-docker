FROM node:fermium-buster-slim

# Ports
EXPOSE 80

# Environment variables
ENV CI=true
ENV NODE_ENV=production

RUN apt update && apt install tree && npm install -g npm@7.18.1

WORKDIR /srv/app

# Copy project files
COPY package.json package-lock.json ./
COPY packages packages

# Install dependencies
RUN npm ci && tree -d "$(pwd)"

# Build apps
RUN npm run start-all
