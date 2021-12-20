ARG ssh_prv_key
ARG ssh_pub_key
#this is green box 4 on site https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:12
#Create app directory box 5
WORKDIR /usr/src/App

RUN apt-get update && \
    apt-get install -y \
        git \
        openssh-server

ENV port 4000 
# Authorize SSH Host
RUN mkdir -p /root/.ssh && \
    chmod 0700 /root/.ssh && \
    ssh-keyscan github.com > /root/.ssh/known_hosts

RUN echo "$ssh_prv_key" > /root/.ssh/id_rsa && \
    echo "$ssh_pub_key" > /root/.ssh/id_rsa.pub && \
    chmod 400 /root/.ssh/id_rsa && \
    chmod 400 /root/.ssh/id_rsa.pub


# Install app dependencies box 6
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

#docker from git https://stackoverflow.com/questions/33682123/dockerfile-strategies-for-git
#ADD /Users/gearoidoceallachain/.ssh/id_rsa /tmp/  
#RUN ssh-agent /tmp 
# RUN bundle instll or similar command
#COPY /Users/gearoidoceallachain/.ssh/id_rsa .ssh/id_rsa
RUN git clone git@github.com:janimakinen/eduambience.git

WORKDIR frontend

RUN npm install


#remove ssh credentials to avoid leaking them
#RUN rm .ssh/id_rsa

EXPOSE 4000
CMD ["npm", "start"]
