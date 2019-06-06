import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';
import './index.css'


const Navigation = ({ sessionStore }) =>
  <div>
    { sessionStore.authUser
        ? <NavigationAuth  user = {sessionStore.authUser.email} uid = {sessionStore.authUser.uid}/>
        : <NavigationNonAuth />
    }
  </div>

class NavigationAuth extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user:this.props.user,
      uid:this.props.uid,
    }
  }
  render(){
    return(
    <div>
        <nav className="navbar navbar-custom">
          <div className="container-fluid">
          <div className="navbar-header">
              <a className="navbar-brand" href="/"><img src={'../../images/UseLogo.png'} alt="logo"></img></a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href={routes.ADMIN}><span className="glyphicon glyphicon-cog"></span> ผู้ดูแลระบบ</a></li>
              <li><a href={routes.HOME}>หน้าหลัก</a></li>
              <li><a href={routes.ABOUT}>เกี่ยวกับเรา</a></li>
              <li><a href={routes.CONTACTUS}>ติดต่อเจ้าหน้าที่</a></li>
              <li><button className="logoutBtn" type="button" onClick={auth.doSignOut}><span className="glyphicon glyphicon-off"></span> ออกจากระบบ</button></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

class NavigationNonAuth extends React.Component {
  render(){
    return(
      <div>
        {/*
        <div className="imgcarousel" style = {{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url(../images/testImg.jpg)" }}>
          <div className='gridCarousel'>
            <div>
              <img className="LogoImgAtTop" src={'../images/kku-logo-notext.png'} alt='logo'/>
              <img className="LogoImgAtTop" src={'../images/en-logo.png'} alt='logo'/>
              <img className="LogoImgAtTop" src={'../images/ag-logo.png'} alt='logo'/>
            </div> 
          </div>
        </div>*/
        }
        <nav className="navbar navbar-custom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="/"><img src={'../../images/UseLogo.png'} alt="logo"></img></a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li className="active"><a href="/">หน้าหลัก</a></li>
              <li><a href="/about">เกี่ยวกับเรา</a></li>
              <li><a href="/contactus">ติดต่อเจ้าหน้าที่</a></li>
              <li><a href="/signin"><span className="glyphicon glyphicon-user"></span> เข้าสู่ระบบ</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default compose(
  inject('sessionStore'),
  observer
)(Navigation);
