import React from 'react';
import {testaaa} from '../../util/api'

export const LandingPageComponent = props => {

  testaaa({id:null})
 .then(response=>console.log(response))

  return (
    <div>
        ciao
    </div>
  );
};

LandingPageComponent.propTypes = {
  
};


const LandingPage = LandingPageComponent;

export default LandingPage;