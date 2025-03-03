import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";

/**
 * Not Found画面
 * @returns {JSX.Element}
 */
const Page404: React.FC = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: "100%" }}
      >
        <Toolbar />
        <Typography sx={{ marginBottom: 2 }}>
          <div className="page404">
            <h2 className="page-title">404 Not Found</h2>
            <Link to="/">トップに戻る</Link>
          </div>
        </Typography>
      </Box>
    </>
  );
};
export default Page404;
