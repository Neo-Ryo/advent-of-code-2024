import { readFile } from '../utils/index'
const lines = readFile(__dirname, 'input.txt').split('\n')
const linesTest = readFile(__dirname, 'test.txt').split('\n')

type Position = {
    x: number
    y: number
}

const Directions = ['E', 'S', 'W', 'N']

class Main {
    map: string[]
    constructor(map: string[]) {
        this.map = map
    }

    getStartingPoints(): Position[] {
        const map = this.map
        let positions: Position[] = []
        for (let i = 0; i < map.length; i++) {
            const line = map[i].split('')
            for (let j = 0; j < line.length; j++) {
                if (map[i][j] === '0') {
                    positions.push({ x: j, y: i })
                }
            }
        }
        return positions
    }

    getAllPotentialNextSteps(
        map: string[],
        currentPosition: Position,
        currentValue: number
    ): { position: Position; direction: string; value: number }[] {
        let potentialSteps: {
            position: Position
            direction: string
            value: number
        }[] = []
        for (const dir of Directions) {
            if (dir === 'E') {
                if (
                    map[currentPosition.y] &&
                    map[currentPosition.y][currentPosition.x + 1] &&
                    Number(map[currentPosition.y][currentPosition.x + 1]) ===
                        currentValue + 1
                ) {
                    potentialSteps.push({
                        direction: dir,
                        position: {
                            y: currentPosition.y,
                            x: currentPosition.x + 1,
                        },
                        value: currentValue + 1,
                    })
                }
            }
            if (dir === 'S') {
                if (
                    map[currentPosition.y + 1] &&
                    map[currentPosition.y + 1][currentPosition.x] &&
                    Number(map[currentPosition.y + 1][currentPosition.x]) ===
                        currentValue + 1
                ) {
                    potentialSteps.push({
                        direction: dir,
                        position: {
                            y: currentPosition.y + 1,
                            x: currentPosition.x,
                        },
                        value: currentValue + 1,
                    })
                }
            }
            if (dir === 'W') {
                if (
                    map[currentPosition.y] &&
                    map[currentPosition.y][currentPosition.x - 1] &&
                    Number(map[currentPosition.y][currentPosition.x - 1]) ===
                        currentValue + 1
                ) {
                    potentialSteps.push({
                        direction: dir,
                        position: {
                            y: currentPosition.y,
                            x: currentPosition.x - 1,
                        },
                        value: currentValue + 1,
                    })
                }
            }
            if (dir === 'N') {
                if (
                    map[currentPosition.y - 1] &&
                    map[currentPosition.y - 1][currentPosition.x] &&
                    Number(map[currentPosition.y - 1][currentPosition.x]) ===
                        currentValue + 1
                ) {
                    potentialSteps.push({
                        direction: dir,
                        position: {
                            y: currentPosition.y - 1,
                            x: currentPosition.x,
                        },
                        value: currentValue + 1,
                    })
                }
            }
        }
        return potentialSteps
    }

    private isNinAlreadyFound(nines: Position[], pos: Position): boolean {
        if (nines.find((e) => e.x === pos.x && e.y === pos.y)) return true
        return false
    }
    checkAllTracks() {
        const startingPositions = this.getStartingPoints()
        let validTracksNotes: number[] = []

        for (const start of startingPositions) {
            let trackNote = 0
            let potentialTracks: {
                position: Position
                direction: string
                value: number
            }[] = [{ direction: 'E', position: start, value: 0 }]
            // let currentNinesPos: Position[] = []
            // find all potential path to 9
            while (potentialTracks.length > 0) {
                const pt = this.getAllPotentialNextSteps(
                    this.map,
                    potentialTracks[0].position,
                    potentialTracks[0].value
                )

                if (pt.length) {
                    potentialTracks.push(...pt.filter((e) => e.value !== 9))
                    const newNines = pt.filter((e) => e.value === 9)
                    trackNote += newNines.length
                }
                potentialTracks.shift()
            }
            validTracksNotes.push(trackNote)
        }
        return validTracksNotes
    }
    result() {
        return this.checkAllTracks().reduce((acc, curr) => (acc += curr), 0)
    }
}

const main = new Main(lines)

console.log(main.result())
