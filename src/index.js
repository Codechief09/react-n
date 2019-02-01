const React = require('react');
const { ReactNComponent, ReactNPureComponent } = require('./components');
const ReactN = require('./decorator');
const {
  addReducer, getGlobal, resetGlobal, setGlobal, useGlobal, withGlobal
} = require('./helpers/index');

Object.assign(ReactN, React, {
  addReducer,
  Component: ReactNComponent,
  default: ReactN,
  getGlobal,
  PureComponent: ReactNPureComponent,
  resetGlobal,
  setGlobal,
  useGlobal,
  withGlobal
});

module.exports = ReactN;
