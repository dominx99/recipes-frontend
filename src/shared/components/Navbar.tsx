import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../cookery/hooks';
import { selectAllIngredients } from '../../cookery/ingredients/api/IngredientsSlice';
import { Ingredient } from '../../cookery/ingredients/domain/Ingredient';
import { BaseSyntheticEvent } from 'react';
import { fetchMatchingMatchingRecipesByIngredientsAsync } from '../../cookery/matching-recipes/api/MatchingRecipesSlice';

export default function Navbar() {
  const ingredients: Ingredient[] = useAppSelector(selectAllIngredients);
  const dispatch = useAppDispatch();

  const onIngredientsChange = (event: BaseSyntheticEvent, ingredients: Ingredient[]) => {
    dispatch(fetchMatchingMatchingRecipesByIngredientsAsync(
      ingredients.map(ingredient => ingredient.name)
    ));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <Autocomplete
            multiple
            sx={{ width: 500 }}
            size="small"
            options={ingredients}
            getOptionLabel={(option) => option.name}
            limitTags={1}
            onChange={onIngredientsChange}
            renderInput={(params) => (
              <TextField variant='outlined' {...params} label='Ingredients' />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  label={option.name}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MenuIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

