FROM node:20-bullseye

WORKDIR /home/project

COPY package.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]