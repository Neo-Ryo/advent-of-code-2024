console.log('Hello via Bun!')

function generateCombinationsWithLength(
    length: number,
    symbols: string[]
): string[] {
    const combinations: string[] = []

    function backtrack(current: string[]) {
        if (current.length === length) {
            combinations.push(current.join(''))
            return
        }

        for (const symbol of symbols) {
            current.push(symbol)
            backtrack(current)
            current.pop()
        }
    }

    backtrack([])
    return combinations
}

// console.log(generateCombinationsWithLength(2, ['x', 'y']))

function generateCombinations(symbols: string[], pattern: string) {
    let res = 'fail'
    function backtrack(current: string[]) {
        if (pattern.startsWith(current.join(''))) console.log(current.join(''))

        if (current.join('') === pattern) {
            res = 'success'
            return
        }
        if (current.join('').length >= pattern.length) {
            return
        }

        for (const symbol of symbols) {
            current.push(symbol)
            backtrack(current)
            current.pop()
        }
    }

    backtrack([])
    return res
}

// brwrr
// bggr
// gbbr
// rrbgbr
// ubwu
// bwurrg
// brgr
// bbrgwb

const patt = 'brwrr'
const res = generateCombinations(
    ['r', 'wr', 'g', 'bwu', 'rb', 'gb', 'br'],
    patt
)
// console.log(res.filter((el) => el === 'brwrr'))
console.log('result: ', res)
