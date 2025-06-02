import DeleteIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ListItem, ListItemText, Checkbox, FormControlLabel, IconButton, TextField } from '@mui/material';
import { memo } from 'react';

import type { Todo } from '../model/todo';
import { useEditTodo } from '../model/useEditTodo';

type TodoItemProps = {
    todo: Todo;
    onToggle: (todoId: number) => VoidFunction;
    onDelete: (todoId: number) => VoidFunction;
    onEdit: (todoId: number, newText: string) => void;
};

export const TodoListItem = memo(({ todo, onToggle, onDelete, onEdit }: TodoItemProps) => {
    const {
        isEditMode,
        isInputLimitReached,
        editedText,
        handleSave,
        handleTurnOnEditMode,
        handleChangeText,
        handleKeyDown
    } = useEditTodo({
        todo,
        onEdit
    });

    return (
        <ListItem
            className="todoItem"
            disablePadding
            secondaryAction={
                <>
                    <IconButton
                        edge="end"
                        aria-label="edit"
                        color="secondary"
                        onClick={handleTurnOnEditMode}
                        size="small"
                        disabled={isEditMode}
                    >
                        <EditIcon fontSize="small" /> {/* Реализовать <ActionIcon.Delete /> */}
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        color="error"
                        onClick={onDelete(todo.id)}
                        size="small"
                        disabled={isEditMode}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </>
            }
        >
            <FormControlLabel
                control={<Checkbox checked={todo.completed} onChange={onToggle(todo.id)} />}
                label={
                    isEditMode ? (
                        <TextField
                            value={editedText}
                            error={isInputLimitReached}
                            onChange={handleChangeText}
                            onKeyDown={handleKeyDown}
                            onBlur={handleSave}
                            size="small"
                            autoFocus
                            variant="standard"
                            sx={{ mb: '-4px', width: '300px' }}
                        />
                    ) : (
                        <ListItemText
                            primary={todo.text}
                            sx={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: 'text.secondary'
                            }}
                        />
                    )
                }
            />
        </ListItem>
    );
});
