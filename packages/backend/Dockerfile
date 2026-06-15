FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY packages/backend/package*.json ./packages/backend/
COPY packages/engine/package*.json ./packages/engine/

RUN npm install

COPY packages/backend ./packages/backend
COPY packages/engine ./packages/engine

WORKDIR /app/packages/backend

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
