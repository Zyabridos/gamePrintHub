FROM node:20

WORKDIR /app

COPY apps/backend/package*.json ./

RUN npm ci || npm install

COPY apps/backend/ ./

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
