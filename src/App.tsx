import React, { useCallback, useState } from 'react';
import { Container, Typography, Stack, Tabs, Tab, Box } from '@mui/material';
import { TODO_TYPES } from '@Entities/todos';
import type { TodoList as TodoListType } from '@Entities/todos';
import { useFilterTodos } from '@Hooks/useFilterTodos';
import ClearButton from '@Components/ClearButton';
import TodoList from '@Components/TodoList';
import Divider from '@Components/Divider';
import TextInput from '@Components/TextInput';
import { createId } from './utils/createId';

const App: React.FC = () => {
    const [todos, setTodos] = useState<TodoListType>([]);
    const { currentFilter, filteredTodos, handleFilterChange } = useFilterTodos({ todoList: todos });

    const handleToggleTodo = useCallback(
        (id: number) => () => {
            setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
        },
        []
    );

    const clearCompletedTodos = useCallback(() => {
        setTodos((todos) => todos.filter((todo) => !todo.completed));
    }, []);

    const itemsCountText = `${filteredTodos.length} items ${currentFilter !== TODO_TYPES.ALL ? currentFilter : 'left'}`;

    const isClearButtonVisible = currentFilter !== TODO_TYPES.ACTIVE;
    const isClearButtonDisabled = !todos.some((item) => item.completed);

    const isCompletedFilterSelected = currentFilter === TODO_TYPES.COMPLETED;

    const handleCreateTodo = (todoText: string) => {
        setTodos((todos) => [...todos, { id: createId(), text: todoText, completed: isCompletedFilterSelected }]);
    };

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
            <TextInput onAddTodo={handleCreateTodo} />
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
            <Divider />
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                <TodoList todos={filteredTodos} onToggle={handleToggleTodo} />
            </Box>
            <Divider />
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography color="text.secondary">{itemsCountText}</Typography>
                {isClearButtonVisible && (
                    <ClearButton isDisabled={isClearButtonDisabled} onClick={clearCompletedTodos} />
                )}
            </Stack>
        </Container>
    );
};

export default App;
