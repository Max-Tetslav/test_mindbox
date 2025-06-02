import { Divider as MuiDivider } from '@mui/material';
import { memo } from 'react';

export const Divider = memo(() => {
    return <MuiDivider sx={{ my: 2 }} />;
});
