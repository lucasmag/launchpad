FROM public.ecr.aws/lambda/nodejs:20 as builder

WORKDIR /usr/app
RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN pnpm install

COPY ./src ./src
RUN pnpm run build

FROM public.ecr.aws/lambda/nodejs:20
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist ./
COPY --from=builder /usr/app/node_modules ./node_modules

CMD ["serverless.handler"]
