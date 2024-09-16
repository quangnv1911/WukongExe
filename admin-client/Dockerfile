FROM node:20-alpine as build-stage
WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install --frozen-lockfile
COPY . .
RUN npm run build
RUN rm -rf node_modules

FROM nginx:stable-alpine3.17 as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]