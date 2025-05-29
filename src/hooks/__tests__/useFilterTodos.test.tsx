import { renderHook, act } from '@testing-library/react';
import type { SyntheticEvent } from 'react';

import { TODO_TYPES, DEFAULT_TODO_TYPE } from '@Entities/todos';

import { useFilterTodos } from '../useFilterTodos';
import { fakeCompletedTodo, fakeIncompletedTodos, fakeTodoList } from '../__mocks__/todo';

const setupTest = () => {
    const { result } = renderHook(() => useFilterTodos({ todoList: fakeTodoList }));

    return { result };
};

describe(useFilterTodos, () => {
    it('Возвращает все todo', () => {
        const { result } = setupTest();

        expect(result.current.currentFilter).toBe(DEFAULT_TODO_TYPE);
        expect(result.current.filteredTodos).toEqual(fakeTodoList);
    });

    it('Возвращает только активные todo', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleFilterChange({} as SyntheticEvent, TODO_TYPES.ACTIVE);
        });

        expect(result.current.currentFilter).toBe(TODO_TYPES.ACTIVE);
        expect(result.current.filteredTodos).toEqual(fakeIncompletedTodos);
    });

    it('Возвращает только завершённые todo', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleFilterChange({} as SyntheticEvent, TODO_TYPES.COMPLETED);
        });

        expect(result.current.currentFilter).toBe(TODO_TYPES.COMPLETED);
        expect(result.current.filteredTodos).toEqual([fakeCompletedTodo]);
    });
});
