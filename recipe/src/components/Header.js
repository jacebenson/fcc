import React, { Component } from 'react';
import Search from './Search.js';
import Controls from './Controls.js';

const Header = ({onHome}) => {
  return (
    <div className="container App-header">
    <div className="row">
      <div className="col-md-12">
        <Controls
          onHome={onHome}
         />
      </div>
    </div>
  </div>
  );
}
export default Header;
