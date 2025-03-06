import _ from 'lodash';

export const filterObj = (object) => {
  return _.omitBy(object, _.isUndefined);
};
