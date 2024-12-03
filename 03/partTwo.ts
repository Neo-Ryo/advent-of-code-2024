import { readFile } from '../utils/index'
const text = readFile(__dirname, 'input.txt')
// const text = readFile(__dirname, 'test.txt')

const reg = new RegExp(/mul\(\d+,\d+\)|do\(\)|don\'t\(\)/, 'g')

// extract mul(x,x)
const muls = text.match(reg)
console.log(muls)
const mulsRes: number[] = []

let storeMule = true

for (const mul of muls as string[]) {
    // extract numbers in mul(x,x)
    if (mul === 'do()') {
        storeMule = true
        continue
    }
    if (mul === "don't()") {
        storeMule = false
        continue
    }
    if (storeMule) {
        const reg = new RegExp(/\d+/, 'g')
        const res = mul
            .match(reg)
            ?.map((e) => Number(e))
            .reduce((acc, curr) => acc * curr, 1)

        mulsRes.push(res ?? 0)
    }
}
const addUp = mulsRes.reduce((acc, curr) => acc + curr, 0)
console.log(addUp)
