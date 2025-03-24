import React from "react";
import "./About.css";
import author from "../../images/avatar.svg";
import selfie from "../../images/selfie2.jpeg";

function About() {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          <img className="about__image" src={selfie} alt="about-image" />
        </div>

        <div className="about__heading">
          <h2 className="about__title">About the author</h2>
          <p className="about__subtitle">
            Hi! My name is Blend Avdili, and I'm a full-stack web developer with
            a passion for buidling clean, responsive, and user-focused
            applications. I specialize in technologies like JavaScript, React,
            Node.js, and MongoDB.
          </p>

          <p className="about__subtitle">
            This project was built as part of my experience with TripleTen's
            Software Engineering program, where I gained hands-on experience
            with the full development lifecycle — from planning and design to
            backend development and deployment. Through TripleTen, I deepened my
            skills in Git, APIs, authentication, and modern frontend
            development.
          </p>

          <p className="about__subtitle">
            I'm excited to continue growing as a developer and take on projects
            that make an impact. If you're looking for someone who's
            detail-oriented, collaborative, and always eager to learn — I'd love
            to help bring your ideas to life.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
