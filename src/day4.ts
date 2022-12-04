import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const text = fs.readFileSync(path.join(__dirname, 'input/day4-input.txt'), 'utf-8');
const data = text.split(/\n/);

const getRangeMinMax = (range: string) => range.split('-').map(Number);

// ▒▒▒▒▒▒▒▒
//  ▒▒▒▒▒▒
const isOneRangeFullyContainsOther = (min1: number, max1: number, min2: number, max2: number) => {
    return (min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1);
};

const isOneRangeOverlapsOther = (min1: number, max1: number, min2: number, max2: number) => {
    return (
        // ▒▒▒▒▒▒
        //    ▒▒▒▒▒▒
        (min1 <= min2 && min2 <= max1 && max1 <= max2) ||
        //    ▒▒▒▒▒▒
        // ▒▒▒▒▒▒
        (min1 >= min2 && max2 >= min1 && max1 >= max2)
    );
};

const getOneRangeFullyContaisOtherCount = (input: string[]) => {
    return input.reduce((count, chunk) => {
        let nextCount = count;
        const [[min1, max1], [min2, max2]] = chunk.split(',').map(getRangeMinMax);

        if (isOneRangeFullyContainsOther(min1, max1, min2, max2)) {
            nextCount += 1;
        }

        return nextCount;
    }, 0);
};

const getRangesOverlapCount = (input: string[]) => {
    return input.reduce((count, chunk) => {
        let nextCount = count;
        const [[min1, max1], [min2, max2]] = chunk.split(',').map(getRangeMinMax);

        if (
            isOneRangeFullyContainsOther(min1, max1, min2, max2) ||
            isOneRangeOverlapsOther(min1, max1, min2, max2)
        ) {
            nextCount += 1;
        }

        return nextCount;
    }, 0);
};

console.log(
    'In how many assignment pairs does one range fully contain the other:',
    getOneRangeFullyContaisOtherCount(data),
    '\nIn how many assignment pairs do the ranges overlap:',
    getRangesOverlapCount(data),
);
