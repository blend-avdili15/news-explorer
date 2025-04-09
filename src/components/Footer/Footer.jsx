import React from "react";
import "./Footer.css";
import github from "../../images/github.svg";
import linkedIn from "../../images/linkedin.svg";

function Footer({}) {
  return (
    <footer className="footer">
      <h1 className="footer__copyright">
        © {new Date().getFullYear()} Supersite, Powered by News API
      </h1>

      <nav className="footer__nav">
        <ul className="footer__nav-links">
          <li>
            <a
              href="/"
              className="footer__nav-item"
              target="_blank"
              rel="noreferrer"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="https://tripleten.com"
              className="footer__nav-item"
              target="_blank"
              rel="noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>

        <ul className="footer__nav-social">
          <li>
            <a
              href="https://github.com/dashboard"
              target="_blank"
              rel="noreferrer"
            >
              <img src={github} alt="github" className="footer__icon" />
            </a>
          </li>

          <li>
            <a
              href="https://www.linkedin.com/in/blend-avdili-820985139/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedIn} alt="facebook" className="footer__icon" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
