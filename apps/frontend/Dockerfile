FROM node:20

WORKDIR /app

COPY apps/frontend/package*.json ./
RUN npm ci || npm install

COPY apps/frontend/ ./

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
