import { darkTheme } from './shared/mui/themes';
import { ThemeProvider } from "@mui/system";
import { ThemeWrapper } from "./shared/components/ThemeWrapper";
import MainPage from "./cookery/MainPage";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ThemeWrapper>
        <MainPage />
      </ThemeWrapper>
    </ThemeProvider>
  )
}

export default App;
