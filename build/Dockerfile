# Production Dockerfile for mathcode-solutions-page
# Builds the app in a separate stage, then copies only runtime artifacts for a smaller final image.

FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies for build
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . ./
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built app output and public assets
COPY --from=builder /app/.output .output
COPY --from=builder /app/public ./public

EXPOSE 3000
ENV NODE_ENV=production

CMD ["node", ".output/server/index.mjs"]
