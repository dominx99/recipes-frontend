import { darkTheme } from './shared/mui/themes';
import { ThemeProvider } from "@mui/system";
import { ThemeWrapper } from "./shared/components/ThemeWrapper";
import { Route, Routes } from "react-router-dom";
import HomePage from './cookery/shared/pages/HomePage';
import RequireNonAuthentication from './cookery/app/router/RequireNonAuthentication';
import RouteList from './cookery/app/router/RouteList';
import LoginPage from './cookery/authentication/pages/LoginPage';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ThemeWrapper>
        <Routes>
          <Route path={RouteList.HOME} element={
            <HomePage />
          }/>

          <Route path={RouteList.AUTHENTICATE} element={
            <RequireNonAuthentication redirectTo={RouteList.DASHBOARD}>
              <LoginPage />
            </RequireNonAuthentication>
          }/>
        </Routes>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

export default App;
