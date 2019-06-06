import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
class AddFarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        farmId : '',
        farmName : '',
        farmType : '',
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
      fetch("https://smapi.kku.ac.th/insertFarm", 
        {
            method : 'post',
            headers: {
            'Accept' : 'application/json',
            'Content-Type':'application/json'},
            body : JSON.stringify({
            farmId : this.state.farmId,
            farmName : this.state.farmName,
            farmType : this.state.farmType,
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
                <h1>AddFarm</h1>
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
                            <label for="inputAddress2">Farm Type</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="IONIC Farm "
                                name="farmType"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Farm Name</label>
                            <input type="text" className="form-control" id="inputAddress2" placeholder="SmartFarm 1"
                                name="farmName"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label for="inputAddress2">Added Date</label>
                            <input type="date" className="form-control" id="inputAddress2" placeholder="Time"
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
)(AddFarm);