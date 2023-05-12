import { useEffect } from "react";
import { fetchAllCategoriesWithIngredientsAsync } from "../../../../cookery/ingredients/api/IngredientsSlice";
import MenuSidebar from "../../../../cookery/sidebar/components/MenuSidebar";
import Sidebar from "../../../../cookery/sidebar/components/Sidebar";
import { useAppDispatch, useAppSelector } from "../../../../shared/app/hooks";
import Navbar from "../../../../shared/components/Navbar";
import Theme from "../../../../shared/components/Theme";
import { fetchAllRequestedRecipesAsync, requestedRecipesHasNextPageSelector, requestedRecipesPageSelector, requestedRecipesSelectors, selectRequestedRecipesLoading } from "../api/PublishRecipeRequestsSlice";
import RequestedRecipesCards from "../components/RequestedRecipesCards";

export default function PublishRecipesRequestPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
    dispatch(fetchAllRequestedRecipesAsync(1));
  }, [dispatch]);

  const recipes = useAppSelector(requestedRecipesSelectors.selectAll);
  const loading = useAppSelector(selectRequestedRecipesLoading);
  const hasNextPage = useAppSelector(requestedRecipesHasNextPageSelector);
  const page = useAppSelector(requestedRecipesPageSelector);

  const loadMoreCallback = () => {
    if (loading || !hasNextPage) {
      return;
    }

    dispatch(fetchAllRequestedRecipesAsync(page + 1));
  }

  return (
    <Theme>
      <Navbar />
      <MenuSidebar />
      <Sidebar />
      <RequestedRecipesCards
        recipes={recipes}
        loadMoreCallback={loadMoreCallback}
        hasMore={hasNextPage}
        isLoading={loading}
      />
    </Theme>
  )
}
