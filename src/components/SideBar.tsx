import { List } from "@mui/material";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginApi } from "../apis/login";

/**
 * 画面サイドバー
 * @returns {JSX.Element}
 */
const SideBar: React.FC = () => {
  const SideBarPathList = [
    { id: "all", path: "/products/all", name: "投稿一覧" },
    { id: "add", path: "/products/add", name: "追加" },
  ];

  const navigate = useNavigate();
  const handleLogoutClick = () => {
    loginApi
      .destroySession()
      .then(() => {
        navigate("/login/signin");
      })
      .catch(() => {
        navigate("/login/signin");
      });
  };

  return (
    <aside className="sidebar">
      <div style={{ width: "100px" }}>
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
        <Button
          color="inherit"
          onClick={handleLogoutClick}
        >
          ログアウト
        </Button>
      </div>
    </aside>
  );
};

export default SideBar;
