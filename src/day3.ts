import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const text = fs.readFileSync(path.join(__dirname, 'input/day3-input.txt'), 'utf-8');
const data1 = text.split(/\n/);
let index = 0;
const data2 = data1.reduce(
    (acc, items) => {
        if (acc[index].length === 3) {
            index += 1;
            acc.push([]);
        }

        acc[index].push(items);

        return acc;
    },
    [[]] as string[][],
);
const LOWER_CASE_OFFSET = 96;
const UPPER_CASE_OFFSET = 38;

const isInLowerCase = (char: string) => {
    return char.toLowerCase() === char;
};

const getItemPriority = (item: string) => {
    if (!item) {
        return 0;
    }

    const offset = isInLowerCase(item) ? LOWER_CASE_OFFSET : UPPER_CASE_OFFSET;

    return item.charCodeAt(0) - offset;
};

const getDividedItems = (items: string) => {
    const dividerIndex = items.length / 2;
    return [items.slice(0, dividerIndex), items.slice(dividerIndex)];
};

const getPrioritiesSum = (input: string[]) => {
    return input.reduce((acc, items) => {
        const [leftItems, rightItems] = getDividedItems(items);
        let item = '';

        for (let i = 0; i < leftItems.length; i++) {
            const leftItem = leftItems[i];
            const containsInRightItems = rightItems.includes(leftItem);

            if (containsInRightItems) {
                item = leftItem;
                break;
            }
        }

        return acc + getItemPriority(item);
    }, 0);
};

const getTriplePrioritiesSum = (input: string[][]) => {
    return input.reduce((acc, items) => {
        const [first, second, third] = items;
        let item = '';

        for (let i = 0; i < first.length; i++) {
            const currentItem = first[i];
            const containsInSecond = second.includes(currentItem);
            const containsInThird = third.includes(currentItem);

            if (containsInSecond && containsInThird) {
                item = currentItem;
                break;
            }
        }

        return acc + getItemPriority(item);
    }, 0);
};

console.log('Priorities sum:', getPrioritiesSum(data1));
console.log('Triple priorities sum:', getTriplePrioritiesSum(data2));
