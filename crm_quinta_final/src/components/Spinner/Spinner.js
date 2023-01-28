import React from 'react';
import spinnerImg from "../../assets/img/loading.gif";


let Spinner = () => {
    return (
        <React.Fragment>
            <img src={spinnerImg} className="d-block m-auto" style={{widht: '200px'}}></img>
        </React.Fragment>
    )
};

export default Spinner