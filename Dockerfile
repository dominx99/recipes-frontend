FROM node:16.14.2-buster

WORKDIR /application

ENV PATH /application/node_modules/.bin:$PATH
