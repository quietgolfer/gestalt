FROM node:5

RUN mkdir /app
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN apt-get update -qq && \
    apt-get install -qy libelf1

ADD . /app

RUN npm install --quiet && npm run bootstrap
