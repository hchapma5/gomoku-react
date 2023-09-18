import { object, number, TypeOf, string } from 'zod'

const payload = {
  body: object({
    boardSize: number({
      required_error: 'Board size is required',
    }),
  }),
}

const updateGameParams = {
  body: object({
    row: number({ required_error: 'Row is required' }),
    col: number({ required_error: 'Col is required' }),
    stone: string({ required_error: 'Stone is required' }),
  }),
}

export const createGameSchema = object({
  ...payload,
})

export const updateGameSchema = object({
  ...updateGameParams,
})

export type CreateGameInput = TypeOf<typeof createGameSchema>
export type UpdateGameInput = TypeOf<typeof updateGameSchema>
