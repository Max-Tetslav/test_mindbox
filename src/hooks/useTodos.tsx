import { useCallback, useMemo, useState } from 'react';
import { TODO_TYPES } from '../entities/todos';

import type { Todos, TodoType } from '@entities/todos';
import { createId } from '@utils/createId';

interface UseFilterTodosProps {
    currentFilter: TodoType;
}

interface UseFilterTodosResult {
    filteredTodos: Todos;
    isClearButtonDisabled: boolean;
    handleClearCompletedTodos: VoidFunction;
    handleCreateTodo: (todoText: string) => void;
    handleToggleTodo: (todoId: number) => () => void;
}

export const useTodos = ({ currentFilter }: UseFilterTodosProps): UseFilterTodosResult => {
    const [todos, setTodos] = useState<Todos>([]);

    const isClearButtonDisabled = !todos.some((item) => item.completed);
    const isCompletedFilterSelected = currentFilter === TODO_TYPES.COMPLETED;

    const handleCreateTodo = (todoText: string) => {
        setTodos((todos) => [...todos, { id: createId(), text: todoText, completed: isCompletedFilterSelected }]);
    };

    const handleToggleTodo = useCallback(
        (todoId: number) => () => {
            setTodos((todos) =>
                todos.map((todo) => {
                    if (todo.id === todoId) {
                        return { ...todo, completed: !todo.completed };
                    }

                    return todo;
                })
            );
        },
        []
    );

    const handleClearCompletedTodos = useCallback(() => {
        setTodos((todos) => todos.filter((todo) => !todo.completed));
    }, []);

    const filteredTodos = useMemo(
        () =>
            todos.filter((todo) => {
                switch (currentFilter) {
                    case TODO_TYPES.ACTIVE: {
                        return !todo.completed;
                    }
                    case TODO_TYPES.COMPLETED: {
                        return todo.completed;
                    }
                    default: {
                        return true;
                    }
                }
            }),
        [todos, currentFilter]
    );

    return {
        isClearButtonDisabled,
        filteredTodos,
        handleToggleTodo,
        handleClearCompletedTodos,
        handleCreateTodo
    };
};
