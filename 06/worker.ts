import { parentPort, workerData, isMainThread } from 'node:worker_threads'
// import { Direction, guardMove } from './thread'
// import type { Position } from './thread'
// a CPU-intensive task

export enum Direction {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

export type Position = {
    x: number
    y: number
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

function isInfiniteLoop(chunk: string[][], initialPosition: Position) {
    let res = 0
    for (const newLineToCheck of chunk) {
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
                    res++
                    break
                }
            }
        }
    }
    console.log('RES: ', res)

    return res
}

parentPort &&
    parentPort.postMessage(
        isInfiniteLoop(workerData.chunk, workerData.initialPosition)
    )
