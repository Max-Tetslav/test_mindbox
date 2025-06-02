import { Tab, Tabs } from '@mui/material';
import type { SyntheticEvent } from 'react';

import { TODO_TYPES, type TodoType } from '@entities/todo';

type FilterTabsProps = {
    currentFilter: TodoType;
    onFilterChange: (_: SyntheticEvent, value: TodoType) => void;
};

export const FilterTabs = ({ currentFilter, onFilterChange }: FilterTabsProps) => {
    return (
        <Tabs
            value={currentFilter}
            onChange={onFilterChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            centered
        >
            <Tab label="All" value={TODO_TYPES.ALL} />
            <Tab label="Active" value={TODO_TYPES.ACTIVE} />
            <Tab label="Completed" value={TODO_TYPES.COMPLETED} />
        </Tabs>
    );
};
