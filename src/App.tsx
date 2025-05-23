import React, { useCallback, useState } from 'react';
import { Container, Typography, TextField, Button, Stack, Divider, Tabs, Tab, Box } from '@mui/material';
import { TODO_INPUT_PLACEHOLDER, TODO_TYPES } from './entities/todos';
import type { TodoList as TodoListType } from './entities/todos';
import { useFilterTodos } from './hooks/useFilterTodos';
import TodoList from './TodoList';

const App: React.FC = () => {
    const [todos, setTodos] = useState<TodoListType>([]);
    const [input, setInput] = useState<string>('');

    const { currentFilter, filteredTodos, handleFilterChange } = useFilterTodos({ todoList: todos });

    const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input) {
            setTodos((todos) => [
                ...todos,
                { id: Date.now(), text: input, completed: currentFilter === TODO_TYPES.COMPLETED }
            ]);
            setInput('');
        }
    };

    const toggleTodo = useCallback(
        (id: number) => () => {
            setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
        },
        []
    );

    const clearCompletedTodos = useCallback(() => {
        setTodos((todos) => todos.filter((todo) => !todo.completed));
    }, []);

    const itemsCountText = `${filteredTodos.length} items ${currentFilter !== TODO_TYPES.ALL ? currentFilter : 'left'}`;

    return (
        <Container
            maxWidth="sm"
            disableGutters
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                py: 4,
                px: 2,
                height: '100vh'
            }}
        >
            {' '}
            <Typography variant="h1" align="center" gutterBottom color="#e0e0e0">
                todos
            </Typography>
            <TextField
                fullWidth
                label={TODO_INPUT_PLACEHOLDER}
                value={input}
                onChange={(e) => setInput(e.target.value.trim())}
                onKeyDown={addTodo}
                variant="outlined"
                sx={{ mb: 2 }}
            />
            <Container maxWidth="lg">
                <Tabs
                    value={currentFilter}
                    onChange={handleFilterChange}
                    textColor="primary"
                    indicatorColor="primary"
                    centered
                >
                    <Tab label="All" value={TODO_TYPES.ALL} />
                    <Tab label="Active" value={TODO_TYPES.ACTIVE} />
                    <Tab label="Completed" value={TODO_TYPES.COMPLETED} />
                </Tabs>
            </Container>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography color="text.secondary">{itemsCountText}</Typography>
                <Button
                    onClick={clearCompletedTodos}
                    disabled={!todos.some((item) => item.completed)}
                    color="error"
                    variant="outlined"
                >
                    Clear completed
                </Button>
            </Stack>
        </Container>
    );
};

export default App;
