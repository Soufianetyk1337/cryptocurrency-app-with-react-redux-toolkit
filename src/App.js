/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Switch, Link, Route } from "react-router-dom";
import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  CryptocurrencyDetail,
  News,
  LandingPage,
} from "./components";
import {
  UilEstate,
  UilNewspaper,
  UilExchange,
  UilBitcoin,
  UilTimes,
  UilApps,
  UilArrowDown,
  UilMouse,
  UilArrowUp,
} from "@iconscout/react-unicons";
import Container from "@mui/material/Container";
import Header from "./components/Header/Header";
import "./App.css";
import CryptosTable from "./components/CryptosTable/CryptosTable";
const App = () => {
  const navMenuRef = useRef(null);
  const navToggleRef = useRef(null);
  // useEffect(() => {
  //   navMenuRef.current.addEventListener("click", () => {
  //     console.log("I GOT CLICKED");
  //     console.log(navToggleRef);
  //     // navToggleRef.current.classList.toggle("active");
  //   });
  //   return () => {
  //     navMenuRef.removeEventListener("click", () => {
  //       console.log("IM UNMOUNTED");
  //     });
  //   };
  // }, []);
  return (
    <>
      <Header />
      <main className="main">
        <>
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges />
            </Route>
            <Route exact path="/cryptocurrencies">
              <CryptosTable />
            </Route>
            <Route exact path="/cryptocurrency/:coinId">
              <CryptocurrencyDetail />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </>
        {/* <LandingPage />
        <CryptosTable limit />
        <News limit /> */}
      </main>
      <footer className="footer"></footer>
      <a href="/" className="scrollup" id="scroll-up">
        <UilArrowUp className="scrollup__icon" />
      </a>
    </>
    //   <div className="app">
    //     <Navbar />

    //     <div
    //       className="main__container"
    //       style={{ marginLeft: "250px", height: "100%" }}
    //     >
    //       <main className="main">
    //         <Container>
    //           <Container className="routes">
    //             <Switch>
    //               <Route exact path="/">
    //                 <Homepage />
    //               </Route>
    //               <Route exact path="/exchanges">
    //                 <Exchanges />
    //               </Route>
    //               <Route exact path="/cryptocurrencies">
    //                 <Cryptocurrencies />
    //               </Route>
    //               <Route exact path="/cryptocurrency/:coinId">
    //                 <CryptocurrencyDetail />
    //               </Route>
    //               <Route exact path="/news">
    //                 <News />
    //               </Route>
    //             </Switch>
    //           </Container>
    //         </Container>
    //       </main>
    //       <footer className="footer"></footer>
    //     </div>
    //   </div>
  );
};

export default App;
