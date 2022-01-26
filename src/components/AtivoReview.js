import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

function AtivoReview(props) {
  return (
    <div className="app-ativo-review col-sm-3">
      <div className="content">
        <div className="p-header" alt={props.title}>
          <span className="material-icons ">assignment</span> {props.cod}
          <span className="value"></span>
        </div>
        <div className="p-content">
          <Sparklines data={props.data}>
            <SparklinesLine color="white" />
          </Sparklines>
        </div>
        <div className="p-footer ">
          <div className="row">
            <div className="col-sm-6">
              <small>valor atual</small> <br />
              R$ {props.value}
              <small className={props.percentage > 0 ? "pos" : "neg"}>
                {props.percentage}
                <span className="material-icons ">trending_up</span>
              </small>
            </div>
            <div className="col-sm-6"></div>
          </div>
          <button className="btn">ver review</button>
        </div>
      </div>
    </div>
  );
}

export default AtivoReview;
