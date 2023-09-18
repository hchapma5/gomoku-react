import express, { Express, Request, Response } from 'express'
import authHandler from './handler/auth.handler'
import gameHandler from './handler/game.handler'

const app: Express = express()
app.use(express.json())

app.use('/api/auth', authHandler)
app.use('/api/game', gameHandler)

export default app
