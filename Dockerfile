# ビルド環境
FROM node:lts-alpine as build-stage

ARG API_URL
RUN echo $API_URL
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 本番環境
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./nginx/conf.d/ /etc/nginx/conf.d/

RUN apk add openssh

WORKDIR /app
COPY startup.sh /app
COPY sshd_config /etc/ssh/

EXPOSE 80 2222
CMD /app/startup.sh