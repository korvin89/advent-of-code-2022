import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const text = fs.readFileSync(path.join(__dirname, 'input/day5-input.txt'), 'utf-8');
const data = text.split(/\n/);

class Crane {
    private store: Record<number, string[]>;

    constructor(args: {store: Record<string, string[]>}) {
        const {store} = args;
        this.store = store;
    }

    move(instruction: string, reverse = false) {
        const [amount, from, to] = instruction.split(' ').map(Number).filter(Boolean);
        const movedCrates: string[] = [];
        let leftToMove = amount;

        while (leftToMove > 0) {
            const crate = this.store[from].pop();
            crate && movedCrates.push(crate);
            leftToMove -= 1;
        }

        if (reverse) {
            movedCrates.reverse();
        }

        this.store[to].push(...movedCrates);
    }

    composeWord() {
        return Object.values(this.store).reduce((acc, crates) => {
            return acc + crates[crates.length - 1];
        }, '');
    }
}

const startState: string[] = [];
const instructions: string[] = [];
let stateComplited = false;

for (let i = 0; i < data.length; i++) {
    const line = data[i];

    if (line === '' && !stateComplited) {
        stateComplited = true;
    }

    if (stateComplited) {
        line && instructions.push(line);
    } else {
        line && startState.push(line);
    }
}

const indexiesLine = startState.pop() || '';
const store: Record<string, {index: number; stack: string[]}> = {};

for (let i = 0; i < indexiesLine.length; i++) {
    const char = indexiesLine[i].trim();

    if (char) {
        store[char] = {index: i, stack: []};
    }
}

for (let i = startState.length - 1; i >= 0; i--) {
    const line = startState[i];
    Object.keys(store).forEach((key) => {
        const value = line[store[key].index]?.trim();

        if (value) {
            store[key].stack.push(value);
        }
    });
}

const initialStore = Object.entries(store).reduce((acc, [key, {stack}]) => {
    acc[key] = stack;
    return acc;
}, {} as Record<string, string[]>);

const crane = new Crane({store: initialStore});

instructions.forEach((instruction) => {
    // use true as the second argument to solve part 2 issue
    crane.move(instruction);
});

console.log(crane.composeWord());
