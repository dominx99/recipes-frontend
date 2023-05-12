import { ChevronLeft, FavoriteRounded, Publish, Receipt, Search } from "@mui/icons-material";
import { Badge, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, SwipeableDrawer } from "@mui/material";
import { useMemo } from "react";
import { Link as RouteLink } from "react-router-dom";
import BackofficeRouteList from "../../../backoffice/router/BackofficeRouteList";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import CookeryRouteList from "../../app/router/CookeryRouteList";
import { favoriteRecipesSelectors } from "../../favorite-recipes/api/FavoriteRecipesSlice";
import { isMenuSidebarOpen, toggleMenuSidebar } from "../../shared/slice/LayoutSlice";

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

  const handleDrawerClose = () => {
    dispatch(toggleMenuSidebar());
  }

  const favoriteRecipes = useAppSelector(favoriteRecipesSelectors.selectAll)

  const favoriteRecipesCount: number = useMemo(() => {
    return favoriteRecipes.length
  }, [favoriteRecipes])

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

          <ListItem disablePadding>
            <ListItemButton component={RouteLink} to={CookeryRouteList.MY_RECIPES} color="inherit" onClick={() => dispatch(toggleMenuSidebar())}>
              <ListItemIcon><Receipt /></ListItemIcon>
              <ListItemText primary="My recipes" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={RouteLink} to={BackofficeRouteList.PUBLISH_RECIPES_REQUESTS} color="inherit" onClick={() => dispatch(toggleMenuSidebar())}>
              <ListItemIcon><Publish /></ListItemIcon>
              <ListItemText primary="Publish requests" />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
    </SwipeableDrawer>
  )
}
