import { readFile } from '../utils/index'
const file = readFile(__dirname, 'input.txt')
// const file = readFile(__dirname, 'test.txt')

const split = file.split('\n\n')

const towels = split[0].split(', ')
const patterns = split[1].split('\n')

function findCombination(
    towels: string[],
    pattern: string
): 'fail' | 'success' {
    let res: 'fail' | 'success' = 'fail'
    const visited = new Set<string>()

    function check(current: string) {
        if (res === 'success' || visited.has(current)) {
            return
        }
        visited.add(current)

        for (let towel of towels) {
            const next = current + towel
            if (next === pattern) {
                res = 'success'
                return
            }
            if (pattern.startsWith(next)) {
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
        if (res === 'success') {
            designs++
        }
    }
    return designs
}

console.log(main())
