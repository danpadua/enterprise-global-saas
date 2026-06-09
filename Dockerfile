# === ESTÁGIO 1: Instalação de Dependências ===
FROM node:20-alpine AS deps
WORKDIR /app

# Copia os arquivos de manifestos de pacotes
COPY package.json package-lock.json* ./
RUN npm ci

# === ESTÁGIO 2: Compilação do Projeto ===
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desativa a telemetria do Next.js durante o build para maior privacidade e velocidade
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# === ESTÁGIO 3: Ambiente de Execução (Runner) ===
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Prática de Segurança: Cria um usuário de sistema comum para evitar rodar o container como root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia os assets públicos e os arquivos gerados no modo standalone
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Executa o servidor Node.js autônomo gerado pelo Next.js
CMD ["node", "server.js"]