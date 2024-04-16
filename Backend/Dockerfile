FROM node:20.10-alpine as builder

COPY . /backend

WORKDIR /backend

ENV NODE_ENV=production

RUN yarn install --production

# Remove this line when prisma is no longer used
RUN npx prisma generate

FROM node:20.10-alpine as release

WORKDIR /backend

ENV NODE_ENV=production

COPY --from=builder /backend /backend

EXPOSE 3000

CMD ["npm", "run", "server"]