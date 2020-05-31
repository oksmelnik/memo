import React from 'react';
import { withRouter } from 'react-router-dom';

const Practice = (props) => {
  return <div>{props.pairs} words to pracrice</div>
}

export default withRouter(Practice)
