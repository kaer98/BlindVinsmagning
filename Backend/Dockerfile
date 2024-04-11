FROM node:20.10.0-slim

COPY . /backend

WORKDIR /backend

RUN npm install

WORKDIR /backend/src

EXPOSE 3000

CMD [ "node", "index"]