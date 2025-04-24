# Use the official Node.js image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (this helps leverage Docker's cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's code into the container
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Run the app
CMD ["node", "server.js"]
