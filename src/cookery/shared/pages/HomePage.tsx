import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import { fetchAllFavoriteRecipesAsync } from "../../favorite-recipes/api/FavoriteRecipesSlice";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import MatchingRecipeCards from "../../matching-recipes/components/MatchingRecipeCards";
import Sidebar from "../../sidebar/components/Sidebar";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllFavoriteRecipesAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <MatchingRecipeCards />
    </>
  )
}
