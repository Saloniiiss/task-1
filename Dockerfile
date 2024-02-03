FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

RUN npm install --only=development

COPY . .

RUN npm run build


#prod
FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]































# # Use the official Node.js 14 image as base
# ARG IMAGE=node:16.13-alpine

# FROM $IMAGE AS builder

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# #COPY package*.json /app/
# COPY . .
# # Install dependencies
# RUN npm install

# # Copy the rest of the application code


# #EXPOSE 8888
# #CMD ["npm", "run", "start"]


# FROM builder as dev
# CMD [""]

# Build the application
# RUN npm run build

# # Production environment
# FROM nginx:latest

# # Copy built application to Nginx default public folder
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf

# # Expose ports
# EXPOSE 8080

# # Command to run Nginx
# CMD ["nginx", "-g", "daemon off;"]




















# FROM node:14 AS builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# RUN npm run build
# CMD ["npm", "run", "start"]



# FROM nginx:latest
# WORKDIR /usr/share/nginx/html
# COPY --from=builder /app .
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 8000
# CMD ["nginx", "-g", "daemon off;"]
