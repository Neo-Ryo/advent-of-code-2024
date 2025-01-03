import { readFile } from '../utils/index'
const file = readFile(__dirname, 'input.txt')
// const file = readFile(__dirname, 'test.txt')

function outputData(file: string) {
    const lines = file.split('\n')
    return lines
}

function filterValue(a: string[]) {
    return a.filter((e, _i, arr) => arr.filter((f) => f === e).length < 2)
}
function createMissingThird(a: string, b: string): string[] {
    // extract the one already present in a and b
    let arr = [...a.split('-'), ...b.split('-')]
    // console.log(arr)

    return filterValue(arr)
}
// function rotateArray(arr: string[], rotateBy: number) {
//     const n = arr.length
//     rotateBy %= n

//     return arr.slice(rotateBy).concat(arr.slice(0, rotateBy))
// }
// function filterDuplicateLans(arr: string[]): string[] {
//     return arr.reduce((acc, curr, i, array) => {
//         // let curr2 = rotateArray(curr.split('-'), 1)
//         // let curr3 = rotateArray(curr.split('-'), 2)

//         return acc
//     }, [])
// }

function main() {
    const data = outputData(file)
    // [['ta-td', 'ta-dh', 'dh-td']]
    let lans: string[] = []
    // let checked: Set<string> = new Set()
    for (const line of data) {
        const [a, b] = line.split('-')
        let allA = data.filter((l) => l.includes(a) && l !== line)
        let allB = data.filter((l) => l.includes(b) && l !== line)
        for (const aPair of allA) {
            const missingThird = createMissingThird(line, aPair)
            if (
                data.find(
                    (d) =>
                        d === missingThird.join('-') ||
                        d === missingThird.toReversed().join('-')
                )
            ) {
                const single = [
                    ...new Set(
                        line
                            .split('-')
                            .concat(aPair.split('-'))
                            .concat(missingThird)
                    ),
                ]
                lans.push(single.join('-'))
            }
        }
        for (const bPair of allB) {
            const missingThird = createMissingThird(line, bPair)
            if (
                data.find(
                    (d) =>
                        d === missingThird.join('-') ||
                        d === missingThird.toReversed().join('-')
                )
            ) {
                const single = [
                    ...new Set(
                        line
                            .split('-')
                            .concat(bPair.split('-'))
                            .concat(missingThird)
                    ),
                ]
                lans.push(single.join('-'))
            }
        }
    }

    // console.log(lans)
    lans = [
        ...new Set(
            lans.map((e) => {
                return e.split('-').sort().join('-')
            })
        ),
    ].filter((e) => e.split('-').find((f) => f.startsWith('t')))
    // remove duplicates
    return lans.length
}

console.log(main())
// console.log(outputData(file))
// const data = outputData(file)
// const cpu = 'tc'
// let allPairs = data.reduce((acc, curr) => {
//     if (curr.includes(cpu)) {
//         acc.push(...curr.filter((c) => c !== cpu))
//     }
//     return acc
// }, [])

// console.log(allPairs)

// console.log(createMissingThird('kh-tc', 'qp-kh'))

// const originalArray = ['1', '2', '3']
// const rotatedArray = rotateArray(originalArray, 1)
// const rotatedArray2 = rotateArray(originalArray, 2)
// console.log(originalArray)
// console.log(rotatedArray)
// console.log(rotatedArray2)
