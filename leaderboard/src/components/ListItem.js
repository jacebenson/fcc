import React from 'react';

//const ListItem = (props) => {
const ListItem = ({camper, number, currentView}) => {
    //console.log(camper.username + '[' + currentView + ']: ' + camper[currentView])
    var url = 'https://freecodecamp.com/' + camper.username.toString();
    var name = camper.username.substring(0,10);
    return(
        <div className="row">
            <div className="position col-sm-3">{number}</div>
            <div className="name col-sm-6">
                <a href={url}>
                {name}
                </a>
            </div>
            <div className="points col-sm-3">{camper[currentView]}</div>
        </div>
    );
}

export default ListItem;