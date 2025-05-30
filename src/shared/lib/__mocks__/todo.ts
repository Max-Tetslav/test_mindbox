import type { Todo, Todos } from '@entities/todos';

export const fakeIncompletedTodos: Todo[] = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: false }
];
export const fakeCompletedTodo: Todo = { id: 3, text: 'Task 3', completed: true };

export const fakeTodoList: Todos = [...fakeIncompletedTodos, fakeCompletedTodo];
