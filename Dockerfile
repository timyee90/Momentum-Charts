FROM node:12-alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install -q
COPY . .
EXPOSE 3000
CMD ["npm" "run" "start-dev"]