
const {exists} = require('./exists');

const get_value = (object, properties, empty_strings_are_ok) => {
  // checks object properties
  if (!exists(object, empty_strings_are_ok)) return false;

  let property_array = (properties.includes(".")) ? properties.split(".") : [properties];

  let response;

  try {
    response = property_array.reduce((result, prop, ndx, ary) => {
      result = result[prop];

      // console.log(`[obj_exists] result`, result);

      return result;
    }, object);

  } catch (e) {
    return false;
  }

  return response;
  // my other setData idea is to use root[property] = value
}

module.exports = { get_value }