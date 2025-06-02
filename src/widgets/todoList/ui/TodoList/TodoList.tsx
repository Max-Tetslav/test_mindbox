import { useAutoAnimate } from '@formkit/auto-animate/react';
import { List } from '@mui/material';
import { memo } from 'react';

import type { Todos, TodoType } from '@entities/todo';
import { TodoListItem } from '@entities/todo';

import { EmptyTodoList } from '../EmptyTodoList';

type TodoListProps = {
    todos: Todos;
    totalTodos: number;
    isEmptyList: boolean;
    currentListFilter: TodoType;
    onToggle: (todoId: number) => VoidFunction;
    onDelete: (todoId: number) => VoidFunction;
    onEdit: (todoId: number, newText: string) => void;
};

const TodoList = memo(
    ({ todos, totalTodos, isEmptyList, currentListFilter, onToggle, onDelete, onEdit }: TodoListProps) => {
        const [listElement] = useAutoAnimate();

        return (
            <List ref={listElement} className="list" disablePadding>
                {isEmptyList ? (
                    <EmptyTodoList
                        filteredTodoLength={todos.length}
                        generalTodoLength={totalTodos}
                        currentListFilter={currentListFilter}
                    />
                ) : (
                    <>
                        {todos.map((todo) => (
                            <TodoListItem
                                key={todo.id}
                                todo={todo}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                    </>
                )}
            </List>
        );
    }
);

export default TodoList;
