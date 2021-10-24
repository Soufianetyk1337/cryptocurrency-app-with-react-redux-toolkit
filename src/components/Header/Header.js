import React from "react";
import {
  UilEstate,
  UilNewspaper,
  UilExchange,
  UilBitcoin,
  UilTimes,
  UilApps,
  UilMoon,
} from "@iconscout/react-unicons";
const Header = () => {
  return (
    <header className="header" id="header">
      <nav className="nav nav__container">
        <a href="/" className="nav__logo">
          CryptoNews
        </a>
        <div className="nav__menu">
          <ul className="nav__list grid">
            <li className="nav__item">
              <a href="/" className="nav__link">
                <UilEstate className="nav__icon" />
                Home
              </a>
            </li>
            <li className="nav__item">
              <a href="cryptocurrencies" className="nav__link">
                <UilBitcoin className="nav__icon" />
                Cryptocurrencies
              </a>
            </li>
            <li className="nav__item">
              <a href="exchanges" className="nav__link">
                <UilExchange className="nav__icon" />
                Exchanges
              </a>
            </li>
            <li className="nav__item">
              <a href="news" className="nav__link">
                <UilNewspaper className="nav__icon" />
                News
              </a>
            </li>
          </ul>
          <UilTimes
            className="nav__close"
            id="nav-close"
            onClick={() => {
              let menu = document.querySelector(".nav__menu");
              menu.classList.remove("showNavMenu");
            }}
          />
        </div>
        <div className="nav__buttons">
          <UilMoon className="change-theme" id="theme-button" />
          <UilApps
            className="nav__toggle"
            id="nav-toggle"
            onClick={() => {
              let menu = document.querySelector(".nav__menu");
              menu.classList.add("showNavMenu");
            }}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
