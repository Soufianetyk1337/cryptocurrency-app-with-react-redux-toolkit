/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { UilArrowDown, UilMouse } from "@iconscout/react-unicons";
import { CryptosTable, News } from "../index";
const LandingPage = () => {
  return (
    <>
      <section className="section home" id="home">
        <div className="home__container container grid">
          <div className="home__content grid">
            <div className="home__data">
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
                className=" button__flex home__scroll__button"
              >
                <UilMouse className="home__scroll__mouse" />
                <span className="home__scroll__name">Learn More</span>
                <UilArrowDown className="button__icon home__scroll__arrow" />
              </a>
            </div>
            <div className="home__app">
              <div className="home__converter">
                <form>
                  <p className="home__subtitle">
                    Cryptocurrency Converter Calculator
                  </p>
                  <div
                    className="ConverterWrapper"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: "1.75rem",
                      marginBottom: "1.75rem",
                    }}
                  >
                    <div
                      className="InputWrapper"
                      style={{
                        display: "flex",
                        boxAlign: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div
                        className=""
                        style={{
                          width: "100%",
                          position: "relative",
                        }}
                      >
                        <input
                          type="button"
                          value
                          placeholder="0"
                          className="Input"
                          style={{
                            width: "100%",
                            borderTopLeftRadius: "0.5rem",
                            borderBottomLeftRadius: "0.5rem",
                            padding: "1.25rem",
                            borderwidth: "1px",
                            borderStyle: "none",
                          }}
                        />
                        <span
                          className="type"
                          style={{
                            fontSize: "1rem",
                            lineHeight: "22px",
                            color: "rgb(151, 160, 181)",
                            borderLeftWidth: "1px",
                            borderColor: "rgb(229, 235, 240)",
                            paddingLeft: "1.5rem",
                            paddingRight: "0.75rem",
                            position: "absolute",
                            top: "1.75rem",
                            right: "1.75rem",
                          }}
                        >
                          eth
                        </span>
                      </div>
                      <div>
                        <div>
                          <button
                            style={{
                              display: "inline-flex",
                              padding: "1.25rem",
                              fontSize: "0.875rem",
                              lineHeight: "21px",
                              backgroundColor: "rgba(255,255,255,var(1))",
                              boxAlign: "center",
                              alignItems: "center",
                              borderTopRightRadius: "0.5rem",
                              borderBottomRightRadius: "0.5rem",
                              justifyContent: "center",
                              textTransform: "uppercase",
                            }}
                          >
                            <img
                              src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880"
                              alt="Ethereum"
                              style={{
                                height: "1.5rem",
                                width: "1.5rem",
                                marginRight: "1rem",
                              }}
                            />
                            eth{" "}
                            <UilArrowDown
                              style={{
                                height: "1rem",
                                width: "3rem",
                                marginLeft: "1rem",
                                color: "rgb(18, 32, 63)",
                                fill: "currentcolor",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="Divider"
                      style={{
                        marginTop: "1rem",
                        marginBottom: "1rem",
                      }}
                    ></div>
                    <div
                      className="InputWrapper"
                      style={{
                        display: "flex",
                        boxAlign: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    ></div>
                    <div
                      className="ResultWrapper"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "auto",
                        marginRight: "auto",
                        minWidth: "min-content",
                        textAlign: "center",
                        paddingTop: "1rem",
                      }}
                    ></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <CryptosTable limit />
      </section>
      <section>
        <News limit />
      </section>
    </>
  );
};

export default LandingPage;
