import { readFile } from '../utils/index'
const file = readFile(__dirname, 'input.txt')
// const file = readFile(__dirname, 'test.txt')

const split = file.split('\n\n')

const towels = split[0].split(', ')
const patterns = split[1].split('\n')

function findCombination(towels: string[], pattern: string): number {
    let res: number = 0
    function check(current: string) {
        console.log(current)
        for (let towel of towels) {
            const next = current + towel
            if (next === pattern) {
                res++
            } else if (pattern.startsWith(next)) {
                check(next)
            }
        }
    }

    check('')
    return res
}
function main() {
    let designs: number = 0

    for (const pattern of patterns) {
        const res = findCombination(towels, pattern)
        designs += res
    }
    return designs
}
console.log(main())
