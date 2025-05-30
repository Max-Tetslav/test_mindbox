import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import type { Todos } from '@entities/todos';
import { fakeCompletedTodo, fakeTodoList } from '@utils/__mocks__/todo';

import TodoList from './';

const setupTest = (todos: Todos = fakeTodoList) => {
    const user = userEvent.setup();
    const fakeFn = vi.fn();
    const { getByText, getAllByRole } = render(<TodoList todos={todos} onToggle={fakeFn} />);

    return { getByText, getAllByRole, fakeFn, user };
};

describe(TodoList, () => {
    it('Отображает сообщение, если список пуст', () => {
        const { getByText } = setupTest([]);

        expect(getByText('This is fine!')).toBeInTheDocument();
    });

    it('Рендерит todos', () => {
        const { getByText } = setupTest();

        expect(getByText('Task 1')).toBeInTheDocument();
        expect(getByText('Task 2')).toBeInTheDocument();
        expect(getByText('Task 3')).toBeInTheDocument();
    });

    it('Выполненные todo имеют checked=true', () => {
        const { getAllByRole } = setupTest();

        const checkboxes = getAllByRole('checkbox');

        expect(checkboxes[0]).not.toBeChecked();
        expect(checkboxes[1]).not.toBeChecked();
        expect(checkboxes[2]).toBeChecked();
    });

    it('Вызывает onToggle при клике на чекбокс', async () => {
        const { getByText, fakeFn, user } = setupTest();

        const todoCheckbox = getByText(fakeCompletedTodo.text) as HTMLInputElement;
        await user.click(todoCheckbox);

        expect(fakeFn).toHaveBeenCalledWith(1);
    });
});
