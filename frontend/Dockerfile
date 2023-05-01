FROM node:16

WORKDIR /home/app

COPY package*.json ./

RUN npm install -g @ionic/cli @angular-devkit/build-angular && npm install 

EXPOSE 8100