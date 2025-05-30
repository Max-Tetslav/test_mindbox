import { Divider as MuiDivider } from '@mui/material';
import { memo } from 'react';

const Divider = memo(() => {
    return <MuiDivider sx={{ my: 2 }} />;
});

export default Divider;
