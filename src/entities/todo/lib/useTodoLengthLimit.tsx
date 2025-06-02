import { TODO_SYMBOLS_LIMIT } from '../model/todo';

type UseTodoLengthLimitProps = {
    inputLength: number;
};

type UseTodoLengthLimitResult = {
    isInputLimitReached: boolean;
};

export const useTodoLengthLimit = ({ inputLength }: UseTodoLengthLimitProps): UseTodoLengthLimitResult => {
    return {
        isInputLimitReached: inputLength > TODO_SYMBOLS_LIMIT
    };
};
