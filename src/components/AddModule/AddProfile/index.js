import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
import withAuthorization from '../../Session/withAuthorization';
import '../index.css';
class AddProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plantType :'',
            profileName : '',
            range1_1 : '',
            range1_2 : '',
            range2_1 : '',
            range2_2 : '',
            range3_1 : '',
            range3_2 : '',
            range4_1 : '',
            range4_2 : '',
            range5_1 : '',
            range5_2 : '',
            EC1 : '',
            PH1 : '',
            EC2 : '',
            PH2 : '',
            EC3 : '',
            PH3 : '',
            EC4 : '',
            PH4 : '',
            EC5 : '',
            PH5 : '',
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
        fetch("http://api.alphaenthailand.com/update/student", 
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
                <h1>AddProfile</h1>
                    <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                            <label for="inputAddress">Plant Type</label>
                            <select name="plantType" className="form-control" onChange={this.handleChange}>
                                <option value="N/A">Please select</option>
                                <option value="Type1">ชนิดพืช 1</option>
                                <option value="Type2">ชนิดพืช 2</option>
                                <option value="Type3">ชนิดพืช 3</option>
                                <option value="Type4">ชนิดพืช 4</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for="inputAddress">Plant Profile Name</label>
                            <input type="text" className="form-control" id="inputAddress"                        
                                name="profileName"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <label for="inputAddress2">Range 1</label>
                        <div className="form-inline">
                            <input type="number" className="form-control" id="inputECnPH" placeholder="เริ่มต้น"                        
                                name="range1_1"
                                onChange={this.handleChange}
                                required
                            />
                            <span id="dash">-</span>
                            <input type="number" className="form-control" id="inputECnPH" placeholder="สิ้นสุด"                        
                                name="range1_2"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter EC"                        
                                name="EC1"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter PH"                        
                                name="PH1"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <label for="inputAddress2">Range 2</label>
                        <div className="form-inline">
                        <input type="number" className="form-control" id="inputECnPH" placeholder="เริ่มต้น"                        
                                name="range2_1"
                                onChange={this.handleChange}
                                required
                            />
                            <span id="dash">-</span>
                            <input type="number" className="form-control" id="inputECnPH" placeholder="สิ้นสุด"                        
                                name="range2_2"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter EC"                        
                                name="EC1"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter PH"                        
                                name="PH1"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <label for="inputAddress2">Range 3</label>
                        <div className="form-inline">
                        <input type="number" className="form-control" id="inputECnPH" placeholder="เริ่มต้น"                        
                                name="range3_1"
                                onChange={this.handleChange}
                                required
                            />
                            <span id="dash">-</span>
                            <input type="number" className="form-control" id="inputECnPH" placeholder="สิ้นสุด"                        
                                name="range3_2"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter EC"                        
                                name="EC1"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter PH"                        
                                name="PH1"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <label for="inputAddress2">Range 4</label>
                        <div className="form-inline">
                        <input type="number" className="form-control" id="inputECnPH" placeholder="เริ่มต้น"                        
                                name="range4_1"
                                onChange={this.handleChange}
                                required
                            />
                            <span id="dash">-</span>
                            <input type="number" className="form-control" id="inputECnPH" placeholder="สิ้นสุด"                        
                                name="range4_2"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter EC"                        
                                name="EC1"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter PH"                        
                                name="PH1"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <label for="inputAddress2">Range 5</label>
                        <div className="form-inline">
                        <input type="number" className="form-control" id="inputECnPH" placeholder="เริ่มต้น"                        
                                name="range5_1"
                                onChange={this.handleChange}
                                required
                            />
                            <span id="dash">-</span>
                            <input type="number" className="form-control" id="inputECnPH" placeholder="สิ้นสุด"                        
                                name="range5_2"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter EC"                        
                                name="EC1"
                                onChange={this.handleChange}
                                required
                            />
                            <input type="number" className="form-control" id="inputECnPH" placeholder="Enter PH"                        
                                name="PH1"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <br></br>
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
)(AddProfile);