FROM node:20-alpine

WORKDIR /opt/app
RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY src/ .
EXPOSE 3000

CMD [ "pnpm", "dev"]