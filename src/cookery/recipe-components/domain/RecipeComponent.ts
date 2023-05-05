import { Ingredient } from "../../ingredients/domain/Ingredient";
import { Measure } from "../../measures/domain/Measure";

export interface RecipeComponent {
  id: string,
  ingredient: Ingredient,
  measure: Measure | null,
}
