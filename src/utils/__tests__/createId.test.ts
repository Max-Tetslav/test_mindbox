import { describe, it, expect, vi } from 'vitest';

import { createId } from '../createId';

describe(createId, () => {
    it('Возвращает текущее время в миллисекундах', () => {
        const fakeNow = 999;
        vi.useFakeTimers();
        vi.setSystemTime(fakeNow);

        const id = createId();

        expect(id).toBe(fakeNow);

        vi.useRealTimers();
    });

    it('Возвращает число', () => {
        const id = createId();
        expect(typeof id).toBe('number');
    });
});
