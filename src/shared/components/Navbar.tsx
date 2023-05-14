import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, TextField, ThemeProvider } from '@mui/material';
import { deselectIngredient, selectAllIngredients, selectIngredient } from '../../cookery/ingredients/api/IngredientsSlice';
import { Ingredient } from '../../cookery/ingredients/domain/Ingredient';
import { BaseSyntheticEvent } from 'react';
import { toggleMenuSidebar, toggleSidebar } from '../../cookery/shared/slice/LayoutSlice';
import { useAppDispatch, useAppSelector } from '../../shared/app/hooks';
import { ShoppingCart } from '@mui/icons-material';
import { darkTheme } from '../mui/themes';

export default function Navbar() {
  const ingredients: Ingredient[] = useAppSelector(selectAllIngredients);
  const dispatch = useAppDispatch();

  const selectedIngredientsCount = useAppSelector(selectAllIngredients)
    .filter(ingredient => ingredient.selected)
    .length;

  const onIngredientsChange = (
    event: BaseSyntheticEvent,
    ingredients: Ingredient[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<Ingredient>
  ) => {
    if (reason.toString() === 'selectOption') {
      dispatch(selectIngredient(details?.option));
    }

    if (reason.toString() === 'removeOption') {
      dispatch(deselectIngredient(details?.option));
    }
  };

  const handleOpenSidebar = () => {
    dispatch(toggleSidebar());
  }

  const handleOpenMenuSidebar = () => {
    dispatch(toggleMenuSidebar());
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box>
            <IconButton onClick={handleOpenMenuSidebar} size="medium" color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Autocomplete
            multiple
            sx={{ width: 500 }}
            size="small"
            options={ingredients}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={onIngredientsChange}
            renderInput={(params) => (
              <ThemeProvider theme={darkTheme}>
                <TextField variant='outlined' {...params} label='Ingredients' />
              </ThemeProvider>
            )}
            renderOption={(props, option) => {
              return (
                // eslint-disable-next-line
                <li
                  {...props}
                  aria-selected={option.selected}
                >
                  {option.name}
                </li>
              )
            }}
            renderTags={() => (<></>)}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton size="medium" color="inherit" onClick={handleOpenSidebar}>
              <Badge badgeContent={selectedIngredientsCount} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

