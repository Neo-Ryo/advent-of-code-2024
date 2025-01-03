import { readFile } from '../utils/index'
// const lines = readFile(__dirname, 'input.txt').split('\n')
const lines = readFile(__dirname, 'test.txt').split('\n')

type Position = {
    y: number
    x: number
}

type Direction = 'N' | 'E' | 'S' | 'W'

class PicoRacer {
    x = 0
    y = 0
    map: string[]
    constructor(map: string[]) {
        this.map = map
    }
    getStartEnd(): { start: Position; end: Position } {
        let res: { start: Position; end: Position } = {
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
        }
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if (this.map[i][j] === 'S') {
                    res.start = {
                        x: j,
                        y: i,
                    }
                }
                if (this.map[i][j] === 'E') {
                    res.end = {
                        x: j,
                        y: i,
                    }
                }
            }
        }
        return res
    }

    getMapInput(position: Position): string | undefined {
        if (!this.map[position.y]) {
            return undefined
        }
        return this.map[position.y][position.x]
    }

    nexStep(
        currentPosition: Position,
        direction: Direction | null
    ): { nextStep: Position; direction: Direction } | undefined | 'ARRIVED!' {
        // let res: { nextStep: Position; direction: Direction } | undefined
        const dirs = ['N', 'E', 'S', 'W']
        for (const dir of dirs) {
            if (dir === 'N') {
                if (direction === 'S') {
                    continue
                }
                const nextStep: Position = {
                    x: currentPosition.x,
                    y: currentPosition.y - 1,
                }
                if (this.getMapInput(nextStep) === 'E') {
                    return 'ARRIVED!'
                }
                if (this.getMapInput(nextStep) === '.') {
                    this.x = nextStep.x
                    this.y = nextStep.y
                    return { nextStep, direction: 'N' }
                }
            }
            if (dir === 'E') {
                if (direction === 'W') {
                    continue
                }
                const nextStep: Position = {
                    x: currentPosition.x + 1,
                    y: currentPosition.y,
                }
                if (this.getMapInput(nextStep) === 'E') {
                    return 'ARRIVED!'
                }
                if (this.getMapInput(nextStep) === '.') {
                    this.x = nextStep.x
                    this.y = nextStep.y
                    return { nextStep, direction: 'E' }
                }
            }
            if (dir === 'S') {
                if (direction === 'N') {
                    continue
                }
                const nextStep: Position = {
                    x: currentPosition.x,
                    y: currentPosition.y + 1,
                }
                if (this.getMapInput(nextStep) === 'E') {
                    return 'ARRIVED!'
                }
                if (this.getMapInput(nextStep) === '.') {
                    this.x = nextStep.x
                    this.y = nextStep.y
                    return { nextStep, direction: 'S' }
                }
            }

            if (dir === 'W') {
                if (direction === 'E') {
                    continue
                }
                const nextStep: Position = {
                    x: currentPosition.x - 1,
                    y: currentPosition.y,
                }
                if (this.getMapInput(nextStep) === 'E') {
                    return 'ARRIVED!'
                }
                if (this.getMapInput(nextStep) === '.') {
                    this.x = nextStep.x
                    this.y = nextStep.y
                    return { nextStep, direction: 'W' }
                }
            }
        }
    }
    raceToEnd(): number {
        let pico = 1

        const { start, end } = this.getStartEnd()
        let current = this.nexStep(start, null)
        while (current !== 'ARRIVED!') {
            if (current) {
                current = this.nexStep(current.nextStep, current.direction)
                pico++
            }
        }

        return pico
    }

    // TODO write the cheater method
}

const racer = new PicoRacer(lines)
console.log(racer.raceToEnd())
