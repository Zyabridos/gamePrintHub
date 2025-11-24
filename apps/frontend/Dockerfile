FROM node:20.18.1

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

COPY package*.json ./
RUN npm ci || npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
