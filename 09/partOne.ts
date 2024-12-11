import { readFile } from '../utils/index'
const line = readFile(__dirname, 'input.txt')
// const line = readFile(__dirname, 'test.txt')

function makeDiskMap(line: string) {
    let diskMap = ''
    const split = line.split('')
    for (let i = 0; i < split.length; i++) {
        const value = Number(split[i])
        if (value > 0) {
            // disk use
            if (i % 2 === 0) {
                const id = i / 2
                for (let j = 0; j < value; j++) {
                    diskMap += String(id)
                }
            } else {
                for (let j = 0; j < value; j++) {
                    diskMap += '.'
                }
            }
        }
    }
    return diskMap
}

function getFreeSpacePositions(diskMap: string[]) {
    return diskMap.reduce<number[]>((acc, curr, i) => {
        if (curr === '.') {
            acc.push(i)
        }
        return acc
    }, [])
}

function defragDisk(diskData: string) {
    let diskMapArray = makeDiskMap(diskData).split('')

    const free = getFreeSpacePositions(diskMapArray)
    for (let i = 0; i < diskMapArray.length; i++) {
        const revIndex = diskMapArray.length - 1 - i
        const dataToMove = diskMapArray[revIndex]
        if (dataToMove !== '.' && free.length && free[0] < revIndex) {
            diskMapArray.splice(free[0], 1, dataToMove)
            diskMapArray.splice(revIndex, 1, '.')
            free.shift()
        }
    }
    return diskMapArray
}

function main(line: string) {
    const defraged = defragDisk(line)
    // make checksum
    // console.log(defraged)

    const checksum = defraged.reduce((acc, curr, i) => {
        const n = Number(curr)
        if (!Number.isNaN(n)) {
            acc += i * n
        }
        return acc
    }, 0)
    console.log(checksum)
}

main(line)
