import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import MatchingRecipeCards from "../../matching-recipes/components/MatchingRecipeCards";
import Sidebar from "../../sidebar/components/Sidebar";

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <MatchingRecipeCards />
    </>
  )
}
