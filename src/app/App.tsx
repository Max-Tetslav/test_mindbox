import TodoApp from '@components/TodoApp';

import { ThemeProvider } from './providers/theme';

const App = () => {
    return (
        <ThemeProvider>
            <TodoApp />
        </ThemeProvider>
    );
};

export default App;
