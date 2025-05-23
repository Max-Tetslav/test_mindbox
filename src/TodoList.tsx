import { memo } from 'react';
import { List, ListItem, ListItemText, Checkbox, FormControlLabel, Typography } from '@mui/material';
import type { TodoList as TodoListType } from './entities/todos';

type TodoListProps = {
    todos: TodoListType;
    toggleTodo: (id: number) => () => void;
};

const TodoList = memo(({ todos, toggleTodo }: TodoListProps) => {
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
                        control={<Checkbox checked={todo.completed} onChange={toggleTodo(todo.id)} />}
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
