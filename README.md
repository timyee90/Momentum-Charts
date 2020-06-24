# Momentus

## Introduction
Momentus seeks to provide high performance stock ticker lookup and analysis for free

## How Momentus works
1. Momentus scrapes Yahoo Finance API and stores results in PostgreSQL database
2. Momentus uses Redis caching to provide speedy queries
3. Momentus allows for full resource utilization using clusters on node.js
4. Momentus uses in-house API to deliver stock ticker lookup capabilites
5. Momentus keeps track of stock ticker favorites using localStorage
6. Momentus can perform stock ranking and display the best/worst performing stocks

## Getting started
1. Installation
```sh
$ npm install
```
```sh
$ npm run build-prod
```
2. Scrape Yahoo Finance & update database
```sh
$ npm run update
```

3. Create a database/config.js file and create a username & password
```node
module.exports.config = {
  HOST: process.env.HOST || 'localhost',
  PORT: process.env.PORT || 10000,
  USER: 'CREATE_USER_NAME',
  PASSWORD: 'CREATE_PASSWORD',
};
```

4. [Install Docker](https://docs.docker.com/get-docker/) then run:
```sh
docker-compose up --build
```

5. open [localhost:3000](http://localhost:3000) in your browser
