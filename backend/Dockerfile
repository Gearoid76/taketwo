#this is green box 4 on site https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:latest
#Create app directory box 5
WORKDIR /usr/src/App

ENV port 4000 

# Install app dependencies box 6
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production 

#Bundle app source
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node", "index.js"]
