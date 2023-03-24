import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import { fetchAllFavoriteRecipesAsync } from "../../favorite-recipes/api/FavoriteRecipesSlice";
import { fetchAllCategoriesWithIngredientsAsync, fetchAllSelectedIngredientsFromSessionAsync } from "../../ingredients/api/IngredientsSlice";
import MatchingRecipeByIngredientsCards from "../../matching-recipes/components/MatchingRecipeByIngredientsCards";
import Sidebar from "../../sidebar/components/Sidebar";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllSelectedIngredientsFromSessionAsync());
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllFavoriteRecipesAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <MatchingRecipeByIngredientsCards />
    </>
  )
}
