function ApostasSemana(props) {
  return (
    <div className="app-ativo-bet col-sm-4">
      <div className="content row">
        <div className="avatar col-4">
          <div className="img">
            <img src={props.avatar} alt="Avatar" />
          </div>
          <button>VER APOSTA</button>
        </div>
        <div className="info col-8">
          <h5 title={props.name}>
            <a href={"profile/" + props.userid}>{props.name} {props.lastName}</a>
          </h5>
          <h6 title={props.company}>{props.company}</h6>
          <p title={props.role}>{props.role}</p>
          <h6>
            R$ {props.value}
            <small className={props.percentage > 0 ? "pos" : "neg"}>
              {props.percentage}
              <span className="material-icons ">trending_up</span>
            </small>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default ApostasSemana;
