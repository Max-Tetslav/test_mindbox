import { TODO_SYMBOLS_LIMIT } from '@entities/Todo/model/todos';

type UseInputLengthLimitProps = {
    inputLength: number;
};

type UseInputLengthLimitResult = {
    isInputLimitReached: boolean;
};

export const useInputLengthLimit = ({ inputLength }: UseInputLengthLimitProps): UseInputLengthLimitResult => {
    return {
        isInputLimitReached: inputLength > TODO_SYMBOLS_LIMIT
    };
};
