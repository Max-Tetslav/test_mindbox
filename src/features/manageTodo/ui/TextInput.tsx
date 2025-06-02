import { TextField } from '@mui/material';
import { memo, useCallback, useState, type ChangeEvent } from 'react';

import { useTodoLengthLimit } from '@entities/todo';

import { TODO_INPUT_ERROR_TEXT, TODO_INPUT_PLACEHOLDER } from '../model/constants';

type TextInputProps = {
    onAddTodo: (todoText: string) => void;
};

export const TextInput = memo(({ onAddTodo }: TextInputProps) => {
    const [value, setValue] = useState<string>('');

    const { isInputLimitReached } = useTodoLengthLimit({ inputLength: value.length });

    const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const noSpacesValue = value.trim();
        const canAddNewTodo = e.key === 'Enter' && noSpacesValue && !isInputLimitReached;

        if (canAddNewTodo) {
            onAddTodo(noSpacesValue);
            setValue('');
        }
    };

    const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

    const inputLabelText = isInputLimitReached ? TODO_INPUT_ERROR_TEXT : TODO_INPUT_PLACEHOLDER;

    return (
        <TextField
            variant="outlined"
            label={inputLabelText}
            value={value}
            sx={{ mb: 2 }}
            onKeyDown={handleAddTodo}
            onChange={handleChangeInput}
            error={isInputLimitReached}
        />
    );
});
