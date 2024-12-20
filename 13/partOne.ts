// import { readFile } from '../utils/index'
// // const lines = readFile(__dirname, 'input.txt').split('\n')
// const lines = readFile(__dirname, 'test.txt').split('\n')

// type MachineData = {
//     buttonA: { x: number; y: number }
//     buttonB: { x: number; y: number }
//     prize: { x: number; y: number }
// }

// function storeData(data: string[]): MachineData[] {
//     let res: MachineData[] = []
//     let chunks: string[][] = []
//     let batch: string[] = []
//     while (data.length) {
//         const line = lines.shift()
//         if (line === '') {
//             chunks.push(batch)
//             batch = []
//         } else {
//             batch.push(line!)
//         }
//     }
//     for (const chunk of chunks) {
//         // console.log(current)
//         let current: MachineData = {
//             buttonA: { x: 0, y: 0 },
//             buttonB: { x: 0, y: 0 },
//             prize: { x: 0, y: 0 },
//         }

//         for (const line of chunk) {
//             // one line
//             const regButtonA = new RegExp(/Button A/g)
//             const regButtonB = new RegExp(/Button B/g)
//             const regPrize = new RegExp(/Prize/g)
//             const regXplus = new RegExp(/X\+\d+/g)
//             const regYplus = new RegExp(/Y\+\d+/g)
//             if (regButtonA.test(line)) {
//                 console.log('Button A')
//                 const x = regXplus.exec(line)
//                 const y = regYplus.exec(line)
//                 if (x) {
//                     current.buttonA.x = Number(x[0].split('+')[1])
//                 }
//                 if (y) {
//                     current.buttonA.y = Number(y[0].split('+')[1])
//                 }
//             }
//             if (regButtonB.test(line)) {
//                 console.log('Button B')
//                 const x = regXplus.exec(line)
//                 const y = regYplus.exec(line)
//                 if (x) {
//                     current.buttonB.x = Number(x[0].split('+')[1])
//                 }
//                 if (y) {
//                     current.buttonB.y = Number(y[0].split('+')[1])
//                 }
//             }
//             if (regPrize.test(line)) {
//                 console.log('Prize')
//                 const regXeq = new RegExp(/X=\d+/g)
//                 const regYeq = new RegExp(/Y=\d+/g)
//                 const x = regXeq.exec(line)
//                 const y = regYeq.exec(line)
//                 if (x) {
//                     current.prize.x = Number(x[0].split('=')[1])
//                 }
//                 if (y) {
//                     current.prize.y = Number(y[0].split('=')[1])
//                 }
//             }
//         }
//         res.push(current)
//     }
//     return res
// }

// // console.log(lines[0])
// // console.log(/Button A/g.exec(lines[0]))
// // console.log(storeData(lines))

// function test(data: MachineData) {
//     const { buttonA, buttonB, prize } = data

//     const { x, y } = prize
//     let result: { a: 0; b: 0 } = { a: 0, b: 0 }
//     if (buttonA.x / 3 > buttonB.x) {
//         // try A
//         let numOfxInPrizeX = Math.floor(prize.x / buttonA.x)
//         // let i = Math.floor(8400 / ax)
//         let prizeX = prize.x
//         for (numOfxInPrizeX; numOfxInPrizeX > 0; ) {
//             let minus = prizeX - buttonA.x * numOfxInPrizeX
//             let testB = minus % buttonA.y
//             if (testB === 0) {
//                 console.log(`ax * ${i} + ${bx} * ${minus / bx}`)
//                 result.a = numOfxInPrizeX
//             }
//         }
//     } else {
//         // try b
//     }
// }
// // while (res === 0) {
// //     let x = (94 * i) % 22
// //     console.log(x)
// //     if (x === 0) {
// //         res = i
// //     }
// //     i++
// // }
// console.log(test())
