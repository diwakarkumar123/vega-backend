# Base image
FROM node:18

# Working directory container ke andar
WORKDIR /app

# Dependencies copy karo
COPY package*.json ./

# Dependencies install karo
RUN yarn install

# Source code copy karo
COPY . .

# Port expose karo
EXPOSE 5000

# App start command
CMD ["yarn", "start"]
