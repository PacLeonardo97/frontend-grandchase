# Etapa 1: build da aplicação
FROM node:22-alpine AS builder

WORKDIR /app


# Copia apenas arquivos necessários para instalar dependências
COPY package.json yarn.lock ./
COPY public/ public/
COPY messages/ messages/

RUN echo ls

RUN yarn install

# Copia o restante do projeto
COPY . .

# Build da aplicação Next.js
RUN yarn build

# Etapa 2: imagem final com apenas o build
FROM node:22-alpine AS runner

WORKDIR /app

# Copia somente a build gerada da etapa anterior
COPY --from=builder /app/.next .next/
COPY --from=builder /app/public public/
COPY --from=builder /app/messages messages/
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

EXPOSE 3000

CMD ["yarn", "start"]