import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { EMPTY_TODO_GENERAL_LIST_TEXT, TODO_TYPES, type Todos } from '@entities/Todo/model/todos';
import { fakeCompletedTodo, fakeTodoList } from '@shared/lib/__mocks__/todo';

import TodoList from './TodoList';

const setupTest = (todos: Todos = fakeTodoList) => {
    const user = userEvent.setup();
    const fakeToggle = vi.fn();
    const fakeDelete = vi.fn();
    const fakeEdit = vi.fn();
    const { getByText, getAllByRole } = render(
        <TodoList
            totalTodos={todos.length}
            isEmptyList={todos.length === 0}
            currentListFilter={TODO_TYPES.ALL}
            todos={todos}
            onToggle={fakeToggle}
            onDelete={fakeDelete}
            onEdit={fakeEdit}
        />
    );

    return { getByText, getAllByRole, fakeToggle, user };
};

describe(TodoList, () => {
    it('Рендерит todos', () => {
        const { getByText } = setupTest();

        expect(getByText('Task 1')).toBeInTheDocument();
        expect(getByText('Task 2')).toBeInTheDocument();
        expect(getByText('Task 3')).toBeInTheDocument();
    });

    it('Рендерит пустой список', async () => {
        const { getByText } = setupTest([]);

        expect(getByText(EMPTY_TODO_GENERAL_LIST_TEXT)).toBeInTheDocument();
    });

    it('Выполненные todo имеют checked=true', () => {
        const { getAllByRole } = setupTest();

        const checkboxes = getAllByRole('checkbox');

        expect(checkboxes[0]).not.toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();
        expect(checkboxes[2]).toBeChecked();
    });

    it('Вызывает onToggle при клике на чекбокс', async () => {
        const { getByText, fakeToggle, user } = setupTest();

        const todoCheckbox = getByText(fakeCompletedTodo.text) as HTMLInputElement;
        await user.click(todoCheckbox);

        expect(fakeToggle).toHaveBeenCalledWith(1);
    });
});
