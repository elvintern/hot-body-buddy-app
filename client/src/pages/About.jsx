import React from 'react';
import { Link } from 'react-router-dom';
import profile from '../assets/profile.PNG';
import previous from '../assets/previous.PNG';
import today from '../assets/today.PNG';
import routine from '../assets/routine.PNG';
import workout from '../assets/workout.PNG';

import './About.scss';

export default function About() {
  return (
    <div className="about">
      <div className="about__container"></div>
      <h2 className="heading heading--secondary">
        Welcome to Hot Body Buddy!!
      </h2>
      <p className="paragraph">
        The ultimate fitness SPA designed to help you achieve your health goals
        and make exercising a regular habit!
      </p>
      <div className="about__container">
        <img
          className="about__image"
          src={profile}
          alt="test user's profile page"
        />
        <p className="paragraph">
          Your profile will remind your goal and how many times you went to the
          gym since you joined this app!!
        </p>
      </div>
      <div className="about__container">
        <img
          className="about__image"
          src={routine}
          alt="test user's routine page"
        />
        <p className="paragraph">
          With your Hot body buddy, you can customize your workout routines with
          your own name!
        </p>
      </div>
      <div className="about__container">
        <img
          className="about__image"
          src={workout}
          alt="test user's workout page"
        />
        <p className="paragraph">
          Our user-friendly interface allows you to easily record your gym
          performance regardless of how many sets you do.
        </p>
      </div>
      <div className="about__container">
        <div className="about__review">
          <img
            className="about__image"
            src={previous}
            alt="test user's previous workout performance"
          />
          <img
            className="about__image"
            src={today}
            alt="test user's today's workout performance"
          />
        </div>
        <p className="paragraph paragraph--about">
          You can track your progress over time, seeing how far you've come and
          what you can improve on. Hot Body Buddy is your perfect companion for
          a healthier, happier you!
        </p>
      </div>

      <Link to="/sign-up" className="btn btn--signup">
        Join us!
      </Link>
    </div>
  );
}
