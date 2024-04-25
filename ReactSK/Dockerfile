# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-alpine as base

ENV NODE_ENV=production

WORKDIR /react


# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
RUN cd /temp/prod && bun install


# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

RUN bun run build


# copy production dependencies
FROM nginx:stable-alpine

COPY --from=prerelease /react/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=prerelease /react/dist /usr/share/nginx/html

EXPOSE 80/tcp
