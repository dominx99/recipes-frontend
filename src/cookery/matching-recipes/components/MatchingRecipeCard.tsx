import { Card, CardContent, Grid, List, ListItem, Typography } from "@mui/material";
import Measure from "../../measures/components/Measure";
import { RecipeComponent } from "../../recipe-components/domain/RecipeComponent";
import { Recipe } from "../domain/MatchingRecipe";

interface MatchingRecipeCardProps {
  recipe: Recipe;
}

export default function MatchingRecipeCard({ recipe }: MatchingRecipeCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {recipe.name}
        </Typography>
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
