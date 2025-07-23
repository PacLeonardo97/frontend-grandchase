# Etapa de build
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa de produção
FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]