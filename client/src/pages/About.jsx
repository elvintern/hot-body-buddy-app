import React from 'react';
import profile from '../assets/profile.PNG';
import review from '../assets/review.PNG';
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
        <img src={profile} alt="profile example image" />
        <p className="paragraph">
          With your Hot body buddy, you can customize your workout routines,
          track your progress, and receive motivational quotes to keep you
          motivated every step of the way. Our user-friendly interface allows
          you to easily access your profile where you can view your goals and
          see how many times you have visited the gym. Plus, you can compare
          your progress over time, seeing how far you've come and what you can
          improve on. Hot Body Buddy is your perfect companion for a healthier,
          happier you!
        </p>
      </div>
      <div className="about__container">
        <img src={review} alt="profile example image" />
        <p className="paragraph">
          With your Hot body buddy, you can customize your workout routines,
          track your progress, and receive motivational quotes to keep you
          motivated every step of the way. Our user-friendly interface allows
          you to easily access your profile where you can view your goals and
          see how many times you have visited the gym. Plus, you can compare
          your progress over time, seeing how far you've come and what you can
          improve on. Hot Body Buddy is your perfect companion for a healthier,
          happier you!
        </p>
      </div>
      <div className="about__container">
        <img src={routine} alt="profile example image" />
        <p className="paragraph">
          With your Hot body buddy, you can customize your workout routines,
          track your progress, and receive motivational quotes to keep you
          motivated every step of the way. Our user-friendly interface allows
          you to easily access your profile where you can view your goals and
          see how many times you have visited the gym. Plus, you can compare
          your progress over time, seeing how far you've come and what you can
          improve on. Hot Body Buddy is your perfect companion for a healthier,
          happier you!
        </p>
      </div>
      <div className="about__container">
        <img src={workout} alt="profile example image" />
        <p className="paragraph">
          With your Hot body buddy, you can customize your workout routines,
          track your progress, and receive motivational quotes to keep you
          motivated every step of the way. Our user-friendly interface allows
          you to easily access your profile where you can view your goals and
          see how many times you have visited the gym. Plus, you can compare
          your progress over time, seeing how far you've come and what you can
          improve on. Hot Body Buddy is your perfect companion for a healthier,
          happier you!
        </p>
      </div>
    </div>
  );
}
