import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
const AboutPage = () =>
  <div>
    <h1>about page</h1>
    <p>สำหรับ ให้ข้อมูลเกี่ยวกับเว็บไซต์</p>
  </div>


export default compose(
  inject('userStore'),
  observer
)(AboutPage);