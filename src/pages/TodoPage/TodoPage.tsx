import { Container, Typography, Tabs, Tab, Box } from '@mui/material';

import { ClearButton } from '@components/ClearButton';
import { TextInput } from '@components/TextInput';
import { TodoList } from '@components/TodoList';
import { TODO_TYPES } from '@entities/Todo/model/todos';
import { useFilterTodos } from '@hooks/useFilterTodos';
import { useManageTodoList } from '@hooks/useManageTodoList';
import { Divider } from '@shared/ui/Divider';

export const TodoPage = () => {
    const { currentFilter, isActiveTodosTab, handleFilterChange } = useFilterTodos();
    const {
        filteredTodos,
        generalTodoListLength,
        isCurrentListEmpty,
        hasCompletedTodos,
        handleCreateTodo,
        handleToggleTodo,
        handleClearCompletedTodos,
        handleDeleteTodo,
        handleEditTodo
    } = useManageTodoList({ currentFilter });

    const todosCountText = `${filteredTodos.length} items ${
        currentFilter !== TODO_TYPES.ALL ? currentFilter : 'to fine'
    }`;

    return (
        <Container className="appContainer" maxWidth="sm" disableGutters>
            <Typography variant="h1" align="center" gutterBottom color="primary">
                todos
            </Typography>
            <TextInput onAddTodo={handleCreateTodo} />
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
            <Divider />
            <Box className="listContainer">
                <TodoList
                    todos={filteredTodos}
                    totalTodos={generalTodoListLength}
                    currentListFilter={currentFilter}
                    isEmptyList={isCurrentListEmpty}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                    onEdit={handleEditTodo}
                />
            </Box>
            <Divider />
            <Box className="statusContainer">
                {/* Вынести компонент в TodoListStatus */}
                <Typography color="text.secondary">{todosCountText}</Typography>{' '}
                {!isActiveTodosTab && (
                    <ClearButton isDisabled={!hasCompletedTodos} onClick={handleClearCompletedTodos} />
                )}
            </Box>
        </Container>
    );
};
