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
    direction: Direction,
    map: string[]
): { position: Position; direction: Direction } | 'OUT' {
    if (direction === Direction.UP) {
        if (
            map[currentGuardPosition.y - 1] &&
            map[currentGuardPosition.y - 1][currentGuardPosition.x]
        ) {
            const nextStep =
                map[currentGuardPosition.y - 1][currentGuardPosition.x]
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
            map[currentGuardPosition.y + 1] &&
            map[currentGuardPosition.y + 1][currentGuardPosition.x]
        ) {
            const nextStep =
                map[currentGuardPosition.y + 1][currentGuardPosition.x]
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
        if (map[currentGuardPosition.y][currentGuardPosition.x + 1]) {
            const nextStep =
                map[currentGuardPosition.y][currentGuardPosition.x + 1]
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
        if (map[currentGuardPosition.y][currentGuardPosition.x - 1]) {
            const nextStep =
                map[currentGuardPosition.y][currentGuardPosition.x - 1]
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

function setCrateOnThePath(storePosition: Position[]) {
    const linesToCheck: string[][] = []
    for (const step of storePosition) {
        const newLines = lines.reduce<string[]>((acc, curr, i) => {
            if (i === step.y) {
                curr = curr
                    .split('')
                    .map((e, i) => {
                        if (i === step.x) {
                            return 'O'
                        } else {
                            return e
                        }
                    })
                    .join('')
            }
            acc.push(curr)
            return acc
        }, [])
        linesToCheck.push(newLines)
    }
    return linesToCheck
}

function isInfiniteLoop(newLineToCheck: string[]) {
    const initialPosition = findGuardPosition()
    // FIND A WAY TO DETECT INFINITE LOOP...
    // DETECT IF A POSITION + A DIRECTION HAVE ALREADY BEEN REGISTERED
    let guardPosition = initialPosition
    let direction = Direction.UP
    let isOut = false
    let storePath: { position: Position; direction: Direction }[] = []

    while (!isOut) {
        let move = guardMove(guardPosition, direction, newLineToCheck)
        if (move === 'OUT') {
            isOut = true
        } else {
            guardPosition = move.position
            direction = move.direction
            if (
                !storePath.find(
                    (s) =>
                        s.position.x === move.position.x &&
                        s.position.y === move.position.y &&
                        s.direction === move.direction
                )
            ) {
                storePath.push({
                    position: {
                        x: move.position.x,
                        y: move.position.y,
                    },
                    direction: move.direction,
                })
            } else {
                return true
            }
        }
    }

    return false
}
function main() {
    const initialPosition = findGuardPosition()
    let guardPosition = initialPosition
    let direction = Direction.UP
    let isOut = false
    let storePosition: Position[] = []
    while (!isOut) {
        let move = guardMove(guardPosition, direction, lines)
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
    // DO SOMETHING WITH THE STORE POSITIONS
    // REMOVE INITIAL GUARD POSITION
    storePosition = storePosition.filter(
        (sp) => !(sp.x === initialPosition.x && sp.y === initialPosition.y)
    )
    // SET A CRATE IN ANY GUARD PATHWAY
    const newLinesToCheck = setCrateOnThePath(storePosition)
    let res = 0
    for (const newLine of newLinesToCheck) {
        const isInfinite = isInfiniteLoop(newLine)
        if (isInfinite) {
            res++
        }
    }
    return res
}

console.log(main())
