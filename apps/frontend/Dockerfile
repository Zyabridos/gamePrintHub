FROM node:20

WORKDIR /app

COPY apps/frontend/package*.json ./apps/frontend/

COPY packages/shared-types ./packages/shared-types

WORKDIR /app/apps/frontend
RUN npm ci || npm install

WORKDIR /app
COPY apps/frontend ./apps/frontend

WORKDIR /app/apps/frontend

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
