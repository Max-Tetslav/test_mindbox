import { Container, Typography, Tabs, Tab, Box } from '@mui/material';

import ClearButton from '@components/ClearButton';
import TodoList from '@components/TodoList';
import Divider from '@components/Divider';
import TextInput from '@components/TextInput';
import { TODO_TYPES } from '@entities/todos';
import { useFilterTodos } from '@hooks/useFilterTodos';
import { useTodos } from '@hooks/useTodos';

const TodoApp = () => {
    const { currentFilter, handleFilterChange } = useFilterTodos();
    const { filteredTodos, isClearButtonDisabled, handleCreateTodo, handleToggleTodo, handleClearCompletedTodos } =
        useTodos({ currentFilter });

    const itemsCountText = `${filteredTodos.length} items ${
        currentFilter !== TODO_TYPES.ALL ? currentFilter : 'to fine'
    }`;

    const isClearButtonVisible = currentFilter !== TODO_TYPES.ACTIVE;

    return (
        <Container className="appContainer" maxWidth="sm" disableGutters>
            <Typography variant="h1" align="center" gutterBottom color="primary">
                todos
            </Typography>
            <TextInput onAddTodo={handleCreateTodo} />
            <Container maxWidth={false}>
                <Tabs
                    value={currentFilter}
                    onChange={handleFilterChange}
                    variant="fullWidth"
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
            <Box className="listContainer">
                <TodoList todos={filteredTodos} onToggle={handleToggleTodo} />
            </Box>
            <Divider />
            <Box className="statusContainer">
                <Typography color="text.secondary">{itemsCountText}</Typography>
                {isClearButtonVisible && (
                    <ClearButton isDisabled={isClearButtonDisabled} onClick={handleClearCompletedTodos} />
                )}
            </Box>
        </Container>
    );
};

export default TodoApp;
