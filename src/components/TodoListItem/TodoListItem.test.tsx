import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

vi.mock('@hooks/useEditTodo', () => ({
    useEditTodo: vi.fn()
}));

import { useEditTodo } from '@hooks/useEditTodo';
import { fakeCompletedTodo, fakeNewText } from '@shared/lib/__mocks__/todo';

import { TodoListItem } from '../TodoListItem';

const setupTest = (isEditMode = false) => {
    const user = userEvent.setup();

    const fakeToggle = vi.fn(() => vi.fn());
    const fakeDelete = vi.fn(() => vi.fn());
    const fakeEdit = vi.fn();
    const fakeTurnOnEditMode = vi.fn();

    const fakeTodo = fakeCompletedTodo;

    vi.mocked(useEditTodo).mockReturnValue({
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
        fakeTodo,
        user
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
        const { getByRole, fakeToggle, fakeTodo, user } = setupTest();

        await user.click(getByRole('checkbox'));

        expect(fakeToggle).toHaveBeenCalledWith(fakeTodo.id);
    });

    it('Вызывает onDelete при клике на кнопку удаления', async () => {
        const { getByLabelText, fakeDelete, fakeTodo, user } = setupTest();

        await user.click(getByLabelText('delete'));

        expect(fakeDelete).toHaveBeenCalledWith(fakeTodo.id);
    });

    it('Вызывает handleTurnOnEditMode при клике на кнопку редактирования', async () => {
        const { getByLabelText, fakeTurnOnEditMode, user } = setupTest();

        await user.click(getByLabelText('edit'));

        expect(fakeTurnOnEditMode).toHaveBeenCalled();
    });

    it('Показывает инпут с новым значением в режиме редактирования', () => {
        const { getByDisplayValue } = setupTest(true);

        expect(getByDisplayValue(fakeNewText)).toBeInTheDocument();
    });
});
