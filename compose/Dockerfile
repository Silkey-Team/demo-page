FROM node:12

# Expose the default port
EXPOSE 3000

# Create/Set the working directory
RUN mkdir /app
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app

RUN npm run build

RUN yarn global add serve

# Cleanup
RUN rm -rf ./node_modules
RUN rm -rf ./public
RUN rm -rf ./src

# Set Command
CMD ["serve", "-s", "build"]