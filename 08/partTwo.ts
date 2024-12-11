import { readFile } from '../utils/index'
const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')

type Position = {
    x: number
    y: number
}

function getAllAntenasPosition(map: string[]) {
    let res: Record<string, Position[]> = {}
    for (let i = 0; i < map.length; i++) {
        const line = map[i].split('')
        for (let j = 0; j < line.length; j++) {
            if (line[j] !== '.') {
                if (res[line[j]] === undefined) {
                    res[line[j]] = [{ y: i, x: j }]
                } else {
                    res[line[j]].push({ y: i, x: j })
                }
            }
        }
    }
    return res
}

function antiNodePosition(pair: Position[]): Position {
    let res: Position = { x: 0, y: 0 }
    const { x: xa, y: ya } = pair[0]
    const { x: xb, y: yb } = pair[1]
    const xDiff = Math.abs(xa - xb)
    const yDiff = Math.abs(ya - yb)
    if (xa > xb) {
        res.x = xb - xDiff
    } else {
        res.x = xb + xDiff
    }
    if (ya > yb) {
        res.y = yb - yDiff
    } else {
        res.y = yb + yDiff
    }
    return res
}

function isOutOfRange(map: string[], pos: Position) {
    if (
        !(pos.y < 0) &&
        pos.y < map.length &&
        !(pos.x < 0) &&
        pos.x < map[0].split('').length
    ) {
        return false
    }
    return true
}

function createNewMapWithAntiNodes(map: string[], antenaPositions: Position[]) {
    let nMap = [...map]
    let combis: Position[][] = []
    for (let i = 0; i < antenaPositions.length; i++) {
        for (let j = i + 1; j < antenaPositions.length; j++) {
            if (i !== j) {
                combis.push([antenaPositions[i], antenaPositions[j]])
            }
        }
    }
    for (const pair of combis) {
        // make antinodes
        let [nodeA, nodeB] = [
            antiNodePosition(pair),
            antiNodePosition(pair.toReversed()),
        ]
        let updatablePair = [...pair]
        while (!isOutOfRange(nMap, nodeA)) {
            // check if spot free
            // update map
            nMap[nodeA.y] = nMap[nodeA.y].split('').reduce((acc, curr, i) => {
                if (i === nodeA.x) {
                    acc += '#'
                } else {
                    acc += curr
                }
                return acc
            }, '')
            // }
            updatablePair.shift()
            updatablePair.push(nodeA)
            nodeA = antiNodePosition(updatablePair)
        }
        updatablePair = [...pair].toReversed()
        while (!isOutOfRange(nMap, nodeB)) {
            // check if spot free
            // update map
            nMap[nodeB.y] = nMap[nodeB.y].split('').reduce((acc, curr, i) => {
                if (i === nodeB.x) {
                    acc += '#'
                } else {
                    acc += curr
                }
                return acc
            }, '')
            // }
            updatablePair.shift()
            updatablePair.push(nodeB)
            nodeB = antiNodePosition(updatablePair)
        }
    }

    return nMap
}

function countAll(map: string[]): number {
    let res = 0
    for (const line of map) {
        for (const char of line.split('')) {
            if (char !== '.') res++
        }
    }
    return res
}
function main() {
    const allPos = getAllAntenasPosition(lines)
    let nLines = [...lines]
    for (const key of Object.keys(allPos)) {
        if (allPos[key].length > 1) {
            nLines = createNewMapWithAntiNodes(nLines, allPos[key])
        }
    }
    console.log(countAll(nLines))
}

main()
