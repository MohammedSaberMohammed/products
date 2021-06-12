/* eslint-disable import/no-anonymous-default-export */
import isObject from 'lodash/isObject';
import Immutable from 'seamless-immutable';

export default data => isObject(data) ? Immutable.asMutable(data || {}, { deep: true }) : data;
