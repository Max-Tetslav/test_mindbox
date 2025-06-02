import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { amber, orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import type { ReactNode } from 'react';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: orange[700]
        },
        secondary: {
            main: amber[300]
        },
        background: {
            default: 'transparent',
            paper: 'rgba(0, 0, 0, 0.5)'
        },
        text: {
            primary: amber[400],
            secondary: amber[300]
        }
    }
});

type ThemeProviderProps = {
    children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
