import React from 'react';

import "./error.css"


import ground from "./../../images/ground.png"

const Error404 = () => {
return(<div className="error404">

  <div className="scene">
    <div className="error-ground" />
    <div className="ground" />
    <div className="mushrooms" style={{right:'160px'}}/>
    <div className="mushrooms" style={{right:'130px'}}/>
    <div className="mario" />
    <div className="chance" />
    <div className="brick" />
    <div className="mushrooms-up" />
    <div className="text-404" >
      W tej chwili nie ma taiej strony.
      Przejdź do strony głównej.
    </div>
  </div>
</div>)
};

export default Error404;