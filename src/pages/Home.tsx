import React from "react";
import { Outlet } from "react-router-dom";

import SideBar from "../components/SideBar";

/**
 * ホーム画面
 * @returns {JSX.Element}
 */
const Home: React.FC = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default Home;
