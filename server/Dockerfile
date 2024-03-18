FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app

RUN npm i -g pnpm

COPY package.json package-lock.json ./
RUN pnpm install
COPY src/ .
EXPOSE 3000
CMD [ "npm", "start"]