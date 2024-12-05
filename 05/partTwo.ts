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

function orderUpdates(rules: string[], update: string[]) {
    let updateArr = [...update]
    for (const rule of rules) {
        const [before, after] = rule.split('|')
        const [b, a] = [
            updateArr.find((e) => e === before),
            updateArr.find((e) => e === after),
        ]
        if (b && a) {
            // check rule
            const bIndex = updateArr.findIndex((e) => e === b)
            const aIndex = updateArr.findIndex((e) => e === a)
            if (bIndex > aIndex) {
                const n = updateArr.splice(bIndex, 1)
                updateArr.splice(aIndex, 0, n[0])
            }
        }
    }
    return updateArr
}

function main() {
    let res = 0
    for (const update of updates) {
        const check = ruleChecker(rules, update)
        if (!check.validate) {
            let ordered: string[] = update.split(',')
            let hasChanged = true
            // re iterate on rule in case array has changed
            while (hasChanged) {
                let newArr = orderUpdates(rules, ordered)
                if (JSON.stringify(newArr) !== JSON.stringify(ordered)) {
                    hasChanged = true
                } else {
                    hasChanged = false
                }
                ordered = newArr
            }
            res += Number(ordered[Math.floor(ordered.length / 2)])
        }
    }
    console.log(res)
}
main()
