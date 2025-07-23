# Etapa de build
FROM node:22-alpine AS builder

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos da raiz do projeto para dentro do container
COPY ../ ./

# Instala dependências e gera o build
RUN yarn install && yarn build

# Etapa de produção
FROM node:22-alpine

WORKDIR /app

# Copia a aplicação já buildada da imagem anterior
COPY --from=builder /app ./

# Expõe a porta que o Next.js usa em produção
EXPOSE 3000

# Inicia a aplicação
CMD ["yarn", "start"]
