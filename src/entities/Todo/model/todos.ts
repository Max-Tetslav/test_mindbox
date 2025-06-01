export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export type Todos = Todo[];

export const TODO_TYPES = {
    ALL: 'all',
    ACTIVE: 'active',
    COMPLETED: 'completed'
} as const;

export const DEFAULT_TODO_TYPE = TODO_TYPES.ALL;

export type TodoType = (typeof TODO_TYPES)[keyof typeof TODO_TYPES];

export const TODO_INPUT_PLACEHOLDER = 'What needs to be done?';
export const TODO_INPUT_ERROR_TEXT = 'Maximum 40 symbols';
export const TODO_SYMBOLS_LIMIT = 40;
export const EMPTY_TODO_GENERAL_LIST_TEXT = 'Add your first todo!';
export const EMPTY_TODO_ACTIVE_LIST_TEXT = 'This is fine!';
export const EMPTY_TODO_COMPETED_LIST_TEXT = 'Complete your first todo!';
