FROM node:20-alpine

WORKDIR /radar-voluntario

EXPOSE 3000

# COPY *.lock ./
COPY package.json ./

RUN yarn install --network-timeout 100000

COPY . ./

CMD ["yarn", "dev"]