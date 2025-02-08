import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

/**
 * 画面ヘッダー
 * @returns {JSX.Element}
 */
const Header: React.FC = () => {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      color="info"
    >
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          投稿練習
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
