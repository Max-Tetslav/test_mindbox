import { useState } from 'react';
import type { SyntheticEvent } from 'react';

import type { TodoType } from '@entities/todo';
import { TODO_TYPES } from '@entities/todo';

import { DEFAULT_TODO_TYPE } from './constants';

type UseFilterListResult = {
    currentFilter: TodoType;
    isActiveTodosTab: boolean;
    handleFilterChange: (_: SyntheticEvent, value: TodoType) => void;
};

export const useFilterList = (): UseFilterListResult => {
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
