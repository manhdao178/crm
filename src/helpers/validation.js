import { isEmpty } from 'lodash';
import moment from 'moment';

export const checkHeadNumber = (value) => {
  if (isNaN(value)) return false;
  // const headerArray = [
  //   '0564',
  //   '0563',
  //   '0584',
  //   '0585',
  //   '0586',
  //   '0587',
  //   '0588',
  //   '0589',
  //   '0583',
  //   '0565',
  //   '0566',
  //   '0567',
  //   '0568',
  //   '0569',
  //   '0582',
  //   '0592',
  //   '0593',
  //   '0598',
  //   '0599',
  //   '039',
  //   '038',
  //   '037',
  //   '036',
  //   '035',
  //   '034',
  //   '033',
  //   '032',
  //   '070',
  //   '079',
  //   '077',
  //   '076',
  //   '078',
  //   '085',
  //   '084',
  //   '083',
  //   '082',
  //   '081',
  //   '090',
  //   '091',
  //   '092',
  //   '093',
  //   '094',
  //   '095',
  //   '096',
  //   '097',
  //   '098',
  //   '099',
  //   '083',
  //   '086',
  //   '088',
  //   '089',
  // ];

  // let isInclude = false;

  // const firstThree = value?.substring(0, 3) || '';
  // const firstFouth = value?.substring(0, 4) || '';

  // isInclude = headerArray.includes(firstThree) || headerArray.includes(firstFouth);
  return true;
};

export const checkDobFormat = (value) => {
  const split = moment(value).format('DD/MM/YYYY').split('/');
  const day = parseInt(split[0], 10);
  const month = parseInt(split[1], 10);
  const year = parseInt(split[2], 10);

  if (moment([+year, +month - 1, +day]).format() === 'Invalid date') return false;
  return true;
};

export const checkProjectHasBranches = (values) => {
  const newValues = values.filter((value) => {
    if (value.isOwned && isEmpty(value.branches)) return value;
  });

  return newValues.length > 0;
};

export const filterChangedField = (values, initialValues) => {
  const newValues = {};
  Object.keys(values).forEach((key) => {
    if (values[key] !== initialValues[key]) {
      newValues[key] = values[key];
    }
  });
  return newValues;
};
