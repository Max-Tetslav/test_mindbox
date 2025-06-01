import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { TODO_SYMBOLS_LIMIT } from '@entities/Todo/model/todos';
import { fakeCompletedTodo, fakeNewText } from '@shared/lib/__mocks__/todo';

import { useEditTodo } from '../useEditTodo';

const setupTest = () => {
    const fakeOnEdit = vi.fn();

    const { result } = renderHook(() => useEditTodo({ todo: fakeCompletedTodo, onEdit: fakeOnEdit }));

    return {
        result,
        fakeOnEdit
    };
};

describe(useEditTodo, () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('Успешно включает режим редактирования', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleTurnOnEditMode();
        });

        expect(result.current.isEditMode).toBe(true);
    });

    it('Успешно редактирует текст', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleChangeText({ target: { value: fakeNewText } } as React.ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.editedText).toBe(fakeNewText);
    });

    it('Сохраняет текст по клику на Enter', () => {
        const { result, fakeOnEdit } = setupTest();

        act(() => {
            result.current.handleChangeText({
                target: { value: fakeNewText }
            } as React.ChangeEvent<HTMLInputElement>);
        });

        act(() => {
            result.current.handleKeyDown({ key: 'Enter' } as React.KeyboardEvent);
        });

        expect(fakeOnEdit).toHaveBeenCalledWith(fakeCompletedTodo.id, fakeNewText);
        expect(result.current.isEditMode).toBe(false);
    });

    it('Не вызывает onEdit, если текст не изменился', () => {
        const { result, fakeOnEdit } = setupTest();

        act(() => {
            result.current.handleKeyDown({ key: 'Enter' } as React.KeyboardEvent);
        });

        expect(fakeOnEdit).not.toHaveBeenCalled();
        expect(result.current.isEditMode).toBe(false);
    });

    it('Отменяет редактирование при нажатии на Escape', () => {
        const { result } = setupTest();

        act(() => {
            result.current.handleChangeText({
                target: { value: fakeNewText }
            } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleKeyDown({ key: 'Escape' } as React.KeyboardEvent);
        });

        expect(result.current.editedText).toBe(fakeCompletedTodo.text);
        expect(result.current.isEditMode).toBe(false);
    });

    it('Не сохраняет текст, если превышен лимит символов', () => {
        const longText = '1'.repeat(TODO_SYMBOLS_LIMIT + 1);

        const { result, fakeOnEdit } = setupTest();

        act(() => {
            result.current.handleChangeText({ target: { value: longText } } as React.ChangeEvent<HTMLInputElement>);
            result.current.handleKeyDown({ key: 'Enter' } as React.KeyboardEvent);
        });

        expect(fakeOnEdit).not.toHaveBeenCalled();
        expect(result.current.isInputLimitReached).toBe(true);
    });
});
