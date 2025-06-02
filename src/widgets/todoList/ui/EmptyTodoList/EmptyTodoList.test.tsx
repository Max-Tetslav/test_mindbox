import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { TODO_TYPES } from '@entities/todo';

import { EmptyTodoList } from './EmptyTodoList';

describe(EmptyTodoList, () => {
    it('Отображает текст при пустом общем списке', () => {
        render(<EmptyTodoList generalTodoLength={0} filteredTodoLength={0} currentListFilter={TODO_TYPES.ALL} />);

        expect(screen.getByText('Add your first todo!')).toBeInTheDocument();
    });

    it('Отображает текст при пустом списке на вкладке completed', () => {
        render(<EmptyTodoList generalTodoLength={5} filteredTodoLength={0} currentListFilter={TODO_TYPES.COMPLETED} />);

        expect(screen.getByText('Complete your first todo!')).toBeInTheDocument();
    });

    it('Отображает текст при пустом списке на вкладке active', () => {
        render(<EmptyTodoList generalTodoLength={5} filteredTodoLength={0} currentListFilter={TODO_TYPES.ACTIVE} />);

        expect(screen.getByText('This is fine!')).toBeInTheDocument();
    });
});
