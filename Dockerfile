FROM scratch
ADD rootfs.tar.gz /
RUN apk update && apk upgrade && apk add curl nodejs \
    && mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY index.js /usr/src/app
CMD [ "npm", "start" ]
