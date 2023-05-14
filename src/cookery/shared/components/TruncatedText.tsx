import { Link } from "@mui/material";
import { useState } from "react";

interface TruncatedTypographyProps {
  children: string;
  length: number;
}

export default function TruncatedTypography({ children, length }: TruncatedTypographyProps) {
  const [allTextVisible, setAllTextVisible] = useState(false);

  if (children.length <= length || allTextVisible) {
    return <>{children}</>;
  }

  return (
    <>
      {children.slice(0, length)}...&nbsp;

      <Link sx={{ cursor: 'pointer' }} onClick={() => setAllTextVisible(true)}>Show more</Link>
    </>
  );
}
