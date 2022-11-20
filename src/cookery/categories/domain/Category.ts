import { Ingredient } from "../../ingredients/domain/Ingredient";

export interface Category {
  id: string;
  name: string;
  ingredientIds: string[];
}
