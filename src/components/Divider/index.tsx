import { memo } from 'react';
import { Divider as MuiDivider } from '@mui/material';

const Divider = memo(() => {
    return <MuiDivider sx={{ my: 2 }} />;
});

export default Divider;
