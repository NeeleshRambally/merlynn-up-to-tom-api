# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build argument for environment file
ARG ENV_FILE=.env.local
ENV NODE_ENV=production

# Copy the correct environment file
COPY ${ENV_FILE} .env

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
