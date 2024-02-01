
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start"]



# FROM nginx:latest
# WORKDIR /usr/share/nginx/html
# COPY --from=builder /app .
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 8000
# CMD ["nginx", "-g", "daemon off;"]
