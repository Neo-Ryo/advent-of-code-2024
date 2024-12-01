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

const [lSorted, rSorted] = [
    leftArr.sort((a, b) => a - b),
    rightArr.sort((a, b) => a - b),
]

let res = 0
for (let i = 0; i < lSorted.length; i++) {
    const [l, r] = [lSorted[i], rSorted[i]]
    if (l >= r) {
        res += l - r
    } else {
        res += r - l
    }
}
console.log(res)
