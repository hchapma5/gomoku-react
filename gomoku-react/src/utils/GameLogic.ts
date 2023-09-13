import { PLAYER, TILE_STATUS } from '../constants'

function checkHorizontalWin(player: PLAYER, stones: TILE_STATUS[][]): boolean {
  for (let i = 0; i < stones.length; i++) {
    let count = 0
    for (let j = 0; j < stones[i].length; j++) {
      if (stones[i][j].valueOf() === player) {
        count++
        if (count === 5) return true
      } else {
        count = 0
      }
    }
  }
  return false
}

function checkVerticalWin(player: PLAYER, stones: TILE_STATUS[][]): boolean {
  for (let i = 0; i < stones.length; i++) {
    let count = 0
    for (let j = 0; j < stones[i].length; j++) {
      if (stones[j][i].valueOf() === player) {
        count++
        if (count === 5) return true
      } else {
        count = 0
      }
    }
  }
  return false
}

function checkDiagonalWin(player: PLAYER, stones: TILE_STATUS[][]): boolean {
  const rowCount = stones.length
  const colCount = stones[0].length
  const targetCount = 5 // Number of consecutive tiles required to win

  // Check diagonal win (top-left to bottom-right)
  for (let i = 0; i <= rowCount - targetCount; i++) {
    for (let j = 0; j <= colCount - targetCount; j++) {
      let count = 0
      for (let k = 0; k < targetCount; k++) {
        if (stones[i + k][j + k].valueOf() === player) {
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
        if (stones[i + k][j - k].valueOf() === player) {
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

export function checkWin(player: PLAYER, stones: TILE_STATUS[][]): boolean {
  return (
    checkHorizontalWin(player, stones) ||
    checkVerticalWin(player, stones) ||
    checkDiagonalWin(player, stones)
  )
}

export function checkDraw(stones: TILE_STATUS[][]): boolean {
  return stones.every((row) => row.every((tile) => tile !== TILE_STATUS.EMPTY))
}
