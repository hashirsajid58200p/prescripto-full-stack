FROM node:20-alpine

WORKDIR /app

# Copy package files for dependency caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose Vite admin dev server port
EXPOSE 5174

# Run Vite dev server
CMD ["npm", "run", "dev"]
