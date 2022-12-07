FROM node:latest as node
WORKDIR /app

COPY package-lock.json ./
COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "src/index.js"]

EXPOSE 3000