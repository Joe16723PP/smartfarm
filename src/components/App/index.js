import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation/index';
import AdminPage from '../Admin';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home/index';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import AboutPage from '../About'
import ContactPage from '../Contact'
import ProjectSrcPage from '../ProjectSrc'
import AddFarm from '../AddModule/AddFarm'
import AddFarmSensor from '../AddModule/AddFarmSensor'
import AddSensor from '../AddModule/AddSensor'
import AddSensorModule from '../AddModule/AddSensorModule'
import SMARTFARM_1 from '../AllFarm/Farm1'
import './index.css';
import AddProfile from '../AddModule/AddProfile';
import Control_Farm_1 from '../AllFarm/Farm1/controller';
import AddSensorNode from '../AddModule/AddSensorNode';
import AddSensorList from '../AddModule/AddSensorList';
const divStyle = {
  backgroundImage: "url(../images/bg.jpg)",
  height: "100%",
};
const App = () =>

// routing 
  <Router>
    <div className="app" style = {divStyle}>
      <Navigation fixed/>

      <Route exact path={routes.ADMIN} component={() => <AdminPage />} />
      <Route exact path={routes.ADD_SENSOR_LIST} component={() => <AddSensorList />} />
      <Route exact path={routes.ADD_SENSOR_NODE} component={() => <AddSensorNode />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ABOUT} component={() => <AboutPage />} />
      <Route exact path={routes.CONTACTUS} component={() => <ContactPage />} />
      <Route exact path={routes.PROJECTSRC} component={() => <ProjectSrcPage />} />
      <Route exact path={routes.ADD_FARM} component={() => <AddFarm />} />
      <Route exact path={routes.ADD_FARM_SENSOR} component={() => <AddFarmSensor />} />
      <Route exact path={routes.ADD_SENSOR} component={() => <AddSensor />} />
      <Route exact path={routes.ADD_SENSOR_MODULE} component={() => <AddSensorModule />} />
      <Route exact path={routes.SMART_FARM_1} component={() => <SMARTFARM_1 />} />
      <Route exact path={routes.ADD_PROFILE} component={() => <AddProfile />} />
      <Route exact path={routes.CONTROL_FARM_1} component={() => <Control_Farm_1 />} />
    </div>
  </Router>

export default withAuthentication(App);