import controller from './tabla.controller';

const templateUrl = require('../tabla.html');

const transclude = true;
const controllerAs = 'vm';

const uiTable = {
  controller,
  templateUrl,
  transclude,
  controllerAs,
};

export default uiTable;
