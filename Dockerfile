# Base image
FROM node:20-alpine3.16

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the entire project
COPY . .

# Remove node_modules
RUN rm -rf node_modules

# Install dependencies
RUN npm install

# Start the application
CMD ["npm", "start"]