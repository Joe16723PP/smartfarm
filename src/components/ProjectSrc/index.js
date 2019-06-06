import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { compose } from 'recompose';
const ProjectSrcPage = () =>
  <div>
    <h1>ProjectSrc Page</h1>
    <p>สให้ข้อมูลเกี่ยวกับโปรเจค</p>
  </div>
export default compose(
  inject('userStore'),
  observer
)(ProjectSrcPage);