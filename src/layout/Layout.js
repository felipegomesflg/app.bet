import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

import Search from "../components/Search";
const Layout = (props) => {
  return (
    <div className="App">
      <div className="container">
        <MainNavigation />
        <header className="App-header">
          <Search />
        </header>
        <div className="layout-container">
         
        </div>
      </div>
    </div>
  );
};

export default Layout;
