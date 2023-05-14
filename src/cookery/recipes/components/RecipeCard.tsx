import { Card, CardContent, CardHeader, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Recipe } from "../../matching-recipes/domain/MatchingRecipe";
import Measure from "../../measures/components/Measure";
import { RecipeComponent } from "../../recipe-components/domain/RecipeComponent";
import TruncatedText from "../../shared/components/TruncatedText";

interface RecipeCardProps {
  recipe: Recipe;
  action: ReactElement<any, any>;
  footer?: ReactElement<any, any>;
}

export default function RecipeCard({ recipe, action, footer }: RecipeCardProps) {
  return (
    <Card>
      <CardHeader
        sx={{ paddingBottom: 0 }}
        title={
          <Typography gutterBottom variant="h5" component="h2">
            {recipe.name}
          </Typography>
        }
        action={action}
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
        <Divider sx={{ marginBottom: 2, marginTop: 1 }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold' }} mb={1}>Instructions:</Typography>
        {recipe.instructions && (
          <Typography><TruncatedText length={150}>{recipe.instructions}</TruncatedText></Typography>
        )}
      </CardContent>
      {
        footer &&
        <CardContent>{footer}</CardContent>
      }
    </Card>
  );
}
