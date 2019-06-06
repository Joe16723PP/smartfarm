import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
class AddSensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorId : '',
            sensorName : '',
            sensorDetail : '',
            sensorTable : '',
            afterFetch : '',
            isLoaded : false,
         };
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
      }
      handleSubmit (evt) {
        fetch("https://smapi.kku.ac.th/insertSensor", 
          {
              method : 'post',
              headers: {
              'Accept' : 'application/json',
              'Content-Type':'application/json'},
              body : JSON.stringify({
              sensorId : this.state.sensorId,
              sensorName : this.state.sensorName,
              sensorDetail : this.state.sensorDetail,
              sensorTable : this.state.sensorTable,
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
              alert(result)
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
                <h1>AddSensor</h1>
                <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputAddress">Sensor ID</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="WND , TMP"                        
                                name="sensorId"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Sensor Name</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Wind , Humidity" 
                                name="sensorName"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Sensor Detail</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="detail"                        
                                name="sensorDetail"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        {/**
                        <div className="form-group">
                            <label for="inputAddress2">Sensor Table</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="add table"                        
                                name="sensorTable"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        */}
                        <div className="form-group">
                            <label for="inputAddress2">Sensor Table</label>
                            <select name="plantType" className="form-control" onChange={this.handleChange}>
                                <option value="N/A">Please sensor table</option>
                                <option value="sensor_carbon">carbon</option>
                                <option value="sensor_huminity">huminity</option>
                                <option value="sensor_soil">soil</option>
                                <option value="sensor_temperature">temperature</option>
                            </select>
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
)(AddSensor);