import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
class AddFarmSensor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            farmId :'',
            moduleId : '',
            setupLocation : '',
            setupTime : '',
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
        fetch("https://smapi.kku.ac.th/addFarmSensor", 
          {
              method : 'post',
              headers: {
              'Accept' : 'application/json',
              'Content-Type':'application/json'},
              body : JSON.stringify({
              farmId : this.state.farmId,
              moduleId : this.state.moduleId,
              setupLocation : this.state.setupLocation,
              setupTime : this.state.setupTime,
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
                <h1>AddFarmSensor</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputAddress">Farm ID</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="123456789"
                                name="farmId"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Module ID</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="987654321"                        
                                name="moduleId"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Setup Location</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="SmartFarm 1"                        
                                name="setupLocation"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Setup Time</label>
                            <input type="date" className="form-control" id="inputAddress2" placeholder="Time"                        
                                name="setupTime"
                                onChange={this.handleChange}
                                required
                            />
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
)(AddFarmSensor);