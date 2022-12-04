import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();
const text = fs.readFileSync(path.join(__dirname, 'input/day2-input.txt'), 'utf-8');
const data = text.split(/\n/);

type ActionType = 'rock' | 'paper' | 'scissors';
type ResultType = 'lose' | 'win' | 'draw';

const mapOpponentAction: Record<string, ActionType> = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
};
const mapOwnAction: Record<string, ActionType> = {
    X: 'rock',
    Y: 'paper',
    Z: 'scissors',
};
const mapOwnResult: Record<string, ResultType> = {
    X: 'lose',
    Y: 'draw',
    Z: 'win',
};
const mapActionToScore: Record<ActionType, number> = {
    rock: 1,
    paper: 2,
    scissors: 3,
};

const getWeakerAction = (action: ActionType): ActionType => {
    switch (action) {
        case 'rock': {
            return 'scissors';
        }
        case 'paper': {
            return 'rock';
        }
        case 'scissors': {
            return 'paper';
        }
    }
};

const getStrongerAction = (action: ActionType): ActionType => {
    switch (action) {
        case 'rock': {
            return 'paper';
        }
        case 'paper': {
            return 'scissors';
        }
        case 'scissors': {
            return 'rock';
        }
    }
};

const getOwnAction = (opponentAction: ActionType, result: ResultType): ActionType => {
    switch (result) {
        case 'draw': {
            return opponentAction;
        }
        case 'lose': {
            return getWeakerAction(opponentAction);
        }
        case 'win': {
            return getStrongerAction(opponentAction);
        }
    }
};

const getRoundResult = (ownAction: ActionType, opponentAction: ActionType): ResultType => {
    if (ownAction === opponentAction) {
        return 'draw';
    }

    switch (ownAction) {
        case 'rock': {
            return opponentAction === 'paper' ? 'lose' : 'win';
        }
        case 'paper': {
            return opponentAction === 'scissors' ? 'lose' : 'win';
        }
        case 'scissors': {
            return opponentAction === 'rock' ? 'lose' : 'win';
        }
    }
};

const getRoundScore = (action: ActionType, result: ResultType) => {
    let score = mapActionToScore[action];

    switch (result) {
        case 'draw': {
            score += 3;
            break;
        }
        case 'win': {
            score += 6;
        }
    }

    return score;
};

const getTotalScoreStrategy1 = (input: string[]) => {
    return input.reduce((acc, round) => {
        const [opponent, own] = round.split(' ');
        const ownAction = mapOwnAction[own];
        const opponentAction = mapOpponentAction[opponent];
        const result = getRoundResult(ownAction, opponentAction);
        const score = getRoundScore(ownAction, result);

        return acc + score;
    }, 0);
};

const getTotalScoreStrategy2 = (input: string[]) => {
    return input.reduce((acc, round) => {
        const [opponent, own] = round.split(' ');
        const opponentAction = mapOpponentAction[opponent];
        const result = mapOwnResult[own];
        const ownAction = getOwnAction(opponentAction, result);
        const score = getRoundScore(ownAction, result);

        return acc + score;
    }, 0);
};

console.log(
    'Total score strategy 1:',
    getTotalScoreStrategy1(data),
    'Total score strategy 2:',
    getTotalScoreStrategy2(data),
);
