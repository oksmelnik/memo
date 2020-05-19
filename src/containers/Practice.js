import React, { useState, useEffect } from 'react';
import { Route, withRouter } from 'react-router-dom';

const Practice = (props) => {
console.log(props.match.params)
  return <div>{props.pairs} words to pracrice</div>
}

export default withRouter(Practice)
