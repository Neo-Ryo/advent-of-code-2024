import { readFile } from '../utils/index'
const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')

function getDataFromLine(line: string) {
    const [left, right] = line.split(':')
    const rightNums = right.split(' ').reduce<number[]>((acc, curr) => {
        if (curr !== '') {
            acc.push(Number(curr))
        }
        return acc
    }, [])
    return { caliber: Number(left), equation: rightNums }
}

function generateCombinations(length: number): string[] {
    const combinations: string[] = []

    function backtrack(current: string[]) {
        if (current.length === length) {
            combinations.push(current.join(''))
            return
        }

        for (const symbol of ['+', '*']) {
            current.push(symbol)
            backtrack(current)
            current.pop()
        }
    }

    backtrack([])
    return combinations
}

// function calculate(equation: number[], operators: string[]) {
//     let newOp = [...operators]
//     let eq: number[] = [...equation]
//     // resolve multiplications
//     for (let i = 0; i < newOp.length; i++) {
//         if (newOp[i] === '*') {
//             const res = eq[i] * eq[i + 1]
//             eq.splice(i, 2, res)
//             newOp.splice(i, 1)
//             i--
//         }
//     }
//     return eq.reduce((acc, curr) => {
//         acc += curr
//         return acc
//     }, 0)
// }

function calculateLeftToRight(equation: number[], operators: string[]) {
    return equation.reduce((acc, curr, i) => {
        if (i === 0 || operators[i - 1] === '+') {
            acc += curr
        } else {
            acc *= curr
        }
        return acc
    }, 0)
}

function main() {
    let res = 0
    for (const line of lines) {
        const { caliber, equation } = getDataFromLine(line)
        const allCombinations = generateCombinations(equation.length - 1)
        for (const combi of allCombinations) {
            const result = calculateLeftToRight(equation, combi.split(''))
            if (result === caliber) {
                res += caliber
                break
            }
        }
    }
    console.log(res)
}

main()
