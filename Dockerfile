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
ENV NODE_ENV=production
# Start react app
CMD ["npm", "start"]