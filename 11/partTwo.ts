import { readFile } from '../utils/index'
// const line = readFile(__dirname, 'input.txt')
const line = readFile(__dirname, 'test.txt')

function turnStoneIntoNewOnes(stone: number): Array<number> {
    let res: number[] = []
    if (stone === 0) {
        res.push(1)
    } else if (String(stone).length % 2 === 0) {
        // split in 2
        const split = String(stone).split('')
        const half = split.length / 2

        const [left, right] = [
            Number(split.slice(0, half).join('')),
            Number(split.slice(half).join('')),
        ]
        res.push(left, right)
    } else {
        res.push(stone * 2024)
    }
    return res
}

// console.log(turnStoneIntoNewOnes(4))

function blink(array: number[]): number[] {
    let res: number[] = []
    // do some
    for (let i = 0; i < array.length; i++) {
        res.push(...turnStoneIntoNewOnes(array[i]))
    }

    return res
}

function main(line: string, blinkNumber: number) {
    let arr = line.split(' ').map((e) => Number(e))
    for (let i = 0; i < blinkNumber; i++) {
        arr = blink(arr)
        // console.log(arr)
    }
    // console.log(arr)

    console.log(arr.length)
}

main(line, 25)
// console.log(Number('000'))
