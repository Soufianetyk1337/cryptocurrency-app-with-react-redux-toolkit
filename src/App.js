import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Exchanges,
  News,
  LandingPage,
  Converter,
  Footer,
  CryptocurrencyDetail,
} from "./components";
import { UilArrowUp } from "@iconscout/react-unicons";
import Header from "./components/Header/Header";
import "./App.css";
import CryptosTable from "./components/CryptosTable/CryptosTable";
import { Helmet } from "react-helmet";
const App = () => {
  const handleArrowClick = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Helmet>
        <title>Cryptonews App</title>
        <meta
          name="description"
          content="Cryptonews is a web application that keeps you updated with everything that you need to know about cryptocurrencies. 
        It offers a wide range of services like prices,infos and articles and exchanges and more"
        />
        <meta name="keywords" content="react,seo,helmet,cryptocurrencies" />
        <meta name="robots" content="index" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta charset="UTF-8" />
      </Helmet>
      <Header />
      <main className="main" style={{ marginTop: "6rem" }}>
        <>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/converter" component={Converter} />
            <Route exact path="/exchanges" component={Exchanges} />
            <Route exact path="/cryptocurrencies" component={CryptosTable} />
            <Route
              exact
              path="/cryptocurrency/:coinId"
              component={CryptocurrencyDetail}
            />
            <Route exact path="/news" component={News} />
          </Switch>
        </>
      </main>
      <Footer className="footer" />
      <a
        href="#home"
        className="scrollup"
        id="scroll-up"
        onClick={handleArrowClick}
      >
        <UilArrowUp className="scrollup__icon" />
      </a>
    </>
  );
};

export default App;
