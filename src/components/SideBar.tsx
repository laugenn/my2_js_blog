import { Box, Drawer, List } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Link } from "react-router-dom";

/**
 * 画面サイドバー
 * @returns {JSX.Element}
 */
const SideBar: React.FC = () => {
  // style情報
  const drawerWidth: number = 150;
  const SideBarPathList = [
    { id: "all", path: "/products/all", name: "投稿一覧" },
    { id: "add", path: "/products/add", name: "追加" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box>
        <List>
          {SideBarPathList.map((value) => (
            <ListItem
              key={value.id}
              disablePadding
              sx={{ margin: "15px 5px" }}
            >
              <Link to={value.path}>{value.name}</Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideBar;
