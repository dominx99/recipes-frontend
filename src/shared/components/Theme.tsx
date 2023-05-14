import { ThemeProvider } from "@emotion/react";
import { ReactNode, useMemo } from "react";
import { getMode } from "../../cookery/shared/slice/LayoutSlice";
import { useAppSelector } from "../app/hooks";
import { darkTheme, lightTheme } from "../mui/themes";
import { ThemeWrapper } from "./ThemeWrapper";

interface Props {
  children: ReactNode;
}

export default function Theme({ children }: Props) {
  const currentMode = useAppSelector(getMode);

  const theme = useMemo(
    () => currentMode === 'light' ? lightTheme : darkTheme,
    [currentMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <ThemeWrapper>
        {children}
      </ThemeWrapper>
    </ThemeProvider>
  )
}
