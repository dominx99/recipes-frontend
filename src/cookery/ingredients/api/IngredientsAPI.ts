import { Ingredient } from '../domain/Ingredient';
import axios from './../../app/axios';

export function fetchAllIngredients() {
  return new Promise<{ data: Ingredient[] }>(async (resolve) => {
    const res = await axios().get('api/v1/main-products')

    resolve(res);
  });
}

export function fetchAllSelectedIngredientsFromSession() {
  return new Promise<{ data: string[] }>(async (resolve) => {
    const res = await axios().get('/api/v1/saved/products')

    resolve(res);
  });
}
