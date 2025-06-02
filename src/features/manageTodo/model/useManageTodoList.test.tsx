import { renderHook, act } from '@testing-library/react';

import { TODO_TYPES, type TodoType } from '@entities/todo';
import { fakeNewText, fakeTodoList } from '@entities/todo';

import { useManageTodoList } from './useManageTodoList';

let fakeId = 0;
vi.mock('@shared/lib', () => ({
    createId: vi.fn(() => ++fakeId)
}));

const setupTest = (filter: TodoType = TODO_TYPES.ALL) => {
    const { result } = renderHook(() => useManageTodoList({ currentFilter: filter }));

    return { result };
};

describe(useManageTodoList, () => {
    beforeEach(() => {
        fakeId = 0;
    });

    it('hasCompletedTodos=false при пустом массиве', () => {
        const { result } = setupTest();

        expect(result.current.filteredTodos).toEqual([]);
        expect(result.current.hasCompletedTodos).toBe(false);
    });

    it('Создаёт задачу', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        expect(result.current.filteredTodos).toHaveLength(1);
        expect(result.current.filteredTodos[0]).toEqual(fakeTodoList[0]);
    });

    it('Новая задача создаётся с completed=true при выбранном фильтре completed', () => {
        const { result } = setupTest(TODO_TYPES.COMPLETED);

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        expect(result.current.filteredTodos).toHaveLength(1);
        expect(result.current.filteredTodos[0].completed).toBe(true);
    });

    it('Изменяет значение completed', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        act(() => {
            result.current.handleToggleTodo(fakeId)(); // чекаем задачу
        });

        expect(result.current.filteredTodos[0].completed).toBe(true);
    });

    it('Удаляет todo из списка по id', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        act(() => {
            result.current.handleDeleteTodo(fakeId)();
        });

        expect(result.current.generalTodoListLength).toBe(0);
    });

    it('Изменяет текст todo из списка по id', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        act(() => {
            result.current.handleEditTodo(fakeId, fakeNewText);
        });

        expect(result.current.filteredTodos[0].text).toBe(fakeNewText);
    });

    it('Не изменяет текст todo если передать другой id', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        act(() => {
            result.current.handleEditTodo(999, fakeNewText);
        });

        expect(result.current.filteredTodos[0].text).not.toBe(fakeNewText);
    });

    it('Удаляет выполненные задачи при вызове handleClearCompletedTodos', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        act(() => {
            result.current.handleToggleTodo(fakeId)(); // чекаем задачу
        });

        act(() => {
            result.current.handleClearCompletedTodos();
        });

        expect(result.current.filteredTodos).toHaveLength(0);
    });

    it('hasCompletedTodos === false, если нет выполненных задач', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        expect(result.current.hasCompletedTodos).toBe(false);
    });

    it('hasCompletedTodos === true, если есть выполненные задачи', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        act(() => {
            result.current.handleToggleTodo(fakeId)(); // чекаем задачу
        });

        expect(result.current.hasCompletedTodos).toBe(true);
    });

    it('В массиве только активные задачи при фильтре active', () => {
        const { result } = setupTest(TODO_TYPES.ACTIVE);

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
            result.current.handleCreateTodo(fakeTodoList[1].text);
        });

        act(() => {
            result.current.handleToggleTodo(fakeId)(); // чекаем первую задачу
        });

        expect(result.current.filteredTodos).toHaveLength(1);
        expect(result.current.filteredTodos[0].completed).toBe(false);
    });

    it('В массиве только выполненные задачи при фильтре completed', () => {
        const { result } = setupTest(TODO_TYPES.COMPLETED);

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[0].text);
        });

        act(() => {
            result.current.handleCreateTodo(fakeTodoList[1].text);
        });

        act(() => {
            result.current.handleToggleTodo(fakeId)(); // чекаем первую задачу
        });

        expect(result.current.filteredTodos).toHaveLength(1);
        expect(result.current.filteredTodos[0].completed).toBe(true);
    });
});
