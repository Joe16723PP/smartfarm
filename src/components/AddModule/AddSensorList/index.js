import React from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
// import Checkbox from 'rc-checkbox';
// import 'rc-checkbox/assets/index.css';

class AddSensorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sensor_num : '',
        sensor_type: '',
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
  }


  handleSubmit (evt) {

      fetch("https://smapi.kku.ac.th/addsensor_list", 
        {
            method : 'post',
            headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
            body : JSON.stringify({
            sensor_id : this.state.sensor_num,
            sensor_name : this.state.sensor_type,
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
            alert("succesfully")
            },
            (error) => {
            this.setState({
                isLoaded: true,
                error
            });
            alert(error)
            }
        )
        evt.preventDefault();
    }

    render() {
      return(
          <div className="bgCard">
                <div className="mainCard">
                <h1>AddSensorList</h1>
                {/* <form onSubmit={this.handleSubmit}> */}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                            <label for="inputAddress">Sensor Number</label>
                            <input type="number" min="0" step="1" className="form-control" id="inputAddress" placeholder="Hint : unsigned int"
                                name="sensor_num"
                                onChange={this.handleChange}
                                required
                            />
                            <br></br>

                            <div className="form-group">
                                <label for="inputAddress">Sensor Type</label>
                                <select name="sensor_type" className="form-control" onChange={this.handleChange}>
                                    <option value="N/A">Please select</option>
                                    <option value="Soil_moisture">Soil moisture</option>
                                    <option value="Humidity">Humidity</option>
                                    <option value="Temperature">Temperature</option>
                                    <option value="Co2">Co2</option>
                                    <option value="Wind">Wind</option>
                                    <option value="Brightness">Brightness</option>
                                    <option value="EC">EC</option>
                                    <option value="PH">PH</option>
                                    <option value="O2">O2</option>
                                    <option value="RGB">RGB</option>
                                </select>
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
)(AddSensorList);