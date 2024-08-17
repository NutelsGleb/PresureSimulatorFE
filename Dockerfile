FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@7.1.3
COPY . .
RUN ng build --configuration production
FROM nginx:latest
COPY --from=build /app/dist/presure-simulator-fe/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

