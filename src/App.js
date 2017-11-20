import "./reset.css";
import "./fonts.css";
import "./App.css";
import SignUp from "./SignUp/SignUp";

import React from "react";

const num = n => <span className="num">{n}</span>;

const App = () => (
  <div>
    <img className="brzeLogo" alt="Brze" src="/images/brze.png" />
    <h1>
      <span className="makingPickupEasy">Making pickup easy! </span>
      <span className="carriers">FedEx • USPS • UPS</span>
    </h1>
    <div className="intro">
      <div className="title">
        <span className="fontWeight500">Introducing Brze. </span>
        <span>Returns Made Easy!</span>
      </div>
      <div className="finally">
        Finally, an affordable service that will pick up your package/s from
        your home and drop them off at
        <span className="carriers"> FedEx, USPS, or UPS.</span>
      </div>
    </div>
    <div className="easy">
      <div className="verticalBrze">Brze</div>
      <div className="steps">
        <span>
          It’s as simple as
          <span className="fontWeight500"> 1, 2, 3</span>
          <span>!</span>
        </span>
        <div className="numWrapper">
          {num("1 ")}
          <span className="fontWeight500">TEXT US </span>
          <span>at</span>
          <span className="fontWeight500"> 848.702.3698</span>
        </div>
        <div className="numWrapper">
          {num("2 ")}
          <span>We come and pickup your packages*</span>
        </div>
        <div className="numWrapper">
          {num("3 ")}
          <span>
            We text you a confirmation that inclides an image and tracking
            number after delivery
          </span>
        </div>
        <div className="currently"> *Currently in Summit, NJ Only</div>
      </div>
    </div>
    {SignUp()}
  </div>
);

export default App;
