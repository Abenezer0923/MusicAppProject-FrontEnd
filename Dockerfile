# Use an official Node runtime as a base image
FROM node:18.18.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Start the React app
CMD ["npm", "start"]
