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
ReactChartkick.addAdapter(Chart);
const onStatus = {
    backgroundColor: "#E1FFBE",
  };
const offStatus = {
    backgroundColor: "#E1FFBE",
  };

class Control_Farm_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        fan : '',
        valve : '',
        air : '',
        led : '',
        lvAir : "_l1",
        tempAir : "_23",
        testBtn : true,
     };
     this.handleChange = this.handleChange.bind(this);
     this.sendAirOn = this.sendAirOn.bind(this);
     this.testBtn = this.testBtn.bind(this);
    }
    testBtn (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
        //alert(evt.target.name + " : " + evt.target.value);
        console.log(evt.target.value + " : " + this.state.testBtn)
    }

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }
    sendAirOn (evt) {
        var value = "on" + this.state.tempAir + this.state.lvAir;
        var cmd = "remote"
        fetch("https://smapi.kku.ac.th/mqttair", 
        {
          method : 'post',
          headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
          body : JSON.stringify({
            cmd : cmd,
            value : value,
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
        evt.preventDefault();
        window.setTimeout(() => this.callInitVal(), 200);
    }
    sendAirOff(cmd ,value) {
        fetch("https://smapi.kku.ac.th/mqttair", 
        {
          method : 'post',
          headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
          body : JSON.stringify({
            cmd : cmd,
            value : value,
          })
        })
        .then(res => res.json())
        .then(
        //   (result) => {
        //     this.setState({
        //       data: result.Data
        //     });
        //   },
        //   (error) => {
        //     this.setState({
        //       error
        //     });
        //   }
        //this.callInitVal()
        )
        window.setTimeout(() => this.callInitVal(), 200);
        //window.location.reload(true);

    }

    componentDidMount() {
       this.callInitVal(); 
    }

    callInitVal(){
        fetch("https://smapi.kku.ac.th/getstatuscontroller")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              fan : result.Data[0].status,
              valve : result.Data[1].status,
              air : result.Data[2].status,
              led : result.Data[3].status,
              data : ""
            });
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
    }

    sendControlCmd(cmd,value,index){
        var subCmd = value.substr(index,1);
        var strStatus;
        if (cmd === "led") {
            strStatus = "xxxxxxx";
        } else if (cmd === "fan") {
            strStatus = "xxxx"
        } else if (cmd === "valve") {
            strStatus = "x"
        } else if (cmd === "supply") {
            strStatus = "x"
        }
        if (subCmd === "0") {
            if (index === 7 && cmd === "led" ) {
                strStatus = "1111111";
                alert("hi")
            }else {
                strStatus = strStatus.substr(0, index) + '1' + strStatus.substr(index + 1);
            }
        }else if (subCmd === "1") {
            if (index === 7 && cmd === "led" ) {
                strStatus = "0000000";
                alert("hi 2")
            }else {
                strStatus = strStatus.substr(0, index) + '0' + strStatus.substr(index + 1);
            }
        } 
        fetch("https://smapi.kku.ac.th/mqtt", 
        {
          method : 'post',
          headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
          body : JSON.stringify({
            cmd : cmd,
            value : strStatus,
          })
        })
        .then(res => res.json())
        .then(
        //   (result) => {
        //     this.setState({
        //       data: result.Data
        //     });
        //   },
        //   (error) => {
        //     this.setState({
        //       error
        //     });
        //   }
        //this.callInitVal() 
        )
        window.setTimeout(() => this.callInitVal(), 200);
        //window.location.reload(true);
    }
    sendCmdAllLed(cmd , value) {
        var pos_1 = value.search("1");
        var strStatus;
        if (pos_1 >= 0) {
            strStatus = "0000000"
        } else {
            strStatus = "1111111"
        }
        fetch("https://smapi.kku.ac.th/mqttallled", 
        {
          method : 'post',
          headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
          body : JSON.stringify({
            cmd : cmd,
            value : strStatus,
          })
        })
        .then(res => res.json())
        .then(
            //this.callInitVal() 
        )
        window.setTimeout(() => this.callInitVal(), 200);
        //this.callInitVal(); 
        //window.location.reload(true);

    }

    render() {
        var tmp_fan = this.state.fan;
        var tmp_led = this.state.led;
        var tmp_valve = this.state.valve;
        var tmp_air = this.state.air;

        // valve
        if (tmp_valve === "0") {
            var num_valve = "ปิด"
        } else {
            var num_valve = "เปิด"
        }

        // led
        if (tmp_led.substr(0,1) === "0") {
            var num_led_1 = "ปิด"
        } else if (tmp_led.substr(0,1) === "1") {
            var num_led_1 = "เปิด"
        }
        if (tmp_led.substr(1,1) === "0") {
            var num_led_2 = "ปิด"
        } else if (tmp_led.substr(1,1) === "1") {
            var num_led_2 = "เปิด"
        }
        if (tmp_led.substr(2,1) === "0") {
            var num_led_3 = "ปิด"
        } else if (tmp_led.substr(2,1) === "1") {
            var num_led_3 = "เปิด"
        }
        if (tmp_led.substr(3,1) === "0") {
            var num_led_4 = "ปิด"
        } else if (tmp_led.substr(3,1) === "1") {
            var num_led_4 = "เปิด"
        }
        if (tmp_led.substr(4,1) === "0") {
            var num_led_5 = "ปิด"
        } else if (tmp_led.substr(4,1) === "1") {
            var num_led_5 = "เปิด"
        }
        if (tmp_led.substr(5,1) === "0") {
            var num_led_6 = "ปิด"
        } else if (tmp_led.substr(5,1) === "1") {
            var num_led_6 = "เปิด"
        }
        if (tmp_led.substr(6,1) === "0") {
            var num_led_7 = "ปิด"
        } else if (tmp_led.substr(6,1) === "1") {
            var num_led_7 = "เปิด"
        }
        
        if (tmp_led.search("1") >= 0) {
            var num_led_all = "เปิด"
        } else {
            var num_led_all = "ปิด"
        }

        // fan 
        if (tmp_fan.substr(0,1) === "0") {
            var num_fan_1 = "ปิด"
        } else if (tmp_fan.substr(0,1) === "1") {
            var num_fan_1 = "เปิด"
        }
        if (tmp_fan.substr(1,1) === "0") {
            var num_fan_2 = "ปิด"
        } else if (tmp_fan.substr(1,1) === "1") {
            var num_fan_2 = "เปิด"
        }
        if (tmp_fan.substr(2,1) === "0") {
            var num_fan_3 = "ปิด"
        } else if (tmp_fan.substr(2,1) === "1") {
            var num_fan_3 = "เปิด"
        }
        if (tmp_fan.substr(3,1) === "0") {
            var num_fan_4 = "ปิด"
        } else if (tmp_fan.substr(3,1) === "1") {
            var num_fan_4 = "เปิด"
        }

      return(
        <div className="farmPage">
            <div className="controller">
                <div className="card_controller">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="row">
                            <button className="controlBtn" onClick={() => this.sendControlCmd("valve",tmp_valve,0)}>
                                <div className="col-sm-2">
                                    <img src={'./images/drop.png'} alt="logo"></img>
                                </div>
                                <div className="col-sm-10">
                                    <h4>ปั๊มน้ำ</h4>
                                    <h6>สถานะ : {num_valve}</h6>
                                    <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                </div>
                            </button>
                        </div>
                        <div className="row">
                        <br></br>
                            <div className="col-sm-6">
                                <div className="card_cntl_btn">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <img src={'./images/air-conditioner.png'} alt="logo"></img>
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="textHeadControl">
                                                <h4>เครื่องปรับอากาศ</h4>
                                                <h6>สถานะ : {this.state.air}</h6>
                                            </div>
                                            <form onSubmit={this.sendAirOn}>
                                                <h5>ความแรงพัดลมเครื่อง</h5>
                                                <select name="lvAir" className="form-control" onChange={this.handleChange}>
                                                    <option value="_l1">ระดับ 1</option>
                                                    <option value="_l2">ระดับ 2</option>
                                                    <option value="_l3">ระดับ 3</option>
                                                    <option value="_l4">ระดับ 4</option>
                                                </select>
                                                <h5>อุณหภูมิเครื่อง</h5>
                                                <select name="tempAir" className="form-control" onChange={this.handleChange}>
                                                    <option value="_23">23 องศา</option>
                                                    <option value="_24">24 องศา</option>
                                                    <option value="_25">25 องศา</option>
                                                    <option value="_26">26 องศา</option>
                                                    <option value="_27">27 องศา</option>
                                                </select>
                                                <br></br>
                                                <button type="submit" className="btn btn-success">ส่งคำสั่ง</button>
                                            </form>
                                                <br></br>
                                                <button className="btn btn-danger" onClick={() => this.sendAirOff("remote" ,"air_off")}>ปิดเครื่องปรับอากาศ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                            <div className="row">
                                <div className="card_cntl_btn">
                                    <div className="row">
                                        <div className="col-sm-12">
                                        <div className="textHeadControl">
                                        <div className="row">
                                                <div className="col-sm-2"></div>
                                                <div className="col-sm-10">
                                                    <h4>พัดลม</h4>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    <button className="controlBtn"  onClick={() => this.sendControlCmd("fan",tmp_fan,0)}>
                                        <div className="col-sm-3">
                                            <img src={'./images/fan.png'} alt="logo"></img>
                                        </div>
                                        <div className="col-sm-9">
                                            <h4>พัดลม 1</h4>
                                            <h6>สถานะ : {num_fan_1}</h6>
                                            <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                        </div>
                                    </button>
                                    <button className="controlBtn" onClick={() => this.sendControlCmd("fan",tmp_fan,1)}>
                                        <div className="col-sm-3">
                                            <img src={'./images/fan.png'} alt="logo"></img>
                                        </div>
                                        <div className="col-sm-9">
                                            <h4>พัดลม 2</h4>
                                            <h6>สถานะ : {num_fan_2}</h6>
                                            <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                        </div>
                                    </button>
                                    <button className="controlBtn" onClick={() => this.sendControlCmd("fan",tmp_fan,2)}>
                                        <div className="col-sm-3">
                                            <img src={'./images/fan.png'} alt="logo"></img>
                                        </div>
                                        <div className="col-sm-9">
                                            <h4>พัดลม 3</h4>
                                            <h6>สถานะ : {num_fan_3}</h6>
                                            <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                        </div>
                                    </button>
                                    <button className="controlBtn" onClick={() => this.sendControlCmd("fan",tmp_fan,3)}>
                                        <div className="col-sm-3">
                                            <img src={'./images/fan.png'} alt="logo"></img>
                                        </div>
                                        <div className="col-sm-9">
                                            <h4>พัดลม 4</h4>
                                            <h6>สถานะ : {num_fan_4}</h6>
                                            <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                        </div>
                                    </button>
                                    {/* <button type="submit" className="controlBtn" name="testBtn" onClick={this.testBtn}>
                                        <div className="col-sm-3">
                                            <img src={'./images/fan.png'} alt="logo"></img>
                                        </div>
                                        <div className="col-sm-9">
                                            <h4>พัดลม 4</h4>
                                            <h6>{this.state.testBtn}</h6>
                                        </div>
                                    </button> */}
                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-5">                        
                                <div className="row">
                                <button className="controlBtn" onClick={() => alert("no function !")}>
                                        <div className="col-sm-2">
                                            <img src={'./images/green-energy.png'} alt="logo"></img>
                                        </div>
                                        <div className="col-sm-10">
                                            <h4>ไฟเลี้ยงเซนเซอร์</h4>
                                            <h6>ยังไม่ได้ติดตั้ง</h6>
                                        </div>
                                    </button>
                                </div>
                                <br></br>
                        <div className="row">
                            <div className="card_cntl_btn">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="textHeadControl">
                                            <div className="row">
                                                <div className="col-sm-1"></div>
                                                <div className="col-sm-11">
                                                    <h4>หลอดไฟ</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <button className="controlBtn" onClick={() => this.sendControlCmd("led",tmp_led,0)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>หลอดไฟ 1</h4>
                                                <h6>สถานะ : {num_led_1}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                        <button className="controlBtn" onClick={() => this.sendControlCmd("led",tmp_led,1)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>หลอดไฟ 2</h4>
                                                <h6>สถานะ : {num_led_2}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                        <button className="controlBtn" onClick={() => this.sendControlCmd("led",tmp_led,2)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>หลอดไฟ 3</h4>
                                                <h6>สถานะ : {num_led_3}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                        <button className="controlBtn" onClick={() => this.sendControlCmd("led",tmp_led,3)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>หลอดไฟ 4</h4>
                                                <h6>สถานะ : {num_led_4}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                </div>
                                <div className="col-sm-6">
                                        <button className="controlBtn" onClick={() => this.sendControlCmd("led",tmp_led,4)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>หลอดไฟ 5</h4>
                                                <h6>สถานะ : {num_led_5}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                        <button className="controlBtn" onClick={() => this.sendControlCmd("led",tmp_led,5)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>หลอดไฟ 6</h4>
                                                <h6>สถานะ : {num_led_6}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                        <button className="controlBtn" onClick={() => this.sendControlCmd("led",tmp_led,6)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h4>หลอดไฟ 7</h4>
                                                <h6>สถานะ : {num_led_7}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                        <button className="controlBtn" onClick={() => this.sendCmdAllLed("led",tmp_led)}>
                                            <div className="col-sm-3">
                                                <img src={'./images/idea.png'} alt="logo"></img>
                                            </div>
                                            <div className="col-sm-9">
                                                <h5>ควบคุมหลอดไฟทั้งหมด</h5>
                                                <h6>สถานะ : {num_led_all}</h6>
                                                <h6>คลิกเพื่อเปิดหรือปิด</h6>
                                            </div>
                                        </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
)(Control_Farm_1);