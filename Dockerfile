## Stage 1 - Build react
# Base image
FROM node:20-alpine3.16 as build
# Set working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package.json .
# Install dependencies
RUN npm install
# Copy the entire project
COPY . .
# Set environment variables
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
# Build the React app
RUN npm run build

## Stage 2
# Base image
FROM nginx:1.25.0
# Copy build file to nginx
COPY --from=build /app/build /var/www/html