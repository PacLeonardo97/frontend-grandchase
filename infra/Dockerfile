# Etapa de build
FROM node:22-alpine AS builder

WORKDIR /app

# Copia tudo do contexto (./infra) para /app/infra
COPY . /app/infra

# Copia o projeto inteiro que está fora do contexto (adicione manualmente)
COPY ../package.json ../yarn.lock ../next.config.js ../public ../src ../.next ../tsconfig.json /app/

RUN yarn install && yarn build

# Etapa de produção
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["yarn", "start"]