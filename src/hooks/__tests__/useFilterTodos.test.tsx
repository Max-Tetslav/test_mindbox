import { renderHook, act } from '@testing-library/react';
import type { SyntheticEvent } from 'react';

import { TODO_TYPES, DEFAULT_TODO_TYPE } from '@entities/Todo/model/todos';

import { useFilterTodos } from '../useFilterTodos';

const setupTest = () => {
    const { result } = renderHook(() => useFilterTodos());

    return { result };
};

describe(useFilterTodos, () => {
    it('Возвращает значение по умолчанию', () => {
        const { result } = setupTest();

        expect(result.current.currentFilter).toBe(DEFAULT_TODO_TYPE);
    });

    it('Меняет фильтр при вызове handleFilterChange', () => {
        const { result } = setupTest();

        const fakeEvent = {} as SyntheticEvent;

        act(() => {
            result.current.handleFilterChange(fakeEvent, TODO_TYPES.ACTIVE);
        });

        expect(result.current.currentFilter).toBe(TODO_TYPES.ACTIVE);

        act(() => {
            result.current.handleFilterChange(fakeEvent, TODO_TYPES.COMPLETED);
        });

        expect(result.current.currentFilter).toBe(TODO_TYPES.COMPLETED);

        act(() => {
            result.current.handleFilterChange(fakeEvent, TODO_TYPES.ALL);
        });

        expect(result.current.currentFilter).toBe(TODO_TYPES.ALL);
    });
});
