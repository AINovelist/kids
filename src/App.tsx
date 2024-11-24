import { HomePage } from './components/HomePage';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});
function App() {
  return (
    <MantineProvider theme={theme}>
      <HomePage />
    </MantineProvider>
  );
}

export default App;
