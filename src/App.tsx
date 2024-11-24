import { HomePage } from './components/HomePage';
import { createTheme, DirectionProvider, MantineProvider } from '@mantine/core';

const theme = createTheme({
  fontFamily: 'Vazirmatn, sans-serif',
  headings: {
    fontFamily: 'Vazirmatn, sans-serif',
  },
});
function App() {
  return (
    <DirectionProvider>
    <MantineProvider theme={theme}>
      <HomePage />
    </MantineProvider>
    </DirectionProvider>
  );
}

export default App;
