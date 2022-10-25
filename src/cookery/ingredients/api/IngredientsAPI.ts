import { Ingredient } from '../domain/Ingredient';
import axios from './../../axios';

export function fetchAllIngredients() {
  return new Promise<{ data: Ingredient[] }>(async (resolve) => {
    const res = await axios().get('api/v1/ingredients')

    resolve(res);
  });
}
