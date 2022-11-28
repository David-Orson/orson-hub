FROM node:10

WORKDIR /usr

COPY package.json ./

COPY tsconfig.json ./

COPY build ./build

RUN npm install

CMD ["node",  "build/index.js"]
