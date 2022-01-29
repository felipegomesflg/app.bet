import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

import logo from "../assets/logo-ico.png";
import DataService from "../services/data.service";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signup_first_name, setSignUpFirstName] = useState("");
  const [signup_last_name, setSignUpLastName] = useState("");
  const [signup_email, setSignUpEmail] = useState("");
  const [signup_password, setSignUpPassword] = useState("");
  const [signup_confirm_password, setSignUpConfirmPassword] = useState("");
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setEmail('');
    setPassword('');
    setSignUpFirstName('');
    setSignUpLastName('');
    setSignUpEmail('');
    setSignUpPassword('');
    setSignUpConfirmPassword('');
  };

  const handleLogin = async (e) => {
    console.log(e)
    e.preventDefault();
    try {
      await AuthService.login(email, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignin = async (e) => {
    
    e.preventDefault();
    let userData = {
      first_name: signup_first_name,
      last_name: signup_last_name,
      company_name: "",
      company_role: "",
      avatar: "https://mkpusa.org/wp-content/uploads/2015/04/YourFace.jpg",
      email: signup_email,
      telefone: "",
      password: signup_password,
    };
    const dataService = new DataService();
    try {
      dataService.post("users", userData).then((res) => {
        switchAuthModeHandler();
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="auth">
      <div className="overlay">
        <div>
          <img src={logo} className="logo" />
          <h5>{isLogin ? "Login" : "Cadastro"}</h5>
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="control">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Digite seu E-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-mail feather-sm text-primary fill-white me-2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span class="border-start border-success ps-3">E-mail</span>
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id=""
                    placeholder="Digite sua senha"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-lock feather-sm text-primary fill-white me-2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span class="border-start border-success ps-3">Senha</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 text-right">
                  <Link to="/">
                    <small>Esqueceu a senha?</small>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <button
                    className="
                          btn
                          rounded-pill
                          w-100
                          waves-effect waves-light
                          btn-primary
                        "
                    type="submit"
                  >
                    LOGIN
                  </button>
                </div>
              </div>
              <hr />
              <p>Não é cadastrado ainda?</p>
              <div className="row">
                <div className="col-sm-12">
                  <button
                    className="
                          btn
                          rounded-pill
                          w-100
                          waves-effect waves-light
                          btn-outline-primary
                        "
                    type="button"
                    onClick={switchAuthModeHandler}
                  >
                    Cadastre-se
                  </button>
                </div>
              </div>
            </form>
          ) : (
            //CADASTRO
            <form onSubmit={handleSignin}>
              <div className="control">
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Digite seu nome"
                    required
                    value={signup_first_name}
                    onChange={(e) => setSignUpFirstName(e.target.value)}
                  />
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user feather-sm text-primary fill-white me-2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="border-start border-success ps-3">
                      Primeiro nome
                    </span>
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Digite seu sobrenome"
                    required
                    value={signup_last_name}
                    onChange={(e) => setSignUpLastName(e.target.value)}
                  />
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-user feather-sm text-primary fill-white me-2"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="border-start border-success ps-3">
                      Segundo nome
                    </span>
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id=""
                    placeholder="Digite seu E-mail"
                    required
                    value={signup_email}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                  />
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-mail feather-sm text-primary fill-white me-2"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span class="border-start border-success ps-3">E-mail</span>
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id=""
                    placeholder="Digite sua senha"
                    required
                    value={signup_password}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                  />
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-lock feather-sm text-primary fill-white me-2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span class="border-start border-success ps-3">Senha</span>
                  </label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id=""
                    placeholder="Digite sua confirmação de senha"
                    required
                    value={signup_confirm_password}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  />
                  <label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-lock feather-sm text-primary fill-white me-2"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span class="border-start border-success ps-3">
                      Repetir senha
                    </span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <button
                    className="
                      btn
                      rounded-pill
                      w-100
                      waves-effect waves-light
                      btn-primary
                    "
                    type="submit"
                  >
                    CADASTRAR
                  </button>
                </div>
              </div>
              <hr />
              <p>Já possui conta?</p>
              <div className="row">
                <div className="col-sm-12">
                  <button
                    className="
                      btn
                      rounded-pill
                      w-100
                      waves-effect waves-light
                      btn-outline-primary
                    "
                    type="button"
                    onClick={switchAuthModeHandler}
                  >
                    Efetuar Login
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
