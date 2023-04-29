import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import Sidebar from "../../sidebar/components/Sidebar";
import MyRecipeCards from "../components/MyRecipeCards";

export default function FavoriteRecipesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
  }, [dispatch]);

  return (
    <Theme>
      <Navbar />
      <Sidebar />
      <MyRecipeCards
        recipes={[]}
        loadMoreCallback={() => {}}
        hasMore={false}
        isLoading={false}
      />
    </Theme>
  )
}
