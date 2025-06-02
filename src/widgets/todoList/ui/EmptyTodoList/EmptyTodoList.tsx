import { Typography, Container } from '@mui/material';
import { memo } from 'react';

import { TODO_TYPES, type TodoType } from '@entities/todo';

import {
    EMPTY_TODO_COMPETED_LIST_TEXT,
    EMPTY_TODO_ACTIVE_LIST_TEXT,
    EMPTY_TODO_GENERAL_LIST_TEXT
} from '../../model/constants';

type EmptyTodoListProps = {
    generalTodoLength: number;
    filteredTodoLength: number;
    currentListFilter: TodoType;
};

export const EmptyTodoList = memo(
    ({ generalTodoLength, filteredTodoLength, currentListFilter }: EmptyTodoListProps) => {
        const renderText = () => {
            if (generalTodoLength !== 0) {
                const isEmptyFilteredList = filteredTodoLength === 0;
                const isActiveTab = currentListFilter === TODO_TYPES.ACTIVE;
                const isCompletedTab = currentListFilter === TODO_TYPES.COMPLETED;

                if (isCompletedTab && isEmptyFilteredList) {
                    return EMPTY_TODO_COMPETED_LIST_TEXT;
                }

                if (isActiveTab && isEmptyFilteredList) {
                    return EMPTY_TODO_ACTIVE_LIST_TEXT;
                }
            }

            return EMPTY_TODO_GENERAL_LIST_TEXT;
        };

        return (
            <Container className="emptyList">
                <Typography variant="body1" align="center" color="text.secondary">
                    {renderText()}
                </Typography>
            </Container>
        );
    }
);
