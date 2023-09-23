import { object, number, TypeOf, string, array } from 'zod'

const payload = {
  body: object({
    boardSize: number({
      required_error: 'Board size is required',
    }),
  }),
}

const updateGameParams = {
  body: object({
    player: string({ required_error: 'Player is required' }),
    board: array(array(string())).nonempty({ message: 'Board is required' }),
    moveList: array(
      object({
        row: number({ required_error: 'Row is required' }),
        col: number({ required_error: 'Col is required' }),
        player: string({ required_error: 'Player is required' }),
      })
    ),
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
  ...getParams,
})

export const deleteGameSchema = object({
  ...getParams,
})

export type GetGameInput = TypeOf<typeof getGameByIdSchema>
export type CreateGameInput = TypeOf<typeof createGameSchema>
export type UpdateGameInput = TypeOf<typeof updateGameSchema>
export type DeleteGameInput = TypeOf<typeof deleteGameSchema>
