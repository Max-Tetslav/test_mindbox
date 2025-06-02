import { Container, Typography, Box } from '@mui/material';

import { TODO_TYPES } from '@entities/todo/model/todo';
import { ClearButton } from '@features/clearCompleted';
import { FilterTabs, useFilterList } from '@features/filterTodoList';
import { TextInput, useManageTodoList } from '@features/manageTodo';
import { Divider } from '@shared/ui';
import { TodoList } from '@widgets/todoList';

export const TodoPage = () => {
    const { currentFilter, isActiveTodosTab, handleFilterChange } = useFilterList();
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
            <FilterTabs currentFilter={currentFilter} onFilterChange={handleFilterChange} />
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
