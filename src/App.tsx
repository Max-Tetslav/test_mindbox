import { Container, Typography, Stack, Tabs, Tab, Box } from '@mui/material';

import ClearButton from '@components/ClearButton';
import TodoList from '@components/TodoList';
import Divider from '@components/Divider';
import TextInput from '@components/TextInput';
import { TODO_TYPES } from '@entities/todos';
import { useFilterTodos } from '@hooks/useFilterTodos';
import { useTodos } from '@hooks/useTodos';

const App = () => {
    const { currentFilter, handleFilterChange } = useFilterTodos();
    const { filteredTodos, isClearButtonDisabled, handleCreateTodo, handleToggleTodo, handleClearCompletedTodos } =
        useTodos({ currentFilter });

    const itemsCountText = `${filteredTodos.length} items ${currentFilter !== TODO_TYPES.ALL ? currentFilter : 'left'}`;

    const isClearButtonVisible = currentFilter !== TODO_TYPES.ACTIVE;

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
                    <ClearButton isDisabled={isClearButtonDisabled} onClick={handleClearCompletedTodos} />
                )}
            </Stack>
        </Container>
    );
};

export default App;
