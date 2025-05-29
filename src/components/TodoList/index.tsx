import { memo } from 'react';
import { List, ListItem, ListItemText, Checkbox, FormControlLabel, Typography } from '@mui/material';

import type { Todos } from '@entities/todos';

type TodoListProps = {
    todos: Todos;
    onToggle: (id: number) => () => void;
};

const TodoList = memo(({ todos, onToggle }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <Typography variant="body1" align="center" color="text.secondary">
                List is empty
            </Typography>
        );
    }

    return (
        <List>
            {todos.map((todo) => (
                <ListItem key={todo.id} disablePadding>
                    <FormControlLabel
                        control={<Checkbox checked={todo.completed} onChange={onToggle(todo.id)} />}
                        label={
                            <ListItemText
                                primary={todo.text}
                                sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                            />
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
});

export default TodoList;
