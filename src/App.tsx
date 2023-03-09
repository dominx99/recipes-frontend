import { darkTheme } from './shared/mui/themes';
import { ThemeProvider } from "@mui/system";
import { ThemeWrapper } from "./shared/components/ThemeWrapper";
import { Route, Routes } from "react-router-dom";
import HomePage from './cookery/shared/pages/HomePage';
import CookeryRouteList from './cookery/app/router/CookeryRouteList';
import RequireNonAuthentication from './security/app/middleware/RequireNonAuthentication';
import LoginPage from './security/authentication/pages/LoginPage';
import RegisterPage from './security/authentication/pages/RegisterPage';
import AuthenticationRouteList from './security/app/routes/AuthenticationRouteList';
import FavoriteRecipesPage from './cookery/favorite-recipes/pages/FavoriteRecipesPage';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ThemeWrapper>
        <Routes>
          <Route path={CookeryRouteList.HOME} element={
            <HomePage />
          } />

          <Route path={CookeryRouteList.FAVROITE_RECIPES} element={
            <FavoriteRecipesPage />
          } />

          <Route path={AuthenticationRouteList.AUTHENTICATE} element={
            <RequireNonAuthentication redirectTo={CookeryRouteList.DASHBOARD}>
              <LoginPage />
            </RequireNonAuthentication>
          } />

          <Route path={AuthenticationRouteList.REGISTER} element={
            <RequireNonAuthentication redirectTo={CookeryRouteList.DASHBOARD}>
              <RegisterPage />
            </RequireNonAuthentication>
          } />
        </Routes>
      </ThemeWrapper>
    </ThemeProvider>
  )
}

export default App;
