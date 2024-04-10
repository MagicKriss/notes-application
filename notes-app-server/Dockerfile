FROM node:20-alpine

ENV NODE_ENV: production
ENV DATABASE_URL: postgres://user:password@db:5432/notes

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
