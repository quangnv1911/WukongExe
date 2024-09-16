FROM node:20-alpine as build-stage
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --frozen-lockfile
COPY . .
RUN npm run build
RUN rm -rf node_modules

FROM nginx:stable-alpine3.17 as production-stage

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/nginx.conf