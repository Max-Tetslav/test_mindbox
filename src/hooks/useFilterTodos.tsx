import { useState } from 'react';
import type { SyntheticEvent } from 'react';

import type { TodoType } from '@entities/Todo/model/todos';
import { DEFAULT_TODO_TYPE, TODO_TYPES } from '@entities/Todo/model/todos';

type UseFilterTodosResult = {
    currentFilter: TodoType;
    isActiveTodosTab: boolean;
    handleFilterChange: (_: SyntheticEvent, value: TodoType) => void;
};

export const useFilterTodos = (): UseFilterTodosResult => {
    const [currentFilter, setCurrentFilter] = useState<TodoType>(DEFAULT_TODO_TYPE);

    const handleFilterChange = (_: SyntheticEvent, value: TodoType): void => {
        setCurrentFilter(value);
    };

    const isActiveTodosTab = currentFilter === TODO_TYPES.ACTIVE;

    return {
        currentFilter,
        isActiveTodosTab,
        handleFilterChange
    };
};
