import { Button } from '@mui/material';
import { memo } from 'react';

type ClearButtonProps = {
    isDisabled: boolean;
    onClick: VoidFunction;
};

const ClearButton = memo(({ isDisabled, onClick }: ClearButtonProps) => {
    return (
        <Button onClick={onClick} disabled={isDisabled} color="error" variant="outlined">
            Clear completed
        </Button>
    );
});

export default ClearButton;
