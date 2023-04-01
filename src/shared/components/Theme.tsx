import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { darkTheme } from "../mui/themes";
import { ThemeWrapper } from "./ThemeWrapper";

interface Props {
  children: ReactNode;
}

export default function Theme({ children }: Props) {
  return (
    <ThemeProvider theme={darkTheme}>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </ThemeProvider>
  )
}

