import {
    arrayOf,
    bool,
    func,
    instanceOf,
    node,
    number,
    object,
    objectOf,
    oneOf,
    oneOfType,
    shape,
    string,
  } from 'prop-types';

const propTypes = {};

// Fixed value
propTypes.value = val => oneOf([val]);
propTypes.route = shape({
    name: string.isRequired,
    path: string.isRequired,
    exact: bool,
    strict: bool,
    component: oneOfType([object, func]).isRequired,
    loadData: func,
  });

  export { propTypes };