FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@18.1.4
COPY . .
RUN ng build 
FROM nginx:latest
COPY --from=build /app/dist/presure-simulator-fe /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

