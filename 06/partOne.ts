import { readFile } from '../utils/index'

const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')

enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

type Position = {
    x: number
    y: number
}

function findGuardPosition() {
    let position = { x: 0, y: 0 }
    for (let i = 0; i < lines.length; i++) {
        const index = lines[i].split('').findIndex((e) => e === '^')
        if (index !== -1) {
            position.x = index
            position.y = i
        }
    }
    return position
}

function guardMove(
    currentGuardPosition: Position,
    direction: Direction
): { position: Position; direction: Direction } | 'OUT' {
    if (direction === Direction.UP) {
        if (
            lines[currentGuardPosition.y - 1] &&
            lines[currentGuardPosition.y - 1][currentGuardPosition.x]
        ) {
            const nextStep =
                lines[currentGuardPosition.y - 1][currentGuardPosition.x]
            if (nextStep === '.' || nextStep === '^') {
                return {
                    position: {
                        x: currentGuardPosition.x,
                        y: currentGuardPosition.y - 1,
                    },
                    direction,
                }
            } else {
                return {
                    position: currentGuardPosition,
                    direction: Direction.RIGHT,
                }
            }
        } else {
            return 'OUT'
        }
    }
    if (direction === Direction.DOWN) {
        if (
            lines[currentGuardPosition.y + 1] &&
            lines[currentGuardPosition.y + 1][currentGuardPosition.x]
        ) {
            const nextStep =
                lines[currentGuardPosition.y + 1][currentGuardPosition.x]
            if (nextStep === '.' || nextStep === '^') {
                return {
                    position: {
                        x: currentGuardPosition.x,
                        y: currentGuardPosition.y + 1,
                    },
                    direction,
                }
            } else {
                return {
                    position: currentGuardPosition,
                    direction: Direction.LEFT,
                }
            }
        } else {
            return 'OUT'
        }
    }
    if (direction === Direction.RIGHT) {
        if (lines[currentGuardPosition.y][currentGuardPosition.x + 1]) {
            const nextStep =
                lines[currentGuardPosition.y][currentGuardPosition.x + 1]
            if (nextStep === '.' || nextStep === '^') {
                return {
                    position: {
                        x: currentGuardPosition.x + 1,
                        y: currentGuardPosition.y,
                    },
                    direction,
                }
            } else {
                return {
                    position: currentGuardPosition,
                    direction: Direction.DOWN,
                }
            }
        } else {
            return 'OUT'
        }
    }
    if (direction === Direction.LEFT) {
        if (lines[currentGuardPosition.y][currentGuardPosition.x - 1]) {
            const nextStep =
                lines[currentGuardPosition.y][currentGuardPosition.x - 1]
            if (nextStep === '.' || nextStep === '^') {
                return {
                    position: {
                        x: currentGuardPosition.x - 1,
                        y: currentGuardPosition.y,
                    },
                    direction,
                }
            } else {
                return {
                    position: currentGuardPosition,
                    direction: Direction.UP,
                }
            }
        } else {
            return 'OUT'
        }
    }
    return 'OUT'
}

function main() {
    let guardPosition = findGuardPosition()
    let direction = Direction.UP
    let isOut = false
    let storePosition: Position[] = []
    while (!isOut) {
        let move = guardMove(guardPosition, direction)
        if (move === 'OUT') {
            isOut = true
        } else {
            guardPosition = move.position
            direction = move.direction
            if (
                !storePosition.find(
                    (s) => s.x === move.position.x && s.y === move.position.y
                )
            ) {
                storePosition.push({ x: move.position.x, y: move.position.y })
            }
        }
    }
    return storePosition.length
}
console.log(main())
