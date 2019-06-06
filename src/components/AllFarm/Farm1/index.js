import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
import Switch from "react-switch";
import * as routes from '../../../constants/routes';
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import RTChart from 'react-rt-chart';
import "../../../../node_modules/react-rt-chart/c3.css"
import GraphData from '../Farm1/graphData';
import RealtimeSensor from '../Farm1/realTimeSensor';
ReactChartkick.addAdapter(Chart);
class SMARTFARM_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showTmp : true,
        showHum : false,
        showCO2 : false,
        showLight : false,
        showFan : false,
        fan : true,
        light : '',
        temp : true,
        data : '',
        tempVal : '',
        humVal : '',
        co2Val : '',
        soilVal : '',
        humandtemp : '',

     };
    }
    componentDidMount() {
        this.callGetStatusLED();
        // get all value sensor
        this.callGetallSensor()
        setInterval(() => this.doTimeInterval() , 30000);
    }
    ranDomNumber(){
        var rand = Math.floor(Math.random() * 0)
        return rand;
    }
    doTimeInterval(){
        /*
        this.callLastTempVal()
        this.callLastHumVal()
        */
       this.callGetallSensor()
    }
    callSetStateLED(val){
        fetch("https://smapi.kku.ac.th/updateStatusLED", 
        {
          method : 'post',
          headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
          body : JSON.stringify({
            ledStatus : val,
          })
        })
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              data: result.Data
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
        window.location.reload(true);
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

      callGetallSensor = () =>{
        fetch("https://smapi.kku.ac.th/testGetTempandHum")
       .then(res => res.json())
       .then(
         (result) => {
           this.setState({
            humVal : result.Data[0].hum[0].huminity,
            tempVal : result.Data[1].temp[0].temperature,
            co2Val : result.Data[2].co2[0].carbon,
            soilVal : result.Data[3].soil[0].moisture
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
            tempVal : result.Data[0].temperature,
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
        var allData = {
            date: new Date(),
            Temperature : this.state.tempVal,
            Huminity : this.state.humVal,
            CO2 : this.state.co2Val,
            Soil: this.state.soilVal
        }
        var allDataChart = {
            axis: {
                y: { min: 0, max: 500 }
            },
            point: {
                show: true
             }
            };

      return(
        <div className="farmPage">
            <div className="detailFarm">
                <div className="sensorType">
                    MORNITORING
                </div>
                    <div>
                        <div className="top-page">
                            <div className="row">
                                <div className="col-sm-7">
                                {/* real time graphs */}
                                <div className="realTimeGraph">
                                    <div className="headerGraph">
                                                กราฟแสดงข้อมูลแบบเรียลไทม์
                                            </div>
                                            <div className="RTgraph">
                                                <RTChart
                                                    chart={allDataChart}
                                                    fields={['Temperature','Huminity','CO2','Soil']}
                                                    maxValues={10}
                                                    data={allData} />
                                            </div>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                <div className="realTimeGraph">
                                        <div className="headerGraph">
                                                ข้อมูลของฟาร์ม
                                        </div>
                                        <div className="RTgraph">
                                            <div className="RTgraphText">
                                                <h4>Farm Id : </h4>
                                                <h5>Farm location : </h5>
                                                <h5>Farm type : </h5>
                                                <h5>Plant type : </h5>
                                                <h5>No. of Sensor : </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <RealtimeSensor></RealtimeSensor>
                        <GraphData></GraphData>
                    </div>
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
)(SMARTFARM_1);