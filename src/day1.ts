import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const text = fs.readFileSync(path.join(__dirname, 'input/day1-input.txt'), 'utf-8');
const data = text.split(/\n\n/);

const getCaloriesAmount = (calories: string) => {
    return calories.split(/\n/).reduce((acc, value) => acc + Number(value), 0);
};

const getMaximunCaloriesAmount = (input: string[]) => {
    return input.reduce((max, calories) => {
        let nextMax = max;
        const amount = getCaloriesAmount(calories);

        if (amount > nextMax) {
            nextMax = amount;
        }

        return nextMax;
    }, 0);
};

const getTop3MaximunCaloriesAmount = (input: string[]) => {
    const top3: number[] = [];
    input.forEach((calories) => {
        const amount = getCaloriesAmount(calories);
        top3.push(amount);

        if (top3.length > 3) {
            top3.sort((a, b) => b - a).pop();
        }
    });
    return top3.reduce((acc, top) => acc + top, 0);
};

console.log(
    'How many total calories carrying:',
    getMaximunCaloriesAmount(data),
    '\nHow many calories are top three Elves carrying in total:',
    getTop3MaximunCaloriesAmount(data),
);
