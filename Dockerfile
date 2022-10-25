FROM node:19

RUN mkdir -p /application
WORKDIR /application

ENV PATH /application/node_modules/.bin:$PATH

COPY . ./
