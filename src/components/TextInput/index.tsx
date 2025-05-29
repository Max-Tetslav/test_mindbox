import { memo, useCallback, useState, type ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { TODO_INPUT_PLACEHOLDER } from '@Entities/todos';

type TextInputProps = {
    onAddTodo: (todoText: string) => void;
};

const TextInput = memo(({ onAddTodo }: TextInputProps) => {
    const [value, setValue] = useState<string>('');

    const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value) {
            onAddTodo(value);
            setValue('');
        }
    };

    const handleChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value.trim()), []);

    return (
        <TextField
            fullWidth
            label={TODO_INPUT_PLACEHOLDER}
            value={value}
            variant="outlined"
            sx={{ mb: 2 }}
            onKeyDown={handleAddTodo}
            onChange={handleChangeInput}
        />
    );
});

export default TextInput;
