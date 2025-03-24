import React from "react";
import "./Footer.css";
import github from "../../images/github.svg";
import linkedIn from "../../images/linkedIn.svg";

function Footer({}) {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Supersite, Powered by News API
      </p>

      <div className="footer__nav">
        <div className="footer__nav-links">
          <a href="/" className="footer__nav-item">
            Home
          </a>
          <a href="https://tripleten.com" className="footer__nav-item">
            TripleTen
          </a>
        </div>

        <div className="footer__nav-social">
          <a href="https://github.com/dashboard">
            <img src={github} alt="github" className="footer__icon" />
          </a>

          <a href="https://www.linkedin.com/in/blend-avdili-820985139/">
            <img src={linkedIn} alt="facebook" className="footer__icon" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
