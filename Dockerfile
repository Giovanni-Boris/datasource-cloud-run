FROM registrysecaas.azurecr.io/secaas/node:18-latest AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src src/

USER root

RUN npm install && npx nest build && npm prune --omit=dev

USER node

FROM registrysecaas.azurecr.io/secaas/node:18-latest

USER node

ENV LANG es_CL.UTF-8
ENV LANGUAGE es_CL:es
ENV LC_ALL es_CL.UTF-8

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist dist/
COPY --from=build /usr/src/app/node_modules node_modules/

CMD [ "node", "--max-old-space-size=1024", "dist/main.js" ]
