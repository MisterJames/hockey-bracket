// layoutUtils.js

export function getMatchY(index, round, matchSpacingY = 100, boxHeight = 75) {
    const spacingMultiplier = Math.pow(2, round)
    return index * matchSpacingY * spacingMultiplier + (matchSpacingY * spacingMultiplier) / 2 - boxHeight / 2
  }
  
  export function getConnectorCoords(roundA, indexA, roundB, indexB, boxWidth, matchSpacingY = 100, roundSpacing = 135, startX = 20, boxHeight = 75) {
    const fromX = startX + roundSpacing * roundA + boxWidth
    const fromY = getMatchY(indexA, roundA, matchSpacingY, boxHeight) + boxHeight / 2
  
    const toX = startX + roundSpacing * roundB
    const toY = getMatchY(indexB, roundB, matchSpacingY, boxHeight) + boxHeight / 2
  
    return { from: { x: fromX, y: fromY }, to: { x: toX, y: toY } }
  }
  