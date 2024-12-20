import { readFile } from '../utils/index'

// const lines = readFile(__dirname, 'input.txt').split('\n')
const lines = readFile(__dirname, 'test.txt').split('\n')

type Position = {
    y: number
    x: number
}

const directions = ['E', 'S', 'W', 'N']

function scanAround(
    map: string[],
    position: Position,
    fieldLabel: string
): Position[] {
    let foundField: Position[] = []
    const { x, y } = position
    for (const dir of directions) {
        if (dir === 'E') {
            const next = map[y][x + 1]
            if (next === fieldLabel) foundField.push({ x: x + 1, y })
        }
        if (dir === 'S') {
            const next = map[y + 1] ? map[y + 1][x] : undefined
            if (next === fieldLabel) foundField.push({ x, y: y + 1 })
        }
        if (dir === 'W') {
            const next = map[y][x - 1]
            if (next === fieldLabel) foundField.push({ x: x - 1, y })
        }
        if (dir === 'N') {
            const next = map[y - 1] ? map[y - 1][x] : undefined
            if (next === fieldLabel) foundField.push({ x, y: y - 1 })
        }
    }
    return foundField
}

function findField(map: string[], start: Position, fieldLabel: string) {
    let area: Position[] = [start]
    let next = scanAround(map, start, fieldLabel)

    while (next.length > 0) {
        let scan = scanAround(map, next[0], fieldLabel)
        area.push(next[0])
        next.shift()
        next.push(...scan)
        next = next.filter((s) => !area.find((a) => s.x === a.x && s.y === a.y))
    }
    return area
}

function defineAreaPerimeter(
    area: Position[],
    current: Position,
    registeredSides: { a: Position; b: Position }[]
) {
    return
}

const area = [
    {
        x: 9,
        y: 4,
    },
    {
        x: 9,
        y: 5,
    },
    {
        x: 9,
        y: 6,
    },
    {
        x: 8,
        y: 5,
    },
    {
        x: 9,
        y: 7,
    },
    {
        x: 8,
        y: 6,
    },
    {
        x: 9,
        y: 8,
    },
    {
        x: 8,
        y: 7,
    },
    {
        x: 9,
        y: 9,
    },
    {
        x: 8,
        y: 8,
    },
    {
        x: 8,
        y: 9,
    },
    {
        x: 7,
        y: 8,
    },
    {
        x: 7,
        y: 9,
    },
]
// console.log(findField(lines, { x: 9, y: 4 }, 'E'))
// console.log(scanAround(lines, { x: 0, y: 0 }, 'R'))
console
    .log
    // defineAreaPerimeter()
    ()
