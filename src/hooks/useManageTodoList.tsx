import { useCallback, useMemo, useState } from 'react';

import type { Todos, TodoType } from '@entities/Todo/model/todos';
import { TODO_TYPES } from '@entities/Todo/model/todos';
import { createId } from '@shared/lib/createId';

type UseTodosProps = {
    currentFilter: TodoType;
};

type UseTodosResult = {
    filteredTodos: Todos;
    isCurrentListEmpty: boolean;
    hasCompletedTodos: boolean;
    generalTodoListLength: number;
    filteredTodoListLength: number;
    handleClearCompletedTodos: VoidFunction;
    handleCreateTodo: (todoText: string) => void;
    handleToggleTodo: (todoId: number) => VoidFunction;
    handleDeleteTodo: (todoId: number) => VoidFunction;
    handleEditTodo: (todoId: number, newText: string) => void;
};

export const useManageTodoList = ({ currentFilter }: UseTodosProps): UseTodosResult => {
    const [todos, setTodos] = useState<Todos>([]);

    const generalTodoListLength = todos.length;
    const hasCompletedTodos = todos.some((item) => item.completed);

    const handleDeleteTodo = useCallback(
        (todoId: number) => () => {
            setTodos((todos) => todos.filter((todo) => todo.id !== todoId));
        },
        []
    );

    const handleEditTodo = useCallback((todoId: number, newText: string) => {
        setTodos((todos) =>
            todos.map((todo) => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        text: newText
                    };
                }

                return todo;
            })
        );
    }, []);

    const handleCreateTodo = useCallback(
        (todoText: string) => {
            const isCompletedFilterSelected = currentFilter === TODO_TYPES.COMPLETED;

            setTodos((todos) => [...todos, { id: createId(), text: todoText, completed: isCompletedFilterSelected }]);
        },
        [currentFilter]
    );

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

    const filteredTodoListLength = filteredTodos.length;
    const isCurrentListEmpty = filteredTodos.length === 0;

    return {
        filteredTodos,
        filteredTodoListLength,
        generalTodoListLength,
        isCurrentListEmpty,
        hasCompletedTodos,
        handleToggleTodo,
        handleClearCompletedTodos,
        handleCreateTodo,
        handleDeleteTodo,
        handleEditTodo
    };
};
