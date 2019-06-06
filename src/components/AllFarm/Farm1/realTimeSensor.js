import React, { Component } from 'react';
import '../index.css';

export default class realTimeSensor extends Component {
    constructor(props){
        super(props);
        this.state = {
            temp : '',
            hum : '',
            co2 : '',
            soil : '',
            tempModule : '',
            humModule : '',
            co2Module : '',
            soilModule : '',
        }
    }

    componentDidMount(){
        fetch("https://smapi.kku.ac.th/getlastallsensor")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                hum : result.Data[0].hum[0].huminity,
                temp : result.Data[1].temp[0].temperature,
                co2 : result.Data[2].co2[0].carbon,
                soil : result.Data[3].soil[0].moisture,
                humModule : result.Data[0].hum[0].sensor_module_id,
                tempModule : result.Data[1].temp[0].sensor_module_id,
                co2Module : result.Data[2].co2[0].sensor_module_id,
                soilModule : result.Data[3].soil[0].sensor_module_id,
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        ) 
    }

    render(){
        return(
            <div className="rtVal">
                <div className="well">
                    <h3>Realtime sensor</h3>
                    <div className="row">
                        {/* hum val */}
                        <div className="col-sm-3">
                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Huminity module id</th>
                                    <th>value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>#1</td>
                                    <td>{this.state.humModule}</td>
                                    <td>{this.state.hum}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="col-sm-3">
                        <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Temperature module id</th>
                                    <th>value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>#1</td>
                                    <td>{this.state.tempModule}</td>
                                    <td>{this.state.temp}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-3">
                        <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Carbon module id</th>
                                    <th>value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>#1</td>
                                    <td>{this.state.co2Module}</td>
                                    <td>{this.state.co2}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-3">
                        <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Soil module id</th>
                                    <th>value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>#1</td>
                                    <td>{this.state.soilModule}</td>
                                    <td>{this.state.soil}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
    