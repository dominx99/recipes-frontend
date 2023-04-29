import { Route, Routes } from "react-router-dom";
import HomePage from './cookery/shared/pages/HomePage';
import CookeryRouteList from './cookery/app/router/CookeryRouteList';
import RequireNonAuthentication from './security/app/middleware/RequireNonAuthentication';
import LoginPage from './security/authentication/pages/LoginPage';
import RegisterPage from './security/authentication/pages/RegisterPage';
import AuthenticationRouteList from './security/app/routes/AuthenticationRouteList';
import FavoriteRecipesPage from './cookery/favorite-recipes/pages/FavoriteRecipesPage';
import RequireAuthentication from './security/app/middleware/RequireAuthentication';
import { useAppDispatch } from "./shared/app/hooks";
import { setAuthenticationDetails } from "./security/authentication/api/AuthenticationSlice";
import MyRecipesPage from "./cookery/my-recipes/pages/MyRecipesPage";

function App() {
  let dispatch = useAppDispatch();
  let restoredDetails = localStorage.getItem('AUTHENTICATION_DETAILS');
  const parsedDetails = JSON.parse(restoredDetails ? restoredDetails : 'null');

  dispatch(setAuthenticationDetails(parsedDetails));

  return (
    <Routes>
      <Route path={CookeryRouteList.HOME} element={
        <HomePage />
      } />

      <Route path={CookeryRouteList.MY_RECIPES} element={
        <RequireAuthentication redirectTo={AuthenticationRouteList.AUTHENTICATE}>
          <MyRecipesPage />
        </RequireAuthentication>
      } />

      <Route path={CookeryRouteList.FAVROITE_RECIPES} element={
        <RequireAuthentication redirectTo={AuthenticationRouteList.AUTHENTICATE}>
          <FavoriteRecipesPage />
        </RequireAuthentication>
      } />

      <Route path={AuthenticationRouteList.AUTHENTICATE} element={
        <RequireNonAuthentication>
          <LoginPage />
        </RequireNonAuthentication>
      } />

      <Route path={AuthenticationRouteList.REGISTER} element={
        <RequireNonAuthentication>
          <RegisterPage />
        </RequireNonAuthentication>
      } />
    </Routes>
  )
}

export default App;
