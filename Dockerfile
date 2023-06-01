## Stage 1 - Build react
# Base image
FROM node:20-alpine3.16 as build
# Set working directory
WORKDIR /app
# Copy the entire project
COPY . .
# Install dependencies
RUN npm install
# Serve
CMD [ "npm", "start" ]