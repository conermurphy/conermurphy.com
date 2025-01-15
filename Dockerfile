# Source: https://sst.dev/docs/start/aws/astro/#6-deploy-your-app

FROM node:lts AS base
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build-deps
RUN pnpm install

FROM build-deps AS build
COPY . .
RUN pnpm build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
