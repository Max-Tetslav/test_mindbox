import { fakeCompletedTodo, fakeIncompletedTodos, fakeNewText, fakeTodoList } from './lib/mocks';
import { useTodoLengthLimit } from './lib/useTodoLengthLimit';
import { TODO_SYMBOLS_LIMIT, TODO_TYPES } from './model/todo';
import type { Todos, TodoType } from './model/todo';
import { TodoListItem } from './ui';

export type { Todos, TodoType };
export {
    useTodoLengthLimit,
    TODO_SYMBOLS_LIMIT,
    fakeCompletedTodo,
    fakeIncompletedTodos,
    fakeNewText,
    fakeTodoList,
    TODO_TYPES,
    TodoListItem
};
