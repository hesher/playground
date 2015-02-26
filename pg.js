/*jslint unparam: true, browser: true */
/*globals angular, Cell, alert*/

angular.module('playground', [])
.controller('test', function ($scope) {
  $scope.peopleForTeam = ['randy'];
  $scope.peopleForDinner = [];
  $scope.options = [{
    name: 'John C.',
    val: 'john'
  }, {
    name: 'Randy B.',
    val: 'randy'
  }];

})
.directive('nSelect', function () {

  return {
    require: '?ngModel',
    restrict: 'E',
    scope: {
      opts: '='
    },
    link: function (scope, elm, attr, ngModel) {
      scope.result = {};
      ngModel.$render =  function () {
        var modelValue = ngModel.$modelValue || [];
        scope.result = modelValue.reduce(function (acc, curr) {
          acc[curr] = true;
          return acc;
        }, {});
      };

      function update() {
        var res = Object.keys(scope.result).filter(function (key) {
          return scope.result[key] === true;
        });
        ngModel.$setViewValue(res);
      }
      scope.updateModel = function () {
        scope.$evalAsync(update);
      };

      // update();
    },
    templateUrl: 'n-select.html'
  };
})
.directive('serverModel', function () {
  return {
    restrict: 'A',
    link: function (scope, elm, attrs) {
      scope.$watch(attrs.ngModel, function (newValue) {
        console.log(attrs.serverModel + ' Changed to ' + newValue);
      });
    }
  };
});
