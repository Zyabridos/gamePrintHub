FROM node:20.18.1

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

COPY . .

RUN npm run build

EXPOSE 5000
CMD ["npm", "run", "start"]
