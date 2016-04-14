(function(window, angular, undefined) {
  'use strict';
  angular.module('ngInputMask', []).
  directive('inputmask', function() {
    return {
      restrict: 'E',
      scope: {
        linkname: '=isbnLink',
        formatData: '=isbnFormat'
      },
      template: '<input type="text" placeholder="ISBN" class="form-control" ng-keyup="keyup($event)">',
      replace: true,
      link: function($scope, element, attr, ctrl) {
        $scope.dom = element[0];
        $scope.format = $scope.formatData.replace(/9/g, "_").split("");
        $scope.dom.value = $scope.tostr($scope.format);
      },
      controller: function($scope) {
        //$scope.value = $scope.format;
        $scope.keyup = function(e) {
          var trueValue = $scope.dom.value.replace(/[_-]/g, "");
          var valueList = trueValue.split('');
          var i = 0;
          var newForamt = [];
          _.each($scope.format, function(v, k) {
            if (!valueList[k - i]) return; //return newForamt.push(v);
            if (v != "-") {
              newForamt.push(valueList[k - i]);
            } else {
              i++
              newForamt.push(v);
            }
          })
          if ($scope.dom.selectionStart || $scope.dom.selectionStart == '0') {
            var iCaretPos = $scope.dom.selectionStart;
            console.log(iCaretPos);
          }
          if ($scope.dom.selectionStart) {
            var str = $scope.tostr(newForamt);
            var lastStr = $scope.tostr($scope.format.slice(str.length, -1));
            $scope.dom.value = $scope.tostr(newForamt);
            //$scope.dom.value = $scope.dom.value + "12";
            console.log($scope.format[iCaretPos]);
            if ($scope.format[iCaretPos - 1] == '-') iCaretPos = iCaretPos + 1;
            $scope.dom.setSelectionRange(iCaretPos, iCaretPos)
          }
          // 对象数组两个一一对应添加
          //   ["_", "_", "_", "-", "_", "_", "_", "-", "_", "_", "_", "-", "_"]
          //   ['1', '2']
        };
        $scope.setPosition = function(iCaretPos) {

          }
          // $scope.$watch('value', function(newValue, oldValue) {
          //   console.log(newValue);
          //   $scope.$parent[$scope.linkname] = newValue;
          //   if ($scope.dom.selectionStart || $scope.dom.selectionStart == '0') {
          //     iCaretPos = $scope.dom.selectionStart;
          //     console.log(iCaretPos);
          //   }
          //   if ($scope.dom.selectionStart) {
          //     $scope.dom.focus();
          //     $scope.dom.setSelectionRange(1, 1);
          //   }
          // });
        $scope.tostr = function(arr) {
          return arr.toString().replace(/[,]/g, "");
        }
        $scope.newValue = function() {
          $scope.format.replace(/9/g, "_");
        }
      }
    }
  });

  // function InputMask() {
  //   console.log("this");
  //   return {
  //     restrict: 'E',
  //     template: '<input type="text" placeholder="ISBN" id="lai" class="form-control" ng-keyup="keyup($event)">',
  //     replace: true
  //   }
  // }
})(window, window.angular);