import { TodoPage } from '@pages/todoPage';

import { ThemeProvider } from './providers';

export const App = () => {
    return (
        <ThemeProvider>
            <TodoPage />
        </ThemeProvider>
    );
};
