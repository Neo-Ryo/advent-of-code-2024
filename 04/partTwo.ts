import { readFile } from '../utils/index'
const lines = readFile(__dirname, 'input.txt').split('\n')

function getCross(arr: string[]): string[] {
    return [
        arr[0][0] + arr[1][1] + arr[2][2],
        arr[0][2] + arr[1][1] + arr[2][0],
    ]
}

function mapBlocs(arr: string[]) {
    let blocs: string[][] = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i + 2] && arr[i][j + 2]) {
                let line1 = arr[i][j] + arr[i][j + 1] + arr[i][j + 2]
                let line2 =
                    arr[i + 1][j] + arr[i + 1][j + 1] + arr[i + 1][j + 2]

                let line3 =
                    arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2]

                blocs.push([line1, line2, line3])
            }
        }
    }
    return blocs
}

function checkIfMAS(line: string) {
    if (line === 'MAS' || line.split('').reverse().join('') === 'MAS') {
        return true
    }
    return false
}

function findAllXMAS(arr: string[]) {
    const blocs = mapBlocs(arr)
    let xmas = 0
    for (const bloc of blocs) {
        const cross = getCross(bloc)
        let isXMAS = true
        for (const line of cross) {
            if (!checkIfMAS(line)) isXMAS = false
        }
        if (isXMAS) {
            xmas++
        }
    }
    return xmas
}
console.log(findAllXMAS(lines))
