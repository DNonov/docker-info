# Base image
FROM node:alpine

# Define a work directory
WORKDIR /usr/app

# Copy only the build dependency
COPY ./package.json ./

# Download and install all dependencies
RUN npm install

# Copy the whole project
COPY ./ ./

# Default command on start (main process)
CMD ["npm", "start"]
