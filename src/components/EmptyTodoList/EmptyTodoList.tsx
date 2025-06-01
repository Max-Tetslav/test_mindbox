import { Typography, Container } from '@mui/material';
import { memo } from 'react';

import { TODO_TYPES, type TodoType } from '@entities/Todo/model/todos';

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
                    return 'Complete your first todo!';
                }

                if (isActiveTab && isEmptyFilteredList) {
                    return 'This is fine!';
                }
            }

            return 'Add your first todo!';
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
