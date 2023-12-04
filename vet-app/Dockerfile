# Use an official Node.js runtime as the base image
FROM node:20.3.0-alpine

# Environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --silent

# Create a cache directory and set permissions (optional)
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Install react-scripts globally (consider using it as a local dependency)
RUN npm install react-scripts -g --silent

# Copy all project files to the container
COPY . .

# Specify the port that the container should listen on
EXPOSE 3000