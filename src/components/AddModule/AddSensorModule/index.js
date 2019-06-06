import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
class AddSensorModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleType :'',
            moduleId : '',
            moduleName : '',
            moduleDetail : '',
            addedTime : '',
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
        var sensorModuleId = this.state.moduleType + this.state.moduleId
        fetch("https://smapi.kku.ac.th/addSensorModule", 
          {
              method : 'post',
              headers: {
              'Accept' : 'application/json',
              'Content-Type':'application/json'},
              body : JSON.stringify({
              ModuleId : sensorModuleId,
              moduleName : this.state.moduleName,
              moduleDetail : this.state.moduleDetail,
              addedTime : this.state.addedTime,
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
                <h1>AddSensorModule</h1>
                <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label for="inputAddress">Module Type</label>
                            <select name="moduleType" className="form-control" onChange={this.handleChange}>
                                <option value="N/A">Please select</option>
                                <option value="WND">Wind</option>
                                <option value="TMP">Temperature</option>
                                <option value="HUM">Humidity</option>
                                <option value="LIGHT">Light</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="inputAddress">Module ID</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="01234"                        
                                name="moduleId"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Module Name</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="Wind , Humidity"                        
                                name="moduleName"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Module Detail</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="detail"                        
                                name="moduleDetail"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Added Time</label>
                            <input type="date" className="form-control" id="inputAddress2" placeholder="add table"                        
                                name="addedTime"
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
)(AddSensorModule);