import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TODO_INPUT_ERROR_TEXT, TODO_INPUT_PLACEHOLDER, TODO_SYMBOLS_LIMIT } from '@entities/Todo/model/todos';
import { fakeCompletedTodo } from '@shared/lib/__mocks__/todo';

import { TextInput } from './TextInput';

const setupTest = () => {
    const user = userEvent.setup();
    const fakeFn = vi.fn();
    const { getByRole, getByLabelText } = render(<TextInput onAddTodo={fakeFn} />);

    return {
        getByRole,
        getByLabelText,
        fakeFn,
        user
    };
};

describe(TextInput, () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Рендерит инпут', () => {
        const { getByLabelText } = setupTest();

        expect(getByLabelText(TODO_INPUT_PLACEHOLDER)).toBeInTheDocument();
    });

    it('Вводит текст и вызывает onAddTodo при нажатии Enter', async () => {
        const { getByRole, fakeFn, user } = setupTest();

        const input = getByRole('textbox') as HTMLInputElement;
        await user.type(input, `${fakeCompletedTodo.text}{enter}`);

        expect(fakeFn).toHaveBeenCalledTimes(1);
        expect(fakeFn).toHaveBeenCalledWith(fakeCompletedTodo.text);
        expect(input.value).toBe('');
    });

    it('Не вызывает onAddTodo при нажатии Enter, если поле пустое', async () => {
        const { getByRole, fakeFn, user } = setupTest();

        const input = getByRole('textbox');
        await user.type(input, '{enter}');

        expect(fakeFn).not.toHaveBeenCalled();
    });

    it('Не вызывает onAddTodo, если введена строка только из пробелов', async () => {
        const { getByRole, fakeFn, user } = setupTest();

        const input = getByRole('textbox');
        await user.type(input, '     {enter}');

        expect(fakeFn).not.toHaveBeenCalled();
    });

    it('Отображает ошибку при превышении лимита символов', async () => {
        const { getByRole, getByLabelText, user } = setupTest();

        const input = getByRole('textbox');

        await user.type(input, '1'.repeat(TODO_SYMBOLS_LIMIT + 1));
        expect(getByLabelText(TODO_INPUT_ERROR_TEXT)).toBeInTheDocument();
    });
});
