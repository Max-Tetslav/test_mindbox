import { List, ListItem, ListItemText, Checkbox, FormControlLabel, Typography, Container } from '@mui/material';
import { memo } from 'react';

import type { Todos } from '@entities/todos';

type TodoListProps = {
    todos: Todos;
    onToggle: (todoId: number) => () => void;
};

const TodoList = memo(({ todos, onToggle }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <Container className="emptyList">
                <Typography variant="body1" align="center" color="text.secondary">
                    This is fine!
                </Typography>
            </Container>
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
                                sx={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: 'text.secondary'
                                }}
                            />
                        }
                    />
                </ListItem>
            ))}
        </List>
    );
});

export default TodoList;
