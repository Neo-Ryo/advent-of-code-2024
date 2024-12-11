#!/bin/bash

day_number=$1
if test -d "./${day_number}";  
    then echo "Directory /${day_number} exists."
else
    mkdir $day_number

    touch ./${day_number}/input.txt
    touch ./${day_number}/test.txt
    touch ./${day_number}/partOne.ts
    touch ./${day_number}/partTwo.ts


    echo "import { readFile } from '../utils/index'" > ./${day_number}/partOne.ts
    echo "const lines = readFile(__dirname, 'input.txt').split('\n')" >> ./${day_number}/partOne.ts

    echo "import { readFile } from '../utils/index'" > ./${day_number}/partTwo.ts
    echo "const lines = readFile(__dirname, 'input.txt').split('\n')" >> ./${day_number}/partTwo.ts
fi
