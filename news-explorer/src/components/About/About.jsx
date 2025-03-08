import React from "react";
import "./About.css";
import author from "../../images/avatar.svg";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          <img className="about__image" src={author} alt="about-image" />
        </div>

        <div className="about__heading">
          <h2 className="about__title">About the author</h2>
          <p className="about__subtitle">
            This block describes the project author. Here you should indicate
            your name, what you do, and which development technologies you know.
            You can also talk about your experience with TripleTen, what you
            learned there, and how you can help potential customers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
