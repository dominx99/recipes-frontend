import { Chip, Drawer, Grid, List, ListItem, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deselectIngredient, ingredientSelectors, selectAllCategories, selectIngredient } from "../../ingredients/api/IngredientsSlice";
import { Ingredient } from "../../ingredients/domain/Ingredient";
import { fetchMatchingMatchingRecipesByIngredientsAsync } from "../../matching-recipes/api/MatchingRecipesSlice";

export default function Sidebar() {
  const categories = useAppSelector(selectAllCategories);
  const ingredients = useAppSelector(ingredientSelectors.selectEntities);
  const dispatch = useAppDispatch();
  const selectedIngredientNames = useAppSelector(ingredientSelectors.selectAll)
    .filter(ingredient => ingredient.selected)
    .map(ingredient => ingredient.name);

  useEffect(() => {
    dispatch(fetchMatchingMatchingRecipesByIngredientsAsync(selectedIngredientNames));
  }, [dispatch, selectedIngredientNames]);

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

  return (
    <Drawer
      variant="permanent"
      anchor={'right'}
      open={true}
    >
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
    </Drawer>
  )

}
