import angular from 'angular';

class uiTableController {

    constructor($compile, $scope, attrs){
        'ngInject'
    const numResultsToViewMore = 20;
    this.attrs = attrs;
    this.$compile = $compile;
    this.$scope = $scope;
    link();
    }

    link() {

        if (this.attrs.bkTablescroll && this.attrs.bkTablescroll.length !== 0 && !this.attrs.bkOnViewmore) {
        //Si indica una variable en bkTablescroll y no define viewmore utilizamos lo antiguo
        deprecatedActivation();
        }
        else {
        activate();
        }
    }

    /////////

    deprecatedActivation() {
      scope.isDisabled = deprecatedIsDisabled;

      scope.viewMore = deprecatedViewMore;

      scope.hideScroll = deprecatedHideScroll;

      scope.$watch('bkTablescroll', bkTablescrollChanged);
    }

    bkTablescrollChanged(list) {
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

    deprecatedIsDisabled() {
      return !((scope.bkTablescrollData.finishResults < scope.results) && (scope.bkViewMore === 'true'));
    }

    deprecatedViewMore() {
      scope.bkTablescrollData.finishResults = scope.bkTablescrollData.finishResults + numResultsToViewMore;
      scope.bkTablescrollData.startResults = 1;
    }

    deprecatedHideScroll() {
      return !scope.bkHeight;
    }

    configureDOM() {
     var $tablescroll = angular.element(element[0].querySelector('.tablescroll')),
          $thead = angular.element(element[0].querySelector('.tablescroll-head>thead')),
          $tfoot = angular.element(element[0].querySelector('.tablescroll-foot>tfoot'));
      if (scope.bkHeight) {
          $tablescroll.css('height', scope.bkHeight);
      }

      $thead.append($compile($tablescroll.find('thead').html())(scope.$parent));
      $tfoot.append($compile($tablescroll.find('tfoot').html())(scope.$parent));
    }

    activate() {
      configureDOM();

      scope.isDisabled = isDisabled;

      scope.viewMore = scope.bkOnViewmore;

      scope.hideScroll = hideScroll;
    }

    isDisabled() {
      return scope.bkViewmoreDisabled ? scope.bkViewmoreDisabled() : false;
    }

    hideScroll() {
      return false;
    }
  }
}



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

  function link(scope, element, this.attrs) {
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

}