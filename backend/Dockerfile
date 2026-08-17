FROM node:20-alpine

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose backend port
EXPOSE 4000

# Run nodemon for development hot-reloading
CMD ["npm", "run", "server"]
