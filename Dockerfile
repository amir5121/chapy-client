FROM node:12-alpine
RUN mkdir -p /srv/chapy-front
RUN chown -R node:node /srv/chapy-front
WORKDIR /srv/chapy-front
# RUN apk add --no-cache python make g++
USER node
