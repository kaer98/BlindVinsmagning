FROM node:20.10.0-slim

COPY . /backend

WORKDIR /backend

RUN echo | ls

RUN apt update &&\
    apt install openssl -y

RUN yarn install

RUN npx prisma generate

WORKDIR /backend/src

EXPOSE 3000

CMD ["npm", "run", "server"]