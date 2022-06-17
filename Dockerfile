FROM node:17-alpine3.14

WORKDIR /app

RUN npm i -g npm@8.11.0
COPY package*.json ./
COPY index.js ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]