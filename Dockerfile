FROM node:16-buster-slim

# Ports
EXPOSE 80

# Environment variables
ENV CI=true
ENV NODE_ENV=production

RUN apt-get update && apt-get install tree && npm install -g npm@7.18.1

RUN echo "node: $(node -v) npm: $(npm -v) os: $(uname -a)"

WORKDIR /srv/app

# Copy project files
COPY package.json package-lock.json ./
COPY packages packages

# Install dependencies
RUN npm ci && tree -d "$(pwd)"

# Build apps
RUN npm run start-all
