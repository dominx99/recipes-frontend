import { FavoriteBorder } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, Typography } from "@mui/material";
import { useAppDispatch } from "../../../shared/app/hooks";
import { addRecipeToFavoriteAsync } from "../../favorite-recipes/api/FavoriteRecipesSlice";
import Measure from "../../measures/components/Measure";
import { RecipeComponent } from "../../recipe-components/domain/RecipeComponent";
import { Recipe } from "../domain/MatchingRecipe";

interface MatchingRecipeCardProps {
  recipe: Recipe;
}

export default function MatchingRecipeCard({ recipe }: MatchingRecipeCardProps) {
  const dispatch = useAppDispatch();

  const handleAddToFavorites = (recipe: Recipe) => () => {
    dispatch(addRecipeToFavoriteAsync(recipe));
  }

  return (
    <Card>
      <CardHeader
        sx={{ paddingBottom: 0 }}
        title={
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.name}
          </Typography>
        }
        action={
          <IconButton
            onClick={handleAddToFavorites(recipe)}
          >
            <FavoriteBorder
              color="error"
            />
          </IconButton>
        }
      />
      <CardContent
        sx={{ paddingTop: 0 }}
      >
        <List>
          {recipe.components.map((component: RecipeComponent) => (
            <ListItem key={component.id} disableGutters>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <Typography>
                    {component.ingredient.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography textAlign={'right'}>
                    <Measure measure={component.measure} />
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
