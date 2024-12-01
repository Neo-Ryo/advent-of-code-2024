import fs from 'fs'
import path from 'path'

export function readFile(dirName: string, filePath: string){
    return fs.readFileSync(path.join(dirName, filePath)).toString()
}

