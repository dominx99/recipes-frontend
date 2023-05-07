import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import Theme from "../../../shared/components/Theme";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import AddRecipeFloatingButton from "../../recipes/components/AddRecipeFloatingButton";
import MenuSidebar from "../../sidebar/components/MenuSidebar";
import Sidebar from "../../sidebar/components/Sidebar";
import { fetchAllMyRecipesAsync, myRecipesCurrentPageSelector, myRecipesHasNextPageSelector, myRecipesLoadingSelector, myRecipesSelectors } from "../api/MyRecipesSlice";
import MyRecipeCards from "../components/MyRecipeCards";

export default function FavoriteRecipesPage() {
  const dispatch = useAppDispatch();

  const recipes = useAppSelector(myRecipesSelectors.selectAll)
  const hasNextPage = useAppSelector(myRecipesHasNextPageSelector);
  const loading = useAppSelector(myRecipesLoadingSelector);
  const page = useAppSelector(myRecipesCurrentPageSelector);

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllMyRecipesAsync(1));
  }, [dispatch]);

  const loadMoreCallback = useCallback(() => {
    if (loading || !hasNextPage) {
      return;
    }

    dispatch(fetchAllMyRecipesAsync(page + 1));
  }, [dispatch, loading, page, hasNextPage]);


  return (
    <Theme>
      <Navbar />
      <Sidebar />
      <MenuSidebar />
      <MyRecipeCards
        recipes={recipes}
        loadMoreCallback={loadMoreCallback}
        hasMore={hasNextPage}
        isLoading={loading}
      />
      <AddRecipeFloatingButton />
    </Theme>
  )
}
