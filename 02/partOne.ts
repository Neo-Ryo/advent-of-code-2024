import { readFile } from '../utils/index'

const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')

let safeReports: number = 0
const safeLines: string[] = []
for (let i = 0; i < lines.length; i++) {
    const nums = lines[i].split(' ').map((e) => Number(e))
    let lastNum: number | null = null
    let type: null | 'inc' | 'dec' = null
    let isSafe: boolean = true
    for (const num of nums) {
        if (!isSafe) {
            break
        }
        if (lastNum === null) {
            lastNum = num
            continue
        }
        if (num === lastNum) {
            isSafe = false
            break
        }
        if (type === null) {
            if (num > lastNum) type = 'inc'
            else type = 'dec'
        }

        if (type === 'inc') {
            // increase
            if (num < lastNum) {
                isSafe = false
                break
            }
            if (num - lastNum > 3) {
                isSafe = false
                break
            } else {
                lastNum = num
                continue
            }
        } else {
            // decrease
            if (num > lastNum) {
                isSafe = false
                break
            }
            if (lastNum - num > 3) {
                isSafe = false
                break
            } else {
                lastNum = num
                continue
            }
        }
    }
    if (isSafe) safeReports++
}

console.log(safeReports)
