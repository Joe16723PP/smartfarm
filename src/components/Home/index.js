import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import Switch from "react-switch";
import './index.css';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import * as routes from '../../constants/routes'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)
//import withAuthorization from '../Session/withAuthorization';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show_temp:true,
      show_light:false,
      show_air:false,
      tmpVal : 'Loading',
      humVal : 'Loading',
      co2Val : 'Loading',
      light : 'Loading',
      ros : ''
     };
    }
  componentDidMount() {

    setInterval(() => this.callGetStatusLED() ,10000);
    setInterval(() => this.callGethumandtemp() , 10000);

  }
  callGetStatusLED = () =>{
    fetch("https://smapi.kku.ac.th/getstatusLED")
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({
         light : result.Data[0].status,
       });
     },
     (error) => {
       this.setState({
         error
       });
     }
   ) 
   }

  callGethumandtemp = () =>{
    fetch("https://smapi.kku.ac.th/testGetTempandHum")
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({
        humVal : result.Data[0].hum[0].huminity,
        tmpVal : result.Data[1].temp[0].temperature,
        co2Val : result.Data[2].co2[0].carbon,
       });
     },
     (error) => {
       this.setState({
         error
       });
     }
   ) 
   }

  callLastTempVal = () =>{
    fetch("https://smapi.kku.ac.th/getlasttemp")
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({
        tmp : result.Data[0].temperature,
       });
     },
     (error) => {
       this.setState({
         error
       });
     }
   ) 
   }
   callLastHumVal = () =>{
    fetch("https://smapi.kku.ac.th/getlasthum")
   .then(res => res.json())
   .then(
     (result) => {
       this.setState({
        humVal : result.Data[0].huminity,
       });
     },
     (error) => {
       this.setState({
         error
       });
     }
   ) 
   }

  render() {
    if (this.state.light === 'off') {
      var light = false;
    }
    else if (this.state.light === 'on') {
      var light = true;
    }
    return (
      <div className="gridHomePage">
        <div style={{height: "60vh"}}>
          <div className="carouselCard">
            <div className="textCarousel">Smart Farm <br></br>Khon Kaen University</div>
            <a href="#content" >
              <img className="imgCarousel" src={'./images/play-button.png'} alt="arrow" />
            </a> 
          </div>
        </div>
        <div className="rightPanelHomePage">
                  <div id="content" className="typeSensor">
                    <div className="subHeader">
                        <div className="topicSensor">SMART FARM</div>
                        <div className="detailSensor">Growing together</div>
                    </div> 

                    <div className="allCard">
                    {/* <div className="card">
                      <div className="farmName">Farm 1</div>
                        <div className="valueCard">
                          <div className="valueSensor">
                            <img src={'./images/thermometer.png'} alt="logo"></img>
                            <div className="subValueSensor">{this.state.tmpVal} ํC</div>
                          </div>
                          <div className="valueSensor">
                            <img src={'./images/drop.png'} alt="logo"></img>
                            <div className="subValueSensor">{this.state.humVal} %</div>
                          </div>
                          <div className="valueSensor">
                            <img src={'./images/co2.png'} alt="logo"></img>
                            <div className="subValueSensor">{this.state.co2Val}</div>
                          </div>
                          <div className="valueSensor">
                            <img src={'./images/idea.png'} alt="logo"></img>
                            <div className="subValueSensor">ON</div>
                          </div>
                          <div className="valueSensor">
                            <img src={'./images/fan.png'} alt="logo"></img>
                            <div className="subValueSensor">
                              {
                                this.state.light === 'Loading'?
                                  <div className="subValueSensor">
                                      {this.state.light}
                                  </div>
                                :
                                  <label htmlFor="normal-switch">
                                    <Switch
                                      onColor="#89ce6f"
                                      checked={light}
                                      disabled
                                      id="normal-switch"
                                      />
                                  </label>
                              }
                            </div>
                          </div>
                      </div>
                      <br></br>
                      <div className="detailBtn">
                        <div className="row">
                              <div className="col-sm-6">
                                <a href={routes.SMART_FARM_1} className="btn btn-primary">ดูรายละเอียด</a>
                              </div>
                              <div className="col-sm-6">
                                <a href={routes.CONTROL_FARM_1} className="btn btn-danger">ควมคุมอุปกรณ์</a>
                              </div>
                        </div>
                      </div>
                  </div> */}
              <CardFarm farmName={"Farm 1"} url={routes.SMART_FARM_1} controller_url={"controller_smartfarm1"} fan={this.state.fan} lght={this.state.light} tmp={this.state.tmpVal } hum={this.state.humVal} co2={this.state.co2Val}></CardFarm>
              <CardFarm farmName={"farm 2"} url={"/"} fan={true}  lght={"92"} tmp={"26.02"} hum={"40"} co2={"340"}></CardFarm>
              <CardFarm farmName={"farm 3"} url={"/"} fan={false} tmp={"24.7"} lght={"91"} hum={"37"} co2={"365"}></CardFarm>
              <CardFarm farmName={"farm 4"} url={"/"} fan={false} tmp={"26.4"} lght={"94"} hum={"39"} co2={"330"}></CardFarm>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const CardFarm = ({farmName,url,controller_url,fan,lght,tmp,hum,co2}) =>
    <div className="card">
      <div className="farmName">{farmName}</div>
        <div className="valueCard">
          <div className="valueSensor">
            <img src={'./images/thermometer.png'} alt="logo"></img>
            <div className="subValueSensor">{tmp} ํC</div>
          </div>
          <div className="valueSensor">
            <img src={'./images/drop.png'} alt="logo"></img>
            <div className="subValueSensor">{hum} %</div>
          </div>
          <div className="valueSensor">
            <img src={'./images/co2.png'} alt="logo"></img>
            <div className="subValueSensor">{co2}</div>
          </div>
          <div className="valueSensor">
            <img src={'./images/idea.png'} alt="logo"></img>
            <div className="subValueSensor">{lght}</div>
          </div>
          <div className="valueSensor">
            <img src={'./images/fan.png'} alt="logo"></img>
            <div className="subValueSensor">
              {
                lght === 'Loading'?
                  <div className="subValueSensor">
                      {fan}
                  </div>
                :
                  <label htmlFor="normal-switch">
                    <Switch
                      onChange={onChange}
                      onColor="#89ce6f"
                      checked={fan}
                      disabled
                      id="normal-switch"
                      />
                  </label>
              }
            </div>
          </div>
      </div>
      <br></br>
      <div className="detailBtn">
        <div className="row">
              <div className="col-sm-6">
                <a href={url} className="btn btn-primary">ดูรายละเอียด</a>
              </div>
              <div className="col-sm-6">
                <a href={controller_url} className="btn btn-danger">ควมคุมอุปกรณ์</a>
              </div>
      </div>
    </div>
  </div>
//const authCondition = (authUser) => !!authUser;

function onChange(evt) {
  // no event doing
}

export default compose(
  //withAuthorization(authCondition),
  inject('userStore'),
  observer
)(HomePage);