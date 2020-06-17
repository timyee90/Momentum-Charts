# Momentus

## Introduction
Momentus seeks to provide high performance stock ticker lookup and analysis for free

## How it Momentus works
1. Momentus scrapes Yahoo Finance API and stores results in PostgreSQL database
2. Momentus uses Redis caching to provide speedy queries
3. Momentus uses in-house API to deliver stock ticker lookup capabilites
4. Momentus keeps track of stock ticker favorites using localStorage

## Getting started
1. Installation
```sh
$ npm install
```
```sh
$ npm run build-prod
```
create a database/config.js file and create a username & password
```node
module.exports.config = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 10000,
  USER: 'CREATE_USER_NAME',
  PASSWORD: 'CREATE_PASSWORD',
};
```

[Install Docker](https://docs.docker.com/get-docker/) then run:
```sh
docker-compose up --build
```

2. open [localhost:3000](http://localhost:3000) in your browser
