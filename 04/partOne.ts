import { readFile } from '../utils/index'
const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')

let numOfXMAS = 0

const xmasReg = new RegExp(/XMAS/, 'g')

function findXMAS(arr: string[]) {
    let xmas = 0
    for (const line of arr) {
        const res = line.match(xmasReg)
        xmas += res?.length ?? 0
    }
    return xmas
}

function makeCols(arr: string[]) {
    let cols: string[] = []
    for (const line of arr) {
        for (let i = 0; i < line.length; i++) {
            if (cols[i] === undefined) {
                cols[i] = line[i]
            } else {
                cols[i] += line[i]
            }
        }
    }
    return cols
}

function backWardLines(arr: string[]) {
    let backward = []
    for (const line of arr) {
        backward.push(line.split('').reverse().join(''))
    }
    return backward
}

function makeDiagonales(arr: string[]) {
    let diags: string[] = []
    // console.log(line.length)
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (i === 0 || (i !== 0 && j === 0)) {
                let diag = arr[i][j]
                for (let k = 0; k < arr[i].length; k++) {
                    if (k > 0 && arr[i + k] && arr[i + k][j + k]) {
                        diag += arr[i + k][j + k]
                    }
                }
                diags.push(diag)
            }
        }
    }
    return diags
}

// line
numOfXMAS += findXMAS(lines)
console.log('line: ', findXMAS(lines))
// line backward
numOfXMAS += findXMAS(backWardLines(lines))
console.log('line backward: ', findXMAS(backWardLines(lines)))
// col
numOfXMAS += findXMAS(makeCols(lines))
console.log('cols: ', findXMAS(makeCols(lines)))
// col backward
numOfXMAS += findXMAS(backWardLines(makeCols(lines)))
console.log('cols backward: ', findXMAS(backWardLines(makeCols(lines))))
// diag
numOfXMAS += findXMAS(makeDiagonales(lines))
console.log('diags: ', findXMAS(makeDiagonales(lines)))
// diag backward
numOfXMAS += findXMAS(backWardLines(makeDiagonales(lines)))
console.log('diags backward: ', findXMAS(backWardLines(makeDiagonales(lines))))
// reverse diag
numOfXMAS += findXMAS(makeDiagonales(backWardLines(lines)))
console.log('reverse diags: ', findXMAS(makeDiagonales(backWardLines(lines))))
// reverse diag backward
numOfXMAS += findXMAS(makeDiagonales(backWardLines(makeCols(lines))))
console.log(
    'reverse diags backward: ',
    findXMAS(makeDiagonales(backWardLines(makeCols(lines))))
)

console.log(numOfXMAS)
