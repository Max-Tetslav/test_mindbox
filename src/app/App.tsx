import { TodoPage } from '@pages/TodoPage';

import { ThemeProvider } from './providers/theme';

export const App = () => {
    return (
        <ThemeProvider>
            <TodoPage />
        </ThemeProvider>
    );
};
