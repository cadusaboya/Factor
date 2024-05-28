# Use a base image with Node.js installed
FROM node:20.13.1

# Install Expo CLI globally
RUN npm install -g expo-cli

# Install @expo/ngrok globally
RUN npm install -g @expo/ngrok@^4.1.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose port 8081 for Expo
EXPOSE 8081

# Start the Expo server
CMD ["npx", "expo", "start", "--tunnel"]