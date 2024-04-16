FROM node:20.10-slim

COPY . /backend

WORKDIR /backend

RUN yarn install

RUN npx prisma generate

WORKDIR /backend/src

EXPOSE 3000

CMD ["npm", "run", "server"]