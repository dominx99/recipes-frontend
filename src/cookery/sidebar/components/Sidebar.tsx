import { ChevronRight } from "@mui/icons-material";
import { Chip, Grid, IconButton, List, ListItem, styled, SwipeableDrawer, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import { deselectIngredient, ingredientSelectors, selectAllCategories, selectIngredient } from "../../ingredients/api/IngredientsSlice";
import { Ingredient } from "../../ingredients/domain/Ingredient";
import { fetchMatchingMatchingRecipesByIngredientsAsync } from "../../matching-recipes/api/MatchingRecipesSlice";
import { isSidebarOpen, toggleSidebar } from "../../shared/slice/LayoutSlice";

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const ingredients = useAppSelector(ingredientSelectors.selectEntities);
  const allIngredients = useAppSelector(ingredientSelectors.selectAll);
  const isOpen = useAppSelector(isSidebarOpen);

  useEffect(() => {
    dispatch(fetchMatchingMatchingRecipesByIngredientsAsync({
      ingredients: allIngredients.filter(ingredient => ingredient.selected).map(ingredient => ingredient.name),
    }));
  }, [dispatch, allIngredients]);

  const ingredientClickedHandler = (ingredient?: Ingredient) => {
    if (ingredient === undefined) {
      return;
    }

    if (!ingredient.selected || ingredient.selected === undefined) {
      dispatch(selectIngredient(ingredient));
    } else {
      dispatch(deselectIngredient(ingredient));
    }
  };

  const handleDrawerClose = () => {
    dispatch(toggleSidebar());
  }

  return (
    <SwipeableDrawer
      anchor={'right'}
      open={isOpen}
      onClose={handleDrawerClose}
      onOpen={handleDrawerClose}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRight />
        </IconButton>
      </DrawerHeader>
      {categories.map((category) => (
        <List sx={{ width: 300 }} key={category.id}>
          <ListItem>
            <Grid container direction="column">
              <Grid item>
                <Typography
                  variant="h6"
                  component="h2"
                  mb={2}
                >{category.name}</Typography>
                <Grid container spacing={1}>
                  {category.ingredientIds.map((ingredientId: string) => (
                    <Grid item key={ingredientId}>
                      <Chip
                        onClick={() => ingredientClickedHandler(ingredients[ingredientId])}
                        label={ingredients[ingredientId]?.name}
                        {...(ingredients[ingredientId]?.selected ? { color: 'primary' } : {})}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      ))}
    </SwipeableDrawer>
  )
}
