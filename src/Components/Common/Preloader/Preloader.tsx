import React from 'react';
import preloader from "../../../assets/loading.gif";

const Preloader = () => {
    return (
        <img src={preloader}
             alt="loading"
             style={{width: '50%', margin: '0 auto'}}/>
    );
};

export default Preloader;