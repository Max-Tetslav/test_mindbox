import { useAutoAnimate } from '@formkit/auto-animate/react';
import { List } from '@mui/material';
import { memo } from 'react';

import { EmptyTodoList } from '@components/EmptyTodoList';
import { TodoListItem } from '@components/TodoListItem';
import type { Todos, TodoType } from '@entities/Todo/model/todos';

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
