// https://adventofcode.com/2024/day/1
import { readFile } from '../utils/index'

const text = readFile(__dirname, './input.txt')

const [leftArr, rightArr] = text.split('\n').reduce<Array<Array<number>>>(
    (acc, curr) => {
        const [l, r] = curr.split(/[ ]+/)
        acc[0].push(Number(l))
        acc[1].push(Number(r))
        return acc
    },
    [[], []]
)

function findOccurences(n: number, rightSideArray: Array<number>): number {
    return rightSideArray.filter((e) => e === n).length
}

let res = 0

for (const n of leftArr) {
    res += n * findOccurences(n, rightArr)
}

console.log(res)
