# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app

ARG DATABASE_URL=mysql://app_user:app_password@mysql:3306/auto_insurance
ARG JWT_SECRET=change-me-in-production
ARG JWT_EXPIRES_IN=1h

ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts ./
RUN npx prisma generate

COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV DATABASE_URL=mysql://app_user:app_password@mysql:3306/auto_insurance
ENV JWT_SECRET=change-me-in-production
ENV JWT_EXPIRES_IN=1h

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/* \
  && addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma
COPY --from=base /app/prisma.config.ts ./prisma.config.ts

RUN chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
