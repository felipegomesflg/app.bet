import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import avatar from "../assets/no-user.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";

import DataService from "../services/data.service";
import globalService from "../services/global.service";
import ProfileForm from "../components/ProfileData";
import ApostasSemana from "../components/ApostasSemana";


const AccountPage = () => {
  const [profileData, setProfile] = useState({}); 
  const [betsData, setBets] = useState([]);
  const [reviewsData, setReviews] = useState([]);
  const [favData, setFav] = useState([]);
  const [tickerData, setTicker] = useState([]);

  const data = useParams();
  const dataService = new DataService();
  useEffect(() => {
    let controller = new AbortController();
    if (!globalService.currentUser) return false;
    dataService.get(data.id ? "users/" + data.id : "logged/").then((res) => {
      setProfile(res.data);
    });
    return () => controller?.abort();
  }, [setProfile]);

  useEffect(() => {
    let controller = new AbortController();
    dataService.get("logged/review").then((res) => {
      setReviews(res.data);
    });
    return () => controller?.abort();
  }, [setReviews]);

  useEffect(() => {
    let controller = new AbortController();
    dataService.get("logged/bet").then((res) => {
      setBets(res.data);
    });
    return () => controller?.abort();
  }, [setBets]);

  useEffect(() => {
    let controller = new AbortController();
    dataService.get("logged/fav").then((res) => {
      setFav(res.data);
    });
    return () => controller?.abort();
  }, [setFav]);

  useEffect(() => {
    let controller = new AbortController();
    dataService.get("logged/ticker").then((res) => {
      setTicker(res.data);
    });
    return () => controller?.abort();
  }, [setTicker]);

  return (
    <div className="account-page">
      <div className="row mb-4">
        <div className="col-xl-4">
          <div className="card h-100">
            <div className="card-body">
              <div>
                <div className="clearfix"></div>

                <div className="text-center bg-pattern">
                  <img
                    src={profileData.avatar}
                    alt="avatar-4"
                    className="avatar-xl img-thumbnail rounded-circle mb-4 w-50"
                  />
                  <h4 className="text-primary mb-2">
                    {profileData.first_name} {profileData.last_name}
                  </h4>
                  <h6 className="text-muted font-size-13 mb-3">
                    {profileData.company_name}
                  </h6>
                  <p>{profileData.company_role} </p>
                </div>

                <hr className="my-4" />

                <h5 className="font-size-16">Conexões</h5>
                <ul className="pt-4 row list-unstyled">
                  {favData.map((con) => (
                    <li className="col-sm-4 pb-4 ">
                      <Link to={`/account/${con.User.id}`}>
                        <img
                          src={con.User.avatar}
                          alt={con.User.first_name}
                          className="w-100 rounded-circle"
                        />
                        <p>
                          {con.User.first_name} {con.User.last_name}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <hr className="my-4" />
            </div>
          </div>
        </div>

        <div className="col-xl-8">
          <div className="card mb-0">
            <Tabs
              defaultActiveKey="settings"
              id="uncontrolled-tab-example"
              className="nav nav-tabs nav-tabs-custom nav-justified"
            >
              <Tab eventKey="settings" title="Informações">
                {profileData.avatar && <ProfileForm data={profileData} />}
              </Tab>
              <Tab eventKey="apostas" title="Apostas">
                <div class="row ms-0 me-0 mt-3">
                  {betsData.map((bet, i) => {
                    return (
                      <ApostasSemana
                        size={6}
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
              </Tab>
              <Tab eventKey="reviews" title="Reviews">
                <div class="row ms-0 me-0 mt-3">
                  {reviewsData.map((con) => (
                    <div class="col-lg-4 col-md-6">
                      <div class="card bg-success text-start">
                        <div class="card-body">
                          <div class="d-flex">
                            <div>
                              <h4 class="card-title text-white">
                                {con.info.cod}
                              </h4>
                              <h6 class="card-subtitle text-white">
                                R$ {con.data[con.data.length - 1]}
                              </h6>
                            </div>
                          </div>
                          <div id="spark4">
                            <Sparklines data={con.data}>
                              <SparklinesLine color="white" />
                            </Sparklines>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab>
              <Tab eventKey="tickers" title="Ativos Favoritos">
              <div class="row ms-0 me-0 mt-3">
                  {tickerData.map((con) => (
                    <div class="col-lg-4 col-md-6">
                      <div class="card bg-info text-start">
                        <div class="card-body">
                          <div class="d-flex">
                            <div>
                              <h4 class="card-title text-white">
                                {con.info.cod}
                              </h4>
                              <h6 class="card-subtitle text-white">
                                R$ {con.data[con.data.length - 1]}
                              </h6>
                            </div>
                          </div>
                          <div id="spark4">
                            <Sparklines data={con.data}>
                              <SparklinesLine color="white" />
                            </Sparklines>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab>
            </Tabs>
            <div className="tab-content p-4">
              <div className="tab-pane active" id="about" role="tabpanel"></div>
              <div className="tab-pane" id="tasks" role="tabpanel"></div>
              <div className="tab-pane" id="messages" role="tabpanel"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
