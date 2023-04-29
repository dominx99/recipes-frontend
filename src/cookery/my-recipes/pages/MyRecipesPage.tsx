import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import Sidebar from "../../sidebar/components/Sidebar";
import { fetchAllMyRecipesAsync, myRecipesSelectors } from "../api/MyRecipesSlice";
import MyRecipeCards from "../components/MyRecipeCards";

export default function FavoriteRecipesPage() {
  const dispatch = useAppDispatch();

  const recipes = useAppSelector(myRecipesSelectors.selectAll)

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllMyRecipesAsync());
  }, [dispatch]);

  return (
    <Theme>
      <Navbar />
      <Sidebar />
      <MyRecipeCards
        recipes={recipes}
        loadMoreCallback={() => {}}
        hasMore={true}
        isLoading={false}
      />
    </Theme>
  )
}
