import { GameState } from '../constants'

export function formatDate(date: Date): string {
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()

  return `${day}/${month}/${year}`
}

export function formatOutcome(state: GameState) {
  switch (state) {
    case GameState.BLACK_WIN:
      return 'BLACK Wins!'
    case GameState.WHITE_WIN:
      return 'WHITE Wins!'
    case GameState.DRAW:
      return "It's a Draw!"
    case GameState.IN_PROGRESS:
      return 'Game in Progress'
  }
}
