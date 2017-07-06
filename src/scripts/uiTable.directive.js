import angular from 'angular';

import moduleName from './uiTable.module';

var templateUrl = require('../views/uiTable.html');

angular
  .module(moduleName)
  .directive('bkTablescroll', [
    '$compile', bkTablescroll
  ]);

function bkTablescroll($compile) {
  'use strict';
  var directive = {
    restrict: 'A',
    replace: true,
    transclude: true,
    scope: {
      bkTablescroll: '=',
      bkTablescrollData: '=',
      bkViewMore: '@',
      bkHeight: '@',
      bkOnViewmore: '=',
      bkViewmoreDisabled: '=',
    },
    templateUrl: templateUrl,
    link: link
  };
  return directive;

  //////////////////

  function link(scope, element, attrs) {
    var numResultsToViewMore = 20;

    if (attrs.bkTablescroll && attrs.bkTablescroll.length !== 0 && !attrs.bkOnViewmore) {
      //Si indica una variable en bkTablescroll y no define viewmore utilizamos lo antiguo
      deprecatedActivation();
    }
    else {
      activate();
    }

    return;

    /////////

    function deprecatedActivation() {
      scope.isDisabled = deprecatedIsDisabled;

      scope.viewMore = deprecatedViewMore;

      scope.hideScroll = deprecatedHideScroll;

      scope.$watch('bkTablescroll', bkTablescrollChanged);
    }

    function bkTablescrollChanged(list) {
      configureDOM();

      if (list) {
        scope.results = scope.bkTablescroll.length;
      }

      if (!scope.bkTablescrollData) {
        scope.bkTablescrollData = {
          startResults: 1,
          finishResults: numResultsToViewMore
        };
      }
    }

    function deprecatedIsDisabled() {
      return !((scope.bkTablescrollData.finishResults < scope.results) && (scope.bkViewMore === 'true'));
    }

    function deprecatedViewMore() {
      scope.bkTablescrollData.finishResults = scope.bkTablescrollData.finishResults + numResultsToViewMore;
      scope.bkTablescrollData.startResults = 1;
    }

    function deprecatedHideScroll() {
      return !scope.bkHeight;
    }

    function configureDOM() {
     var $tablescroll = angular.element(element[0].querySelector('.tablescroll')),
          $thead = angular.element(element[0].querySelector('.tablescroll-head>thead')),
          $tfoot = angular.element(element[0].querySelector('.tablescroll-foot>tfoot'));
      if (scope.bkHeight) {
          $tablescroll.css('height', scope.bkHeight);
      }

      $thead.append($compile($tablescroll.find('thead').html())(scope.$parent));
      $tfoot.append($compile($tablescroll.find('tfoot').html())(scope.$parent));
    }

    function activate() {
      configureDOM();

      scope.isDisabled = isDisabled;

      scope.viewMore = scope.bkOnViewmore;

      scope.hideScroll = hideScroll;
    }

    function isDisabled() {
      return scope.bkViewmoreDisabled ? scope.bkViewmoreDisabled() : false;
    }

    function hideScroll() {
      return false;
    }
  }
}
