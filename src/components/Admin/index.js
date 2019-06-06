import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../Session/withAuthorization';
import './index.css';
import * as routes from '../../constants/routes';
class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     };
    }
    render() {
      return(
        <div className="adminPage">
        <br></br>
         <br></br>
         <br></br> 
         <div className="subPage">
          <div className="textHeader" >
            ผู้ดูแลระบบ
          </div>
          <ul>
            <li className="listOption">
              <a href={routes.ADD_FARM}>addFarm</a>
            </li>
            <li className="listOption">
              <a href={routes.ADD_FARM_SENSOR}>addFarmSensor</a>
            </li>
            <li className="listOption">
              <a href={routes.ADD_SENSOR}>addSensor</a>
            </li>
            <li className="listOption">
              <a href={routes.ADD_SENSOR_NODE}>addSensorNode</a>
            </li>
            <li className="listOption">
              <a href={routes.ADD_SENSOR_LIST}>addSensorList</a>
            </li>
            <li className="listOption">
              <a href={routes.ADD_SENSOR_MODULE}>addSensorModule</a>
            </li>
            <li className="listOption">
              <a href={routes.SIGN_UP}>addUserAdmin</a>
            </li>
            <li className="listOption">
              <a href={routes.ADD_PROFILE}>addProfile</a>
            </li>
          </ul>
         </div>
        </div>
      );
    }
}
const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject('sessionStore'),
  observer
)(AdminPage);