import React from "react";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      address: "",
      addressoptional: undefined,
      email: "",
      city: "",
      zip: "",
      state: "NJ",
      signedUp: false,
      submitDisabled: false,
      password: "",
      password2: "",
      message: ""
    };

    this.requiredProps = [
      "name",
      "phone",
      "address",
      "email",
      "city",
      "state",
      "zip",
      "password",
      "password2"
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = prop => event => {
    const newState = {};
    newState[prop] = event.target.value;
    this.setState(newState);
  };

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.password !== this.state.password2) {
      this.setState({ message: "Passwords must match!" });
    } else if (this.requiredProps.some(field => !this.state[field])) {
      this.setState({ message: "Please fill in required fields." });
    } else {
      this.setState({ submitDisabled: true });

      fetch("/api/signup", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.state)
      })
        .then(resp => {
          if(resp.ok) {
            return resp.text();
          }
          throw new Error('Network response was not ok.');
        })
        .then(blob => {
          debugger;
          this.setState({ submitDisabled: false, message: blob });
        })
        .catch(err => {
          console.log(err);
          this.setState({submitDisabled: false, message: "There was an error signing up!" });
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="signUpInputWrapper">
          <div>Name*</div>
          <input
            className="signUpInput"
            value={this.state.name}
            onChange={this.handleChange("name")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>Street Address*</div>
          <input
            className="signUpInput"
            value={this.state.address}
            onChange={this.handleChange("address")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>Apt., Floor, Unit etc. (Optional)</div>
          <input
            className="signUpInput"
            value={this.state.addressoptional}
            onChange={this.handleChange("addressoptional")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>City</div>
          <input
            className="signUpInput"
            value={this.state.city}
            onChange={this.handleChange("city")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>Zip Code</div>
          <input
            className="signUpInput"
            value={this.state.zip}
            onChange={this.handleChange("zip")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>State*</div>
          <select className="signUpInput" defaultValue="NJ" onChange={this.handleChange("state")}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
   
        <div className="signUpInputWrapper">
          <div>Phone Number*</div>
          <input
            className="signUpInput"
            value={this.state.phone}
            onChange={this.handleChange("phone")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>Email*</div>
          <input
            className="signUpInput"
            value={this.state.email}
            onChange={this.handleChange("email")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>Password*</div>
          <input
            type="password"
            className="signUpInput"
            value={this.state.password}
            onChange={this.handleChange("password")}
          />
        </div>
        <div className="signUpInputWrapper">
          <div>Password Again*</div>
          <input
            type="password"
            className="signUpInput"
            value={this.state.password2}
            onChange={this.handleChange("password2")}
          />
        </div>
        <div className="err">{this.state.message}</div>
        <input
          className="signUpButton"
          disabled={this.state.submitDisabled}
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}

export default SignUpForm;
