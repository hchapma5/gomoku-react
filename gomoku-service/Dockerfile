FROM node

WORKDIR /gomoku-service

COPY package*.json ./
COPY ./tsconfig.json ./
COPY ./.env ./

RUN npm install

COPY . .

EXPOSE 8080

CMD npm run dev