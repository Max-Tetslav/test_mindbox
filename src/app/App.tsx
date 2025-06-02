import { TodoPage } from '@pages/index';

import { ThemeProvider } from './providers';

export const App = () => {
    return (
        <ThemeProvider>
            <TodoPage />
        </ThemeProvider>
    );
};
