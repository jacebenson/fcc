import React from 'react';
import ListItem from './ListItem';
const List = ({campers, currentView}) => {
    console.log('these are the ' + currentView + ' campers', campers);
    const Items = campers.map((camper, index) => {
        return <ListItem number={index+1} camper={camper} key={index} currentView={currentView} />;
    });
    return(
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6 screen">
            <div className="scores marquee col-sm-6" id="map">
            {Items}
            </div>
          </div>
          <div className="col-sm-3">
          </div>
        </div>
    )
}

export default List;