import logoIco from "../assets/logo-ico.png";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../components/Search";

import globalService from "../services/global.service";
import authService from "../services/auth.service";
import noUser from '../assets/no-user.png';


const MainNavigation = () => {
  
  const [, setCurrentUser] = useState();
  const location = useLocation();
  

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      globalService.currentUser = user;
      setCurrentUser({});
    }
  }, []);
  return (
    <div>
      {(globalService.currentUser ||
        location.pathname === "/" ||
        location.pathname === "/home") && (
        <div>
          <nav className="sidenav sidenav-vertical layout-sidenav">
            <div className="appBrand">
              <img src={logoIco} alt="logo-ico" />
            </div>
            <div className="sidenav-inner">
              <div className="sidenav-item">
                {globalService.currentUser ? (
                  <div className="user-avatar">
                    <div className="avatar-content">
                      <span
                        style={{
                          backgroundImage:
                            `url(${globalService.currentUser.avatar})`
                        }}
                      ></span>
                      <Link className="" to="/my-account">
                        <p >{globalService.currentUser.first_name} {globalService.currentUser.last_name}</p>
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="red"
                        to="/"
                        onClick={() => authService.logout()}
                      >
                        <span className="material-icons ">logout</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="user-avatar">
                    <div className="avatar-content">
                      <span
                        style={{
                          backgroundImage:
                            `url(${noUser})`,
                        }}
                      ></span>
                      <Link className="" to="/login">
                        <p>Iniciar Sessão</p>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/home">
                  <span className="material-icons ">dashboard</span>
                  Página inicial
                </Link>
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/bets">
                  <span className="material-icons ">event_note</span>
                  Apostas
                </Link>
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/articles">
                  <span className="material-icons ">trending_up</span>
                  Artigos
                </Link>
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/tickers">
                  <span className="material-icons ">format_list_bulleted</span>
                  Ativos
                </Link>
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/help">
                  <span className="material-icons ">help</span>
                  Ajuda
                </Link>
              </div>
            </div>
          </nav>
          <header className="App-header">
            <Search />
          </header>
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
