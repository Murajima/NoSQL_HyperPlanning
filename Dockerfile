FROM node:9-alpine

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

CMD npm start
EXPOSE 3000
VOLUME /app/node_modules