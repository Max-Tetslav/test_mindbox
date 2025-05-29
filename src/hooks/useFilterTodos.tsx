import { useState } from 'react';
import type { SyntheticEvent } from 'react';

import type { TodoType } from '@entities/todos';
import { DEFAULT_TODO_TYPE } from '@entities/todos';

interface UseFilterTodosResult {
    currentFilter: TodoType;
    handleFilterChange: (_: SyntheticEvent, value: TodoType) => void;
}

export const useFilterTodos = (): UseFilterTodosResult => {
    const [currentFilter, setCurrentFilter] = useState<TodoType>(DEFAULT_TODO_TYPE);

    const handleFilterChange = (_: SyntheticEvent, value: TodoType): void => {
        setCurrentFilter(value);
    };

    return {
        currentFilter,
        handleFilterChange
    };
};
