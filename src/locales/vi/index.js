import flatten from 'flat';
import common from './common.json';
import line from './line.json'
import userlist from './userlist.json';
const locale = {
  common: flatten(common, {
    delimiter: '_',
  }),
  userlist: flatten(userlist, {
    delimiter: '_',
  }),
  line: flatten(line, {
    delimiter: '_',
  }),
};
export default locale;
