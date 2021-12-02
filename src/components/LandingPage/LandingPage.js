import React from "react";
import { CryptosTable, News, Exchanges, Homepage } from "../index";

const LandingPage = () => {
  return (
    <>
      <Homepage />
      <CryptosTable limit />
      <News limit />
      <Exchanges limit />
    </>
  );
};

export default LandingPage;
