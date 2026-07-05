import React, { Component } from 'react';

import './Controls.css';

const Controls = ({onHome}) => {
  console.log(onHome);
    return (
      <div className="control container">
        <div className="row">
          <div className="col-md-12">
            <button type="button" className="btn btn-success">Create</button>
            <button type="button" className="btn btn-danger" onClick={() => onHome()}>Delete</button>
          </div>
        </div>
      </div>
    );
}

export default Controls;
