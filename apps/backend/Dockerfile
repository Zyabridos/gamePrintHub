FROM node:20.18.1

WORKDIR /app

COPY package*.json ./

RUN npm ci || npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start"]
