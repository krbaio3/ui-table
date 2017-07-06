import angular from 'angular';

import moduleName from './uiTable.module';

angular.module(moduleName)
  .filter('paginate', paginateFilter);

function paginateFilter() {
  'use strict';
  return function (list, tablescrollData) {
    var i;
    if (!Array.isArray(list) || !angular.isObject(tablescrollData)) {
      return list;
    }

    var out = [];
    for (i = tablescrollData.startResults - 1; i < tablescrollData.finishResults; i = i + 1) {
      if (list[i]) {
        out.push(list[i]);
      }
    }
    return out;
  };
}
