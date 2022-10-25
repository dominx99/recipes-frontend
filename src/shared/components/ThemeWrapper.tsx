import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const ThemeWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}))
