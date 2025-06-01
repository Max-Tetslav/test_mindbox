import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { useEditTodo } from '@hooks/useEditTodo';
import { fakeCompletedTodo, fakeNewText } from '@shared/lib/__mocks__/todo';

import { TodoListItem } from '../TodoListItem';

vi.mock('@hooks/useEditTodo', async () => {
    return {
        useEditTodo: vi.fn()
    };
});

const setupTest = (isEditMode = false) => {
    const fakeToggle = vi.fn(() => vi.fn());
    const fakeDelete = vi.fn(() => vi.fn());
    const fakeEdit = vi.fn();
    const fakeTurnOnEditMode = vi.fn();

    const fakeTodo = fakeCompletedTodo;

    (useEditTodo as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
        isEditMode,
        isInputLimitReached: false,
        editedText: fakeNewText,
        handleSave: vi.fn(),
        handleTurnOnEditMode: fakeTurnOnEditMode,
        handleChangeText: vi.fn(),
        handleKeyDown: vi.fn()
    });

    const { getByText, getByLabelText, getByRole, getByDisplayValue } = render(
        <TodoListItem todo={fakeTodo} onToggle={fakeToggle} onDelete={fakeDelete} onEdit={fakeEdit} />
    );

    return {
        getByText,
        getByLabelText,
        getByRole,
        getByDisplayValue,
        fakeToggle,
        fakeEdit,
        fakeDelete,
        fakeTurnOnEditMode,
        fakeTodo
    };
};

describe(TodoListItem, () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Отображает текст задачи', () => {
        const { getByText } = setupTest();

        expect(getByText(fakeCompletedTodo.text)).toBeInTheDocument();
    });

    it('Вызывает onToggle при клике на чекбокс', async () => {
        const { getByRole, fakeToggle, fakeTodo } = setupTest();

        await userEvent.click(getByRole('checkbox'));

        expect(fakeToggle).toHaveBeenCalledWith(fakeTodo.id);
    });

    it('Вызывает onDelete при клике на кнопку удаления', async () => {
        const { getByLabelText, fakeDelete, fakeTodo } = setupTest();

        await userEvent.click(getByLabelText('delete'));

        expect(fakeDelete).toHaveBeenCalledWith(fakeTodo.id);
    });

    it('Вызывает handleTurnOnEditMode при клике на кнопку редактирования', async () => {
        const { getByLabelText, fakeTurnOnEditMode } = setupTest();

        await userEvent.click(getByLabelText('edit'));

        expect(fakeTurnOnEditMode).toHaveBeenCalled();
    });

    it('Показывает инпут с новым значением в режиме редактирования', () => {
        const { getByDisplayValue } = setupTest(true);

        expect(getByDisplayValue(fakeNewText)).toBeInTheDocument();
    });
});
