# 1. Aşama: İnşa (Build)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Aşama: Çalıştırma (Runner) - Buradaki sürüm de 20 olmalı
FROM node:20-alpine AS runner
WORKDIR /app

# Sadece gerekli dosyaları kopyalayarak performansı artırıyoruz
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]