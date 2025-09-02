FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . .
RUN npm run build

FROM nginx:alpine

# Remove default nginx config and copy ours
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/HeroApp/browser/* /usr/share/nginx/html/

EXPOSE 80