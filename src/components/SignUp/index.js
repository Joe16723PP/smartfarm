import React, { Component } from 'react';
import {
  withRouter,
} from 'react-router-dom';

import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import "./index.css";
const SignUpPage = ({ history }) =>
  <div>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(() => {
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <div className="colcard">
      <div className="card-signin my-5">
        <div className="card-body">
          <br></br><br></br>
          <img className="logoSignin" alt="logo" src={"../images/kku-logo-notext.png"}></img>
          <div className="card-title text-center">เพิ่มผู้ดูแลใหม่</div>
          <hr className="my-4"/>
      <form onSubmit={this.onSubmit}>
      <div className="form-label-group">
        <input
          className="form-control"
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
      </div>
      <div className="form-label-group">
        <input
          className="form-control"
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
      </div>

      <div className="form-label-group">
        <input
          className="form-control"
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />      
      </div>
      <br></br><br></br>
        <button className="btn btn-lg btn-success btn-block text-uppercase" disabled={isInvalid} type="submit">
          สร้างผู้ดูแลใหม่
        </button>
        <hr className="my-4"/>
                { error && <p>{error.message}</p> }
              </form>
              </div>
                </div>
              </div>
    );
  }
}


export default withRouter(SignUpPage);

export {
  SignUpForm,
};