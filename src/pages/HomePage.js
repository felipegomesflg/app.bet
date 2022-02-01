//libs
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataTable from "react-data-table-component";
//components

import AtivoReview from "../components/AtivoReview";
import ApostasSemana from "../components/ApostasSemana";
//css
import "@material/react-material-icon/index.scss";
//assets
import logo from "../assets/logo.png";

import DataService from "../services/data.service";
import { useEffect, useState } from "react";
import authService from "../services/auth.service";

const ativoReview = [
  { loading: true },
  { loading: true },
  { loading: true },
  { loading: true },
];
const apostaSemana = [
  { loading: true },
  { loading: true },
  { loading: true }
];
const HomePage = () => {
  

  let columns = [
    {
      name: "Ativo",
      selector: (row) => row.cod,
    },
    {
      name: "Último (R$)",
      selector: (row) => row.lastValue,
    },
    {
      name: "VAR. DIA(%)",
      selector: (row) => row.dayVariation,
    },
    {
      name: "VAL. MIN(R$)",
      selector: (row) => row.valMin,
    },
    {
      name: "VAL. MÁX(R$)",
      selector: (row) => row.valMax,
    },
    {
      name: "DATA",
      selector: (row) => row.date,
    },
  ];

  let data = [
    {
      cod: "CIEL3",
      lastValue: "2,02",
      dayVariation: "4.95	",
      valMin: "2",
      valMax: "2,15	",
      date: "17:54 17/01",
    },
    {
      cod: "QUAL3",
      lastValue: "15,93	",
      dayVariation: "2.76	",
      valMin: "15,76",
      valMax: "16,62	",
      date: "17:54 17/01",
    },
    {
      cod: "TIMS3",
      lastValue: "12,63",
      dayVariation: "2.45",
      valMin: "12,61",
      valMax: "12,94	",
      date: "18:07 17/01",
    },
    {
      cod: "LWSA3",
      lastValue: "8,39	",
      dayVariation: "2.26",
      valMin: "8,07",
      valMax: "8,71	",
      date: "18:07 17/01",
    },
    {
      cod: "BRFS3",
      lastValue: "24,3",
      dayVariation: "1.85",
      valMin: "23,22",
      valMax: "24,75	",
      date: "18:11 17/01",
    },
    {
      cod: "",
      lastValue: "",
      dayVariation: "",
      valMin: "",
      valMax: "",
      date: "",
    },
    {
      cod: "",
      lastValue: "",
      dayVariation: "",
      valMin: "",
      valMax: "",
      date: "",
    },
    {
      cod: "",
      lastValue: "",
      dayVariation: "",
      valMin: "",
      valMax: "",
      date: "",
    },
    {
      cod: "",
      lastValue: "",
      dayVariation: "",
      valMin: "",
      valMax: "",
      date: "",
    },
    {
      cod: "",
      lastValue: "",
      dayVariation: "",
      valMin: "",
      valMax: "",
      date: "",
    },
  ];
  const dataService = new DataService();
  const [reviewData, setReview] = useState(ativoReview);
  const [betData, setBet] = useState(apostaSemana);

  useEffect(() => {
    let controller = new AbortController();
    dataService.get("reviews/get_top_reviews").then((res) => {
      getTickers(res.data);
    });
    return () => controller?.abort();
  }, [setReview]);

  useEffect(() => {
    let controller = new AbortController();
    dataService.get("betotw/last").then((res) => {
      setBet(res.data);
    });
    return () => controller?.abort();
  }, [setBet]);

  function getTickers(review) {
    var tickers = "";
    for (var data in review) {
      if (tickers) {
        tickers += "," + review[data].cod;
      } else {
        tickers = review[data].cod;
      }
    }
    dataService.get("yfinance/gettickers/" + tickers).then((res) => {
      for (var data in review) {
        review[data]["data"] = [];
        for (var i in res) {
          if (review[data].cod == i.split(".SA")[0]) {
            for (var y in res[i]) {
              review[data]["data"].push(res[i][y]);
            }

            var lastBOnePos =
              res[i][Object.keys(res[i])[Object.keys(res[i]).length - 2]];
            var lastPos =
              res[i][Object.keys(res[i])[Object.keys(res[i]).length - 1]];
            review[data]["value"] = lastPos.toFixed(2);
            review[data]["percentage"] = (
              (lastPos / lastBOnePos) * 100 -
              100
            ).toFixed(2);
          }
        }
      }
      setReview(review);
    });
  }

  return (
    <div className="home-page">
      <img src={logo} className="App-logo" alt="logo" />

      <section className="reviews">
        <h4 className="title">Reviews populares</h4>

        <div className="row">
          {reviewData.map((review, i) => {
            return (
              <AtivoReview
                cod={review.cod}
                name={review.name}
                title={review.title}
                value={review.value}
                percentage={review.percentage}
                data={review.data}
                loading={review.loading}
              />
            );
          })}
        </div>
      </section>
      <section className="bets">
        <h4 className="title">Apostas da Semana</h4>

        <div className="row">
          {betData.map((bet, i) => {
            return (
              <ApostasSemana
                size={4}
                data={bet.data}
                info={bet.info}
                unitValue={bet.unitValue}
                totalValue={bet.totalValue}
                initialTotalValue={bet.initialTotalValue}
                actualTotalValue={bet.actualTotalValue}
                percentage={bet.percentage}
                loading={bet.loading}
              />
            );
          })}
        </div>
      </section>
      <section className="ativos">
        <Tabs
          defaultActiveKey="popular"
          transition={false}
          id="noanim-tab-example"
          className=""
        >
          <Tab eventKey="popular" title="Popular">
            <DataTable columns={columns} data={data} />
          </Tab>
          <Tab eventKey="alta" title="Ativos em Alta"></Tab>
          <Tab eventKey="baixa" title="Ativos em Baixa"></Tab>
        </Tabs>
      </section>
    </div>
  );
};

export default HomePage;
