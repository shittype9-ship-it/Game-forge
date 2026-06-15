FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json ./
COPY packages/frontend/package*.json ./packages/frontend/
COPY packages/engine/package*.json ./packages/engine/

RUN npm install

COPY packages/frontend ./packages/frontend
COPY packages/engine ./packages/engine

WORKDIR /app/packages/frontend

RUN npm run build

# Production stage
FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=builder /app/packages/frontend/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
