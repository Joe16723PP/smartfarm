import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
// import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import checkboxes from './checkboxs';
import Checkbox from './CheckBox';

var array = Array(10).fill("0");

class AddSensorNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sensor_mac : '',
        checkedItems: new Map(),
        isLoaded : false,
     };
     this.handleChange = this.handleChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.handleCheckbox = this.handleCheckbox.bind(this);
  }
  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleCheckbox(e){
    var value = 0
    if (e.target.checked === false ) {
        value = "0"
    } else {
        value = "1"
    }
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    // console.log(item , isChecked);
    array[item] = value;
    console.log(array[item]);
    
  }


  handleSubmit (evt) {
      var str_sensor = "";
      for (var i = 0; i < array.length;i++){
        str_sensor += array[i]
      }
      var hexa_sensor_val = parseInt(str_sensor, 2).toString(16).toUpperCase();
      var str_hex = hexa_sensor_val.toString();
        console.log(str_hex + " : " + this.state.sensor_mac);
      
      fetch("https://smapi.kku.ac.th/addsensor_node", 
        {
            method : 'post',
            headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
            body : JSON.stringify({
            mac_id : this.state.sensor_mac,
            sensor : str_hex,
            })
        })
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                isLoaded: true,
                initinfoStatus : true,
                afterFetch : result.Data,
            });
            // alert("succesfully")
            },
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            alert(error)
            },
        ).catch(rejected => {
            console.log(rejected);
        });

        evt.preventDefault();
    }

    render() {
      return(
          <div className="bgCard">
                <div className="mainCard">
                <h1>AddSensorNode</h1>
                {/* <form onSubmit={this.handleSubmit}> */}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                            <label for="inputAddress">Sensor Mac Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="Hint : 123455677"
                                name="sensor_mac"
                                onChange={this.handleChange}
                                required
                            />
                            <br></br>
                            <div className="checkbox_group">
                            {
                            checkboxes.map(item => (
                                <p>
                                <label key={item.key}>
                                    <Checkbox name={item.name} checked={this.state.checkedItems.get(item.name)} onChange={this.handleCheckbox} />
                                    &nbsp; {item.key} 
                                </label>
                                </p>
                            ))
                            }                        
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Send</button>
                        </form>
                </div>
        </div>
      );
    }
}

  
const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  inject('userStore'),
  observer
)(AddSensorNode);