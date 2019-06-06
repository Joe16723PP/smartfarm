import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
const ContactPage = () =>
  <div>
    <h1>Contact Page</h1>
    <p>สำหรับการติดต่อกับเจ้าหน้าที่</p>
  </div>
export default compose(
  inject('userStore'),
  observer
)(ContactPage);