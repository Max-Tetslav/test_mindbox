import { TextField } from '@mui/material';
import { memo, useCallback, useState, type ChangeEvent } from 'react';

import { TODO_INPUT_PLACEHOLDER } from '@entities/todos';

type TextInputProps = {
    onAddTodo: (todoText: string) => void;
};

const TextInput = memo(({ onAddTodo }: TextInputProps) => {
    const [value, setValue] = useState<string>('');

    const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const noSpacesValue = value.trim();

        if (e.key === 'Enter' && noSpacesValue) {
            onAddTodo(noSpacesValue);
            setValue('');
        }
    };

    const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value), []);

    return (
        <TextField
            variant="outlined"
            label={TODO_INPUT_PLACEHOLDER}
            value={value}
            sx={{ mb: 2 }}
            onKeyDown={handleAddTodo}
            onChange={handleChangeInput}
            fullWidth
        />
    );
});

export default TextInput;
