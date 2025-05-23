import { useMemo, useState } from 'react';
import { DEFAULT_TODO_TYPE, TODO_TYPES } from '../entities/todos';

import type { SyntheticEvent } from 'react';
import type { TodoList, TodoType } from '../entities/todos';

interface UseFilterTodosProps {
    todoList: TodoList;
}

interface UseFilterTodosResult {
    currentFilter: TodoType;
    filteredTodos: TodoList;
    handleFilterChange: (_: SyntheticEvent, value: TodoType) => void;
}

export const useFilterTodos = ({ todoList }: UseFilterTodosProps): UseFilterTodosResult => {
    const [currentFilter, setCurrentFilter] = useState<TodoType>(DEFAULT_TODO_TYPE);

    const filteredTodos = useMemo(
        () =>
            todoList.filter((todo) => {
                switch (currentFilter) {
                    case TODO_TYPES.ACTIVE: {
                        return !todo.completed;
                    }
                    case TODO_TYPES.COMPLETED: {
                        return todo.completed;
                    }
                    default: {
                        return true;
                    }
                }
            }),
        [todoList, currentFilter]
    );

    const handleFilterChange = (_: SyntheticEvent, value: TodoType): void => {
        setCurrentFilter(value);
    };

    return {
        filteredTodos,
        currentFilter,
        handleFilterChange
    };
};
