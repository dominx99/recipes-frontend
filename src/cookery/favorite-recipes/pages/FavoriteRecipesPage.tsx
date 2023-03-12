import { Box } from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch } from "../../../shared/app/hooks";
import Navbar from "../../../shared/components/Navbar";
import { fetchAllCategoriesWithIngredientsAsync } from "../../ingredients/api/IngredientsSlice";
import Sidebar from "../../sidebar/components/Sidebar";

export default function FavoriteRecipesPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesWithIngredientsAsync());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box color="white">Favorite recipes page</Box>
    </>
  )
}
