import React from "react";
import SignUpForm from "./SignUpForm";
import './SignUp.css';

const SignUp = () => (
  <div className="signUp">
    <div className="signUpTitle">Signing up is a Brze!</div>
    <div> Required Field*</div>
    <SignUpForm />
  </div>
);

export default SignUp;
