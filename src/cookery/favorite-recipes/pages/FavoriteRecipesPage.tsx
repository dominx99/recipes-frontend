import { Box } from "@mui/material";
import Navbar from "../../../shared/components/Navbar";
import Sidebar from "../../sidebar/components/Sidebar";

export default function FavoriteRecipesPage() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Box color="white">Favorite recipes page</Box>
    </>
  )
}
