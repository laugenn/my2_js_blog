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
      <section
        style={{
          flex: 7,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </section>
    </>
  );
};

export default Home;
