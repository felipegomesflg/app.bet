import ReactApexChart from "react-apexcharts";
import loading from "../assets/loading.gif";

function ApostasSemana(props) {
  let labels = [];
  let series = [];
  let state;

  for (var i in props.unitValue) {
    let values = [];
    for (var y in props.unitValue[i]) {
      values.push(parseFloat(props.unitValue[i][y].toFixed(2)));
      labels.push(new Date(y).getDate() + "/" + new Date(y).getMonth() + 1);
    }
    series.push({
      name: Object.keys(props.unitValue)[0],
      data: values,
    });
  }

  console.log(series);
  console.log(props.totalValue);
  state = {
    series: props.totalValue,
    options: {
      chart: {
        height: 400,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: props.totalValue? props.totalValue[0]["labels"]:[],
        labels: {
          formatter: function (value) {
            return new Date(value).getDate() + "/" + new Date(y).getMonth() + 1;
          }
        }
      },
    },
  };

  return (
    <div className={`app-ativo-bet col-sm-4 ${props.loading ? "loading" : ""}`}>
      <div className="content ">
        <div className="loading">
          <img src={loading}></img>
        </div>
        {!props.loading && (
          <div>
            <div className="p-header row">
              <div className="col-sm-8">
                <h4>
                  R$ {props.actualTotalValue}
                  <small className={props.percentage > 0 ? "pos" : "neg"}>
                    {props.percentage}
                    <span className="material-icons ">trending_up</span>
                  </small>
                </h4>
              </div>
              <div className="col-sm-4 align-right"></div>
            </div>
            <div className="p-body">
              {state && (
                <ReactApexChart
                  options={state.options}
                  series={state.series}
                  type="line"
                />
              )}
            </div>
            <div className="p-footer row">
              <div className="col-sm-3">
                <div
                  className="avatar"
                  style={{
                    backgroundImage: `url(${props.info.avatar})`,
                  }}
                ></div>
              </div>
              <div className="col-sm-9">
                <h5 title={`${props.info.first_name} ${props.info.last_name}`}>
                  <a href={"profile/" + props.info.userid}>
                    {props.info.first_name} {props.info.last_name}
                  </a>
                </h5>
                <p title={props.info.company_name}>{props.info.company_name}</p>
                <span title={props.info.company_role}>
                  {props.info.company_role}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApostasSemana;
