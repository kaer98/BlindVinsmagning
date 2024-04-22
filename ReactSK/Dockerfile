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
FROM httpd:alpine

#COPY --from=install /temp/prod/node_modules /react/node_modules
#COPY --from=prerelease /react/build/index.js /react/build/index.js
#COPY --from=install /temp/prod/package.json /react/package.json

COPY --from=prerelease /react/dist /usr/local/apache2/htdocs

EXPOSE 80/tcp

#ENTRYPOINT [ "bun", "run", "run-build" ]
