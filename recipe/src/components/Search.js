import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className="search">
          <input 
            type="text" 
            className="form-control" 
            placeholder="" 
            aria-label="" 
            aria-describedby="basic-addon1"
          />
      </div>
    );
  }
}

export default Search;
