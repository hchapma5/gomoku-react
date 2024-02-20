# ⚫ Gomoku MERN App ⚪

Gomoku, or Five in a Row, is a classic strategy board game now available online through this MERN stack app. It provides a seamless digital experience for playing Gomoku with a clean, user-friendly interface.

## Features ⭐

- **Gameplay**: Simple yet engaging Gomoku matches online.
- **User Accounts**: Secure sign-up/login for personal game history and security.
- **Game History**: Log and review past games for strategy improvement.
- **Real-time Play**: Compete in live games for a dynamic experience.

## Built With ⚙️
- `React`
- `TypeScript`
- `Zustand`
- `MongoDB`
- `Express.js`
- `Node.js`
- `Vite`

## Improvement 💭

- ~~**Migrate to Vite**: Transitioning from CRA to Vite could significantly boost app performance and development speed.~~
- **Security Enhancements**: Strengthen user registration and login with advanced security features like two-factor authentication.

## Check it out! 😎

https://hchapma5-gomoku-react.onrender.com/

## To run locally:

#### Environment setup

Before running the app locally or in Docker, you need to set up your environment variables:

1. Copy the `.env.template` file in the `gomoku-service` directory and rename it to `.env`.
   
```bash
cp gomoku-service/.env.template gomoku-service/.env
```

2. Generate private and public keys for securing user authentication. You can use tools like OpenSSL for this:
   
```bash
openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private_key.pem -out public_key.pem
```

3. Copy the generated keys to the .env file:
   
5. Create a MongoDB database and copy the connection string to the .env file.

#### Running the application

1. **Server**: `cd gomoku-service` > `npm install` > `npm run dev`
2. **Client**: `cd gomoku-react` > `npm install` > `npm start`
   
#### To run in Docker:

- Start the application with Docker Compose: `docker-compose up --build`

## API Documentation

For detailed information on the API endpoints and their usage, refer to the [Postman Collection](https://www.postman.com/hchapma5/workspace/my-workspace/collection/28201884-f1052827-c90b-4c96-bd64-b6e442bd43c4?action=share&creator=28201884).
