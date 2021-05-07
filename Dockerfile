# pull official base image
FROM node:12.19.0-alpine3.10

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY yarn.lock ./
COPY package.json ./
RUN yarn install

# copy app inside image
COPY frontend-template-cra ./

# start app
CMD ["yarn", "start"]
