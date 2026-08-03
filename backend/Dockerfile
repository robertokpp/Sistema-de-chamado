FROM node:22-bookworm-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
COPY prisma.config.ts tsconfig.json ./
COPY src ./src

RUN npm exec prisma generate && npm run build

ENV NODE_ENV=production
EXPOSE 3333

CMD ["sh", "-c", "npm exec prisma migrate deploy && npm run seed && npm start"]
