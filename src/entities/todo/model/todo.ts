export type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export type Todos = Todo[];

export const TODO_TYPES = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const;

export type TodoType = (typeof TODO_TYPES)[keyof typeof TODO_TYPES];

export const TODO_SYMBOLS_LIMIT = 40;
