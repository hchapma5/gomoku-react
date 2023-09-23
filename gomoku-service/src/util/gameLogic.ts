import { Stone } from '../constants'
import Move from '../types'

export function buildGameBoard(size: number, movelist: Move[]): Stone[][] {
  const stones = [...Array(size)].map(() => Array(size).fill(Stone.EMPTY))
  movelist.forEach((move) => {
    stones[move.row][move.col] = move.player
  })
  return stones
}

function checkHorizontalWin(player: Stone, stones: Stone[][]): boolean {
  for (let i = 0; i < stones.length; i++) {
    let count = 0
    for (let j = 0; j < stones[i].length; j++) {
      if (stones[i][j] === player) {
        count++
        if (count === 5) return true
      } else {
        count = 0
      }
    }
  }
  return false
}

function checkVerticalWin(player: Stone, stones: Stone[][]): boolean {
  for (let i = 0; i < stones.length; i++) {
    let count = 0
    for (let j = 0; j < stones[i].length; j++) {
      if (stones[j][i] === player) {
        count++
        if (count === 5) return true
      } else {
        count = 0
      }
    }
  }
  return false
}

function checkDiagonalWin(player: Stone, stones: Stone[][]): boolean {
  const rowCount = stones.length
  const colCount = stones[0].length
  const targetCount = 5 // Number of consecutive tiles required to win

  // Check diagonal win (top-left to bottom-right)
  for (let i = 0; i <= rowCount - targetCount; i++) {
    for (let j = 0; j <= colCount - targetCount; j++) {
      let count = 0
      for (let k = 0; k < targetCount; k++) {
        if (stones[i + k][j + k] === player) {
          count++
          if (count === targetCount) {
            return true
          }
        } else {
          count = 0
        }
      }
    }
  }

  // Check diagonal win (top-right to bottom-left)
  for (let i = 0; i <= rowCount - targetCount; i++) {
    for (let j = colCount - 1; j >= targetCount - 1; j--) {
      let count = 0
      for (let k = 0; k < targetCount; k++) {
        if (stones[i + k][j - k] === player) {
          count++
          if (count === targetCount) {
            return true
          }
        } else {
          count = 0
        }
      }
    }
  }
  return false
}

export function checkWin(player: Stone, stones: Stone[][]): boolean {
  return (
    checkHorizontalWin(player, stones) ||
    checkVerticalWin(player, stones) ||
    checkDiagonalWin(player, stones)
  )
}

export function checkDraw(stones: Stone[][]): boolean {
  return stones.every((row) => row.every((tile) => tile !== Stone.EMPTY))
}
