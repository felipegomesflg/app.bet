import { useState } from "react";
import DataService from "../services/data.service";
import globalService from "../services/global.service";

function ProfileForm(props) {
  const [email, setEmail] = useState(props.data.email);
  const [first_name, setFirstName] = useState(props.data.first_name);
  const [last_name, setLastName] = useState(props.data.last_name);
  const [phone, setPhone] = useState(props.data.phone);
  const [company_name, setCompany] = useState(props.data.company_name);
  const [company_role, setRole] = useState(props.data.company_role);
  const [about, setAbout] = useState(props.data.about);

  const [password, setPassword] = useState();
  const [repeat_password, setRepeatPassword] = useState();

  const handleSubmit = async (e) => {
    if (password) {
      if (!repeat_password) {
        globalService.alertError("Digite repetição de sua senha!");
        return false;
      }
      if (password !== repeat_password) {
        globalService.alertError("A senha e sua confirmação não são iguais!");
        return false;
      }
    }
    let obj = {
      id: props.data.id,
      first_name: first_name,
      last_name: last_name,
      company_name: company_name,
      company_role: company_role,
      phone: phone,
      password: password,
      about: about,
    };
    let dataService = new DataService();
    dataService.put("users", obj).then((res) => {
      globalService.alertSuccess("Seus dados foram salvos com sucesso!");
    });
  };

  return (
    <form className="form-horizontal striped-rows b-form border-top">
      <div className="card-body">
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="email-field"
                className="control-label col-form-label"
              >
                Email
              </label>
            </div>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="email-field"
              placeholder="Email"
              disabled
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="password-field"
                className="control-label col-form-label"
              >
                Senha
              </label>
            </div>
          </div>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="password-field"
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
            <div className="b-label">
              <label
                htmlFor="repeat-password-field"
                className="control-label col-form-label"
              >
                Repetir
              </label>
            </div>
          </div>
          <div className="col-sm-4">
            <input
              type="text"
              className="form-control"
              id="repeat-password-field"
              placeholder="Repetir senha"
              value={repeat_password}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="first-name-field"
                className="control-label col-form-label"
              >
                Primeiro nome
              </label>
            </div>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="first-name-field"
              placeholder="Primeiro nome"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="last-name-field"
                className="control-label col-form-label"
              >
                Último nome
              </label>
            </div>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="last-name-field"
              placeholder="Último nome"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="phone-field"
                className="control-label col-form-label"
              >
                Telefone
              </label>
            </div>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="phone-field"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="company-field"
                className="control-label col-form-label"
              >
                Empresa
              </label>
            </div>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="company-field"
              placeholder="Nome da empresa"
              value={company_name}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="role-field"
                className="control-label col-form-label"
              >
                Cargo
              </label>
            </div>
          </div>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="role-field"
              placeholder="Cargo na empresa"
              value={company_role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">
            <div className="b-label">
              <label
                htmlFor="about-field"
                className="control-label col-form-label"
              >
                Sobre mim
              </label>
            </div>
          </div>
          <div className="col-sm-9">
            <textarea
              type="text"
              className="form-control"
              id="about-field"
              placeholder="Sobre mim"
              rows="10"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
        </div>
        <div className="p-3 border-top">
          <div className="form-group mb-0 text-end">
            <button
              type="button"
              className="
                          btn btn-info
                          rounded-pill
                          px-4
                          waves-effect waves-light
                        "
              onClick={handleSubmit}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileForm;
