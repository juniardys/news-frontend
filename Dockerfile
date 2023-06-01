# Base image
FROM node:20-alpine3.16
# Set working directory
WORKDIR /app
# Copy package.json
COPY package.json ./
# Install dependencies
RUN npm install
# Copy the entire project
COPY . .
# Serve
CMD [ "npm", "start" ]