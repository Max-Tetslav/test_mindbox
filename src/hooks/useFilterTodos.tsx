import { useMemo, useState } from 'react';
import type { SyntheticEvent } from 'react';

import type { Todos, TodoType } from '@entities/todos';
import { DEFAULT_TODO_TYPE, TODO_TYPES } from '@entities/todos';

interface UseFilterTodosProps {
    todoList: Todos;
}

interface UseFilterTodosResult {
    currentFilter: TodoType;
    filteredTodos: Todos;
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
