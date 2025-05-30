import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TODO_INPUT_PLACEHOLDER } from '@entities/todos';
import { fakeCompletedTodo } from '@utils/__mocks__/todo';

import TextInput from './TextInput';

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
});
