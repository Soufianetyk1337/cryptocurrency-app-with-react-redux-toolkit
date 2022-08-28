import React from "react";
import { Box } from "@mui/material";
import { Converter } from "../index";
import { UilArrowDown, UilMouse } from "@iconscout/react-unicons";

const Homepage = () => {
  return (
    <section className="section home" id="home">
      <Box className="home__container container grid">
        <Box className="home__content grid">
          <Box className="home__data">
            <h1 className="home__title">
              Stay Updated With
              <br />
              <span className="gradientText">Cryptocurrencies</span>
            </h1>
            <p className="home__description">
              Everything you've ever want to know about cryptocurrencies and
              more, keeping you updated with the latest prices and articles.
            </p>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="button__flex home__scroll__button"
            >
              <UilMouse className="home__scroll__mouse" />
              <span className="home__scroll__name">Scroll Down</span>
              <UilArrowDown className="button__icon home__scroll__arrow" />
            </a>
          </Box>

          <Converter />
        </Box>
      </Box>
    </section>
  );
};

export default Homepage;
