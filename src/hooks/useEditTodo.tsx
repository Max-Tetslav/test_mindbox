import { useCallback, useState } from 'react';

import type { Todo } from '@entities/Todo/model/todos';

import { useInputLengthLimit } from './useLimitText';

type UseEditTodoParams = {
    todo: Todo;
    onEdit: (todoId: number, newText: string) => void;
};

type UseEditTodoResult = {
    isEditMode: boolean;
    isInputLimitReached: boolean;
    editedText: string;
    handleSave: VoidFunction;
    handleKeyDown: (e: React.KeyboardEvent) => void;
    handleTurnOnEditMode: VoidFunction;
    handleChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const useEditTodo = ({ todo, onEdit }: UseEditTodoParams): UseEditTodoResult => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(todo.text);

    const { isInputLimitReached } = useInputLengthLimit({ inputLength: editedText.length });

    const handleSave = () => {
        const isNewText = editedText !== todo.text;
        const canUpdateText = editedText && isNewText && !isInputLimitReached;

        if (canUpdateText) {
            onEdit(todo.id, editedText.trim());
        }
        setIsEditMode(false);
    };

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSave();
            } else if (e.key === 'Escape') {
                setEditedText(todo.text);
                setIsEditMode(false);
            }
        },
        [todo.text, handleSave]
    );

    const handleTurnOnEditMode = useCallback(() => {
        setIsEditMode(true);
    }, []);

    const handleChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedText(e.target.value);
    }, []);

    return {
        isEditMode,
        isInputLimitReached,
        editedText,
        handleSave,
        handleKeyDown,
        handleTurnOnEditMode,
        handleChangeText
    };
};
