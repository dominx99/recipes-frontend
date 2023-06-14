import { Brightness4, Brightness7, ChevronLeft, FavoriteRounded, Logout, Publish, Receipt, Search } from "@mui/icons-material";
import { Badge, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, SwipeableDrawer } from "@mui/material";
import { useMemo } from "react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import BackofficeRouteList from "../../../backoffice/router/BackofficeRouteList";
import AuthenticationRouteList from "../../../security/app/routes/AuthenticationRouteList";
import { authenticationDetails, setAuthenticationDetails } from "../../../security/authentication/api/AuthenticationSlice";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import CookeryRouteList from "../../app/router/CookeryRouteList";
import { favoriteRecipesSelectors } from "../../favorite-recipes/api/FavoriteRecipesSlice";
import { getMode, isMenuSidebarOpen, toggleMenuSidebar, toggleMode } from "../../shared/slice/LayoutSlice";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function MenuSidebar() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(isMenuSidebarOpen);
  const details = useAppSelector(authenticationDetails);
  const navigate = useNavigate();
  const mode = useAppSelector(getMode);

  const handleDrawerClose = () => {
    dispatch(toggleMenuSidebar());
  }

  const favoriteRecipes = useAppSelector(favoriteRecipesSelectors.selectAll)

  const favoriteRecipesCount: number = useMemo(() => {
    return favoriteRecipes.length
  }, [favoriteRecipes])

  const isAuthenticated = () => {
    return details !== null;
  }

  const isBackofficeUser = () => {
    return details?.roles.includes('ROLE_BACKOFFICE');
  }

  const handleLogout = () => {
    dispatch(toggleMenuSidebar());

    localStorage.removeItem('AUTHENTICATION_DETAILS');
    dispatch(setAuthenticationDetails(null));

    navigate(AuthenticationRouteList.AUTHENTICATE);
  }

  const handleChangeMode = () => {
    dispatch(toggleMenuSidebar());
    dispatch(toggleMode());
  }

  return (
    <SwipeableDrawer
      anchor={'left'}
      open={isOpen}
      onClose={handleDrawerClose}
      onOpen={handleDrawerClose}
    >
      <Box width={300}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouteLink} to={CookeryRouteList.HOME} color="inherit" onClick={() => dispatch(toggleMenuSidebar())}>
              <ListItemIcon><Search /></ListItemIcon>
              <ListItemText primary="Search recipes" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouteLink} to={CookeryRouteList.FAVROITE_RECIPES} color="inherit" onClick={() => dispatch(toggleMenuSidebar())}>
              <ListItemIcon>
                <Badge badgeContent={favoriteRecipesCount} color="error">
                  <FavoriteRounded />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Favorite recipes" />
            </ListItemButton>
          </ListItem>

          {isAuthenticated() && (
            <ListItem disablePadding>
              <ListItemButton component={RouteLink} to={CookeryRouteList.MY_RECIPES} color="inherit" onClick={() => dispatch(toggleMenuSidebar())}>
                <ListItemIcon><Receipt /></ListItemIcon>
                <ListItemText primary="My recipes" />
              </ListItemButton>
            </ListItem>
          )}

          {isAuthenticated() && isBackofficeUser() && (
            <ListItem disablePadding>
              <ListItemButton component={RouteLink} to={BackofficeRouteList.PUBLISH_RECIPES_REQUESTS} color="inherit" onClick={() => dispatch(toggleMenuSidebar())}>
                <ListItemIcon><Publish /></ListItemIcon>
                <ListItemText primary="Publish requests" />
              </ListItemButton>
            </ListItem>
          )}

          {!isAuthenticated() && (
            <ListItem disablePadding>
              <ListItemButton component={RouteLink} to={AuthenticationRouteList.AUTHENTICATE} color="inherit" onClick={() => dispatch(toggleMenuSidebar())}>
                <ListItemIcon><Publish /></ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemButton color="inherit" onClick={handleChangeMode}>
              <ListItemIcon>{mode === 'light' ? <Brightness4 /> : <Brightness7 />}</ListItemIcon>
              <ListItemText primary={(mode === 'light' ? 'Dark' : 'Light') + ' mode'}/>
            </ListItemButton>
          </ListItem>

          {isAuthenticated() && (
            <ListItem disablePadding>
              <ListItemButton color="inherit" onClick={handleLogout}>
                <ListItemIcon><Logout /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </SwipeableDrawer>
  )
}
