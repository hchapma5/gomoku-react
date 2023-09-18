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

const getParams = {
  params: object({
    id: string({ required_error: 'Game id is required' }),
  }),
}

export const getGameByIdSchema = object({
  ...getParams,
})

export const createGameSchema = object({
  ...payload,
})

export const updateGameSchema = object({
  ...updateGameParams,
})

export type GetGameInput = TypeOf<typeof getGameByIdSchema>
export type CreateGameInput = TypeOf<typeof createGameSchema>
export type UpdateGameInput = TypeOf<typeof updateGameSchema>
