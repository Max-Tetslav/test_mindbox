import { render, fireEvent } from '@testing-library/react';
import ClearButton from './';

const setupTest = (isDisabled: boolean = false) => {
    const fakeFn = vi.fn();
    const { getByRole } = render(<ClearButton isDisabled={isDisabled} onClick={fakeFn} />);

    return {
        getByRole,
        fakeFn
    };
};

describe(ClearButton, () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Рендерит кнопку', () => {
        const { getByRole } = setupTest();

        expect(getByRole('button')).toBeInTheDocument();
    });

    it('Кнопка неактивна если isDisabled=true', () => {
        const { getByRole } = setupTest(true);

        expect(getByRole('button')).toBeDisabled();
    });

    it('вызывает onClick', () => {
        const { getByRole, fakeFn } = setupTest();

        fireEvent.click(getByRole('button'));

        expect(fakeFn).toHaveBeenCalledTimes(1);
    });

    it('не вызывает onClick, если кнопка disabled', () => {
        const { getByRole, fakeFn } = setupTest(true);

        fireEvent.click(getByRole('button'));

        expect(fakeFn).not.toHaveBeenCalled();
    });
});
