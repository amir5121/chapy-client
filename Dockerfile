FROM node:12-alpine
RUN mkdir -p /srv/chapy-front
RUN chown -R node:node /srv/chapy-front
WORKDIR /srv/chapy-front
# RUN apk add --no-cache python make g++
RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add shadow
RUN usermod -u 1010 node
RUN usermod -g 1010 node
USER node
