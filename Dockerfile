
# 1. Base image for dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 2. Builder image
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
# .next/standalone is created by "output": "standalone" in next.config.js (needs config)
# If not using standalone, we need to copy a bit more, but standalone is best practice for Docker.
# For this setup, we will stick to standard start for simplicity unless we add standalone config.
# Let's use the standard start command first to match current project state without modifying config too much.
# Actually, standard start copies everything. 
# Better: Copy built assets and use next start.

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT=3000
# Disable telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "start"]
