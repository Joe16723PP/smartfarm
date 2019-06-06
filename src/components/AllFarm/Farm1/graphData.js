import React, { Component } from 'react';
import ReactChartkick, { LineChart, PieChart,AreaChart } from 'react-chartkick';
import Chart from 'chart.js';
ReactChartkick.addAdapter(Chart);   

var d = new Date();
var day = d.getDate();
var month = d.getMonth();
var years = d.getFullYear();
var date = years.toString() + "-" + month.toString() + "-" + day.toString();

export default class GraphData extends Component {
    constructor(props){
        super(props);
        this.state = {
            date : date,
            temp : '',
            hum : '',
            co2 : '',
            soil : '',
            isLoaded : false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }

    componentDidMount() {
        // fetch("https://smapi.kku.ac.th/getcarbon_bydate", 
        //   {
        //       method : 'post',
        //       headers: {
        //       'Accept' : 'application/json',
        //       'Content-Type':'application/json'},
        //       body : JSON.stringify({
        //       date : this.state.date,
        //       })
        //   })
        //   .then(res => res.json())
        //   .then(
        //       (result) => {
        //       this.setState({
        //             isLoaded : true,
        //           afterFetch : result.Data,
        //       });
        //     //   alert("succesfully")
        //       },
        //       (error) => {
        //       this.setState({
        //           isLoaded: false,
        //           error
        //       });
        //       }
        //   )
    }

    handleSubmit (evt) {
        fetch("https://smapi.kku.ac.th/getalldata_bydate", 
          {
              method : 'post',
              headers: {
              'Accept' : 'application/json',
              'Content-Type':'application/json'},
              body : JSON.stringify({
              date : this.state.date,
              })
          })
          .then(res => res.json())
          .then(
              (result) => {
              this.setState({
                  isLoaded : true,
                  co2 : result.Data[0].co2,
                  hum : result.Data[1].hum,
                  soil : result.Data[2].soil,
                  temp : result.Data[3].temp
              });
              },
              (error) => {
              this.setState({
                  isLoaded: false,
                  error
              });
              }
          )
          console.log(this.state.date);
          
          evt.preventDefault();
      }

    render(){
        var i;
        var dataHum = this.state.hum;
        var dataSoil = this.state.soil;
        var dataTemp = this.state.temp;
        var dataCO2 = this.state.co2;
        console.log(this.state.hum)

        // Carbon
        var jsonCo2 = "{";
        var objCo2 = {"2017-01-01 00:00:00 -0800": 2, "2017-01-01 00:01:00 -0800": 5};
        for (i = 0; i < dataCO2.length; i++) {
            if ( i === dataCO2.length - 1) {
                jsonCo2 += '"' + dataCO2[i].upd_date + '"' + ":" + dataCO2[i].carbon + '}';
                objCo2 = JSON.parse(jsonCo2)    
            }
            else {
                jsonCo2 += '"' + dataCO2[i].upd_date + '"' + ":" + dataCO2[i].carbon +",";
            }
        }

        // Temperature
        var jsonTemp = "{";
        var objTemp = {"2017-01-01 00:00:00 -0800": 2, "2017-01-01 00:01:00 -0800": 5};
        for (i = 0; i < dataTemp.length; i++) {
            if ( i === dataTemp.length - 1) {
                jsonTemp += '"' + dataTemp[i].upd_date + '"' + ":" + dataTemp[i].temperature + '}';
                objTemp = JSON.parse(jsonTemp)    
            }
            else {
                jsonTemp += '"' + dataTemp[i].upd_date + '"' + ":" + dataTemp[i].temperature +",";
            }
        }

        // Soil
        var jsonSoil = "{";
        var objSoil = {"2017-01-01 00:00:00 -0800": 2, "2017-01-01 00:01:00 -0800": 5};
        for (i = 0; i < dataSoil.length; i++) {
            if ( i === dataSoil.length - 1) {
                jsonSoil += '"' + dataSoil[i].upd_date + '"' + ":" + dataSoil[i].moisture + '}';
                objSoil = JSON.parse(jsonSoil)    
            }
            else {
                jsonSoil += '"' + dataSoil[i].upd_date + '"' + ":" + dataSoil[i].moisture +",";
            }
        }
        
        // Hum
        var jsonHum = "{";
        var objHum = {"2017-01-01 00:00:00 -0800": 2, "2017-01-01 00:01:00 -0800": 5};
        for (i = 0; i < dataHum.length; i++) {
            if ( i === dataHum.length - 1) {
                jsonHum += '"' + dataHum[i].upd_date + '"' + ":" + dataHum[i].huminity + '}';
                objHum = JSON.parse(jsonHum)    
            }
            else {
                jsonHum += '"' + dataHum[i].upd_date + '"' + ":" + dataHum[i].huminity +",";
            }
        }
        console.log(objHum)

        return(
            <div>
                <div className="graphs" >
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <h3>เลือกวันที่ ที่ต้องการดูข้อมูล</h3>
                            </div>
                            <div className='row'>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <input type="date" className="form-control" id="inputAddress2" placeholder="Time"
                                            name="date"
                                            onChange={this.handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <button type="submit" className="btn btn-primary">เรียกข้อมูล</button> 
                                </div>
                            </div>
                        </form>
                            <div className="row">
                                <div className="col-sm-6">
                                    {
                                        this.state.isLoaded?
                                        <div>
                                            <div className="alert alert-success">
                                                <strong>Success!</strong> การรับส่งข้อมูลสำเร็จ
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="alert alert-danger">
                                                <strong>Fail!</strong> เกิดข้อผิดพลาดในการรับ - ส่งข้อมูล
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="headerGraph">
                                        Temperature
                                    </div>
                                    <div className="RTgraph">
                                        <AreaChart data={objTemp}></AreaChart>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                <div className="headerGraph">
                                        Huminity
                                    </div>
                                    <div className="RTgraph">
                                        <AreaChart data={objHum}></AreaChart>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-sm-6">
                                        <div className="headerGraph">
                                            SOIL moisture
                                        </div>
                                        <div className="RTgraph">
                                            <AreaChart data={objSoil}></AreaChart>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="headerGraph">
                                            Carbon
                                        </div>
                                        <div className="RTgraph">
                                            <AreaChart data={objCo2}></AreaChart>
                                        </div>
                                    </div>
                            </div>
                            <br></br><br></br><br></br><br></br>
                        </div>
            </div>
            
        )
    }
}