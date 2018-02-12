import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Authentication extends Component {

    constructor(props) {
        super(props);

        this.state = {
          username : "",
          password : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange(e) {
      let nextState = {};
      nextState[e.target.name] = e.target.value;
      this.setState(nextState);
    }

    handleLogin() {
      let id = this.state.username;
      let pw = this.state.password;

      this.props.onLogin(id, pw).then(
        (success) => {
          if (!success) {
            this.setState({
              password: ''
            });
          }
        }
      );
    }

    handleRegister() {
      let id = this.state.username;
      let pw = this.state.password;

      this.props.onRegister(id, pw).then(
        (success) => {
          if (!success) {
            this.setState({
              username: '',
              password: ''
            });
          }
        }
      );
    }

    handleKeyPress(e) {
           if(e.charCode==13) {
               if(this.props.mode) {
                   this.handleLogin();
               } else {
                   this.handleRegister();
               }
           }
       }

    render() {
        const inputBox = (
          <div>
            <div className="input-field col s12 username">
              <label>Username</label>
              <input
                name="username"
                type="text"
                onChange={this.handleChange}
                className="validate"/>
            </div>
            <div className="input-field col s12">
              <label>Password</label>
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
                className="validate"/>
            </div>
          </div>
        );

        const loginView = (
            <div>
                <div className="card-content">
                      <div className="row">
                        {inputBox}
                        <a className="waves-effect waves-light btn" onClick={this.handleLogin}>SUBMIT</a>
                      </div>
                </div>

                <div className="footer">
                  <div className="right">
                      <div className="right">
                        New Here? <Link to="/register">Create an account</Link>
                      </div>
                  </div>
                </div>
            </div>
        );

        const registerView = (
              <div className="card-content">
                    <div className="row">
                      {inputBox}
                      <a className="waves-effect waves-light btn" onClick={this.handleRegister}>CREATE</a>
                    </div>
              </div>
        );

        return(
            <div className="container auth">
              <Link className="logo" to="/">MEMOPAD</Link>
              <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    {this.props.mode ? loginView : registerView}
              </div>
            </div>
        );
    }
}

Authentication.propTypes = {
  mode: React.PropTypes.bool,
  onLogin: React.PropTypes.func,
  onRegister: React.PropTypes.func
};


Authentication.defaultProps = {
  mode: true,
  onLogin: (id, pw) => {console.error("login function not defined");},
  onRegister: (id, pw) => {console.error("Register function not defined");}
};

export default Authentication;
