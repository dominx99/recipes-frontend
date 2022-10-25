import Navbar from "./shared/components/Navbar";
import { darkTheme } from './shared/mui/themes';
import { ThemeProvider } from "@mui/system";
import { ThemeWrapper } from "./shared/components/ThemeWrapper";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ThemeWrapper>
        <Navbar />
      </ThemeWrapper>
    </ThemeProvider>
  )
}

export default App;
