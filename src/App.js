import React from "react";
import { Switch, Route } from "react-router-dom";
import { Exchanges, News, LandingPage, Converter, Footer } from "./components";
import { UilArrowUp } from "@iconscout/react-unicons";
import Header from "./components/Header/Header";
import "./App.css";
import CryptosTable from "./components/CryptosTable/CryptosTable";
import { Helmet } from "react-helmet";
const App = () => {
  return (
    <>
      <Helmet>
        <title>Cryptonews App</title>
        <meta name="description"
          content="Cryptonews is a web application that keeps you updated with everything that you need to know about cryptocurrencies. 
        It offers a wide range of services like prices,infos and articles and exchanges and more" />
        <meta name="keywords" content="react,seo,helmet,cryptocurre" />
        <meta name="robots" content="index" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta charset="UTF-8" />
      </Helmet>
      <Header />
      <main className="main">
        <>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/converter">
              <Converter />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges />
            </Route>
            <Route exact path="/cryptocurrencies">
              <CryptosTable />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </>
      </main>
      <Footer className="footer" />
      <a href="#home" className="scrollup" id="scroll-up">
        <UilArrowUp className="scrollup__icon" />
      </a>
    </>
  );
};

export default App;
