import { ThemeProvider, createTheme } from '@mui/material';
import MainPage from './views/MainPage'

const theme = createTheme({
  typography: {
    fontFamily: "arara",
    fontSize: 16,
  },
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <MainPage />
    </ThemeProvider>
  )
  
}

export default App
