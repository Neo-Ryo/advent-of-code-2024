import { readFile } from '../utils/index'
const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')
const sep = lines.findIndex((e) => e === '')
const [rules, updates] = [lines.splice(0, sep), lines.splice(1, lines.length)]

function ruleChecker(
    rules: string[],
    update: string
): { validate: boolean; middPage?: number } {
    const updateArr = update.split(',')
    let validate = true
    for (const rule of rules) {
        const [before, after] = rule.split('|')
        const [b, a] = [
            updateArr.find((e) => e === before),
            updateArr.find((e) => e === after),
        ]
        if (b && a) {
            // check rule
            if (
                updateArr.findIndex((e) => e === b) >
                updateArr.findIndex((e) => e === a)
            ) {
                validate = false
                break
            }
        }
    }
    return {
        validate,
        middPage: Number(updateArr[Math.floor(updateArr.length / 2)]),
    }
}

function main() {
    let res = 0
    for (const update of updates) {
        const check = ruleChecker(rules, update)
        if (check.validate) {
            res += check.middPage ?? 0
        }
    }
    return res
}
console.log(main())
