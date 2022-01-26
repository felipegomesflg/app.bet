import logoIco from "../assets/logo-ico.png";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "../components/Search";
import AuthService from "../services/auth.service";

const MainNavigation = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <div>
      {(currentUser ||
        location.pathname === "/" ||
        location.pathname === "/home") && (
        <div>
          <nav className="sidenav sidenav-vertical layout-sidenav">
            <div className="appBrand">
              <img src={logoIco} alt="logo-ico" />
            </div>
            <div className="sidenav-inner">
              <div className="sidenav-item">
                {currentUser ? (
                  <div className="user-avatar">
                    <div className="avatar-content">
                      <span
                        style={{
                          backgroundImage:
                            'url("https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png")',
                        }}
                      ></span>
                      <Link className="" to="/login">
                        <p>Meu perfil</p>
                      </Link>
                    </div>
                    <div>
                      <Link className="red" to="/login">
                        <span className="material-icons ">logout</span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <Link className="sidenav-link user-avatar" to="/login">
                    <span
                      style={{
                        backgroundImage:
                          'url("http://polosolucoes.com.br/wp-content/uploads/2020/06/avatar.png")',
                      }}
                    ></span>
                    <p>Iniciar Sessão</p>
                  </Link>
                )}
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/home">
                  <span className="material-icons ">event_note</span>
                  Apostas
                </Link>
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/home">
                  <span className="material-icons ">trending_up</span>
                  Artigos
                </Link>
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/home">
                  <span className="material-icons ">format_list_bulleted</span>
                  Ativos
                </Link>
              </div>
              <div className="sidenav-item">
                <Link className="sidenav-link" to="/home">
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
