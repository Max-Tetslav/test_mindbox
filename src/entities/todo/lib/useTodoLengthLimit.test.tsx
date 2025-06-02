import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useTodoLengthLimit } from './useTodoLengthLimit';
import { TODO_SYMBOLS_LIMIT } from '../model/todo';

describe(useTodoLengthLimit, () => {
    it('Возвращает true если лимит превышен', () => {
        const { result } = renderHook(() => useTodoLengthLimit({ inputLength: TODO_SYMBOLS_LIMIT + 1 }));

        expect(result.current.isInputLimitReached).toBe(true);
    });

    it('Возвращает false если длинна строки равна лимиту', () => {
        const { result } = renderHook(() => useTodoLengthLimit({ inputLength: TODO_SYMBOLS_LIMIT }));

        expect(result.current.isInputLimitReached).toBe(false);
    });

    it('Возвращает false если лимит не превышен', () => {
        const { result } = renderHook(() => useTodoLengthLimit({ inputLength: TODO_SYMBOLS_LIMIT - 1 }));

        expect(result.current.isInputLimitReached).toBe(false);
    });
});
