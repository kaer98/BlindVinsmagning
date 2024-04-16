FROM node:20.10-alpine as builder

COPY . /backend

WORKDIR /backend

RUN yarn install --production

RUN npx prisma generate

FROM node:20.10-alpine as release

WORKDIR /backend

COPY --from=builder /backend /backend

EXPOSE 3000

CMD ["npm", "run", "server"]