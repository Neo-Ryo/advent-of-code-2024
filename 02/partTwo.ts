import { readFile } from '../utils/index'

const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')

let safeReports: number = 0

function isLineSafe(nums: number[]) {
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
    return isSafe
}

function isMoreThanTwoEquals(nums: number[]) {
    for (let i = 0; i < nums.length; i++) {
        if (nums.filter((e) => e === nums[i]).length > 2) {
            return true
        }
    }
    return false
}
for (let i = 0; i < lines.length; i++) {
    const nums = lines[i].split(' ').map((e) => Number(e))
    if (isMoreThanTwoEquals(nums)) {
        continue
    }
    if (isLineSafe(nums)) {
        safeReports++
    } else {
        for (let i = 0; i < nums.length; i++) {
            let newArr = [...nums]
            newArr.splice(i, 1)
            if (isLineSafe(newArr)) {
                safeReports++
                break
            }
        }
    }
}
console.log(safeReports)
