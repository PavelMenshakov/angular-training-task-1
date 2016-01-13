
var app = angular.module('taskOne', []);

app.controller('appController', ['$scope', function($scope) {
	$scope.master = {};		//master model in scope
	$scope.masterFields = []; //array of master model fields 
	
	$scope.update = function(user) { //form update method
		$scope.master = angular.copy(user);
	};

	$scope.reset = function() {
		$scope.user = {};
	};

	$scope.$watchCollection('master', function() {   //watch for master model changes
		$scope.masterFields = $.map($scope.master, function(value, name) {
			return [name + ': ' + value];
		});
	});
	
	$scope.reset();
}]);

app.directive('userName', function () {		//create directive for user name validation
	var USER_REGEXP = new RegExp('([A-Z]{1}[a-z]{2,20}$)|(([A-Z]{1}[a-z]{2,20})\s+([A-Z]{1}[a-z]{2,20}$))'),
		isValid = function(s) {
			return (USER_REGEXP.test(s));
		};

	return {
		require:'ngModel',
		link:function (scope, elm, attrs, ngModelCtrl) {

			ngModelCtrl.$parsers.unshift(function (viewValue) {    //view validation
				ngModelCtrl.$setValidity('userName', ngModelCtrl.$isEmpty(viewValue) || isValid(viewValue));
				return viewValue;
			});

			ngModelCtrl.$formatters.unshift(function (modelValue) { //model validation
				ngModelCtrl.$setValidity('userName', ngModelCtrl.$isEmpty(modelValue) ||  isValid(modelValue));
				return modelValue;
			});
		}
	};
});
	
app.directive('ageValidation', function () {   //create directive for age validation
	return {
		require:'ngModel',
		link:function (scope, elm, attrs, ngModelCtrl) {

			ngModelCtrl.$parsers.unshift(function (viewValue) {		//view validation
				ngModelCtrl.$setValidity('ageValidation',  
					ngModelCtrl.$isEmpty(viewValue) || (viewValue > 18 && viewValue < 65));
				return viewValue;
			});

			ngModelCtrl.$formatters.unshift(function (modelValue) {  //model validation
				ngModelCtrl.$setValidity('ageValidation', 
					ngModelCtrl.$isEmpty(modelValue) || (modelValue > 18 && modelValue < 65));
				return modelValue;
			});
		}
	};
});
	
app.directive('dateValidation', function () {   //create directive for date validation
	var DATE_REGEXP = new RegExp('[1-9]{2,4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}'),
		isValid = function(s) {
			return (DATE_REGEXP.test(s));
		};

	return {
		require:'ngModel',
		link:function (scope, elm, attrs, ngModelCtrl) {

			ngModelCtrl.$parsers.unshift(function (viewValue) {		//view validation
				ngModelCtrl.$setValidity('dateValidation', 
					ngModelCtrl.$isEmpty(viewValue) || isValid(viewValue));
				return viewValue;
			});

			ngModelCtrl.$formatters.unshift(function (modelValue) {  //model validation
				ngModelCtrl.$setValidity('dateValidation', 
					ngModelCtrl.$isEmpty(modelValue) || isValid(modelValue));
				return modelValue;
			});
		}
	};
});

app.directive('emailValidation', function() {  // email validation
	var EMAIL_REGEXP = new RegExp('[a-zA-Z]@epam\.com$'),
		isValid = function(s) {
			return (EMAIL_REGEXP.test(s));
		};
	return {
            require:'ngModel',
            link:function (scope, elm, attrs, ngModelCtrl) {

                ngModelCtrl.$parsers.unshift(function (viewValue) {		//view validation
                    ngModelCtrl.$setValidity('dateValidation', 
						ngModelCtrl.$isEmpty(viewValue) || isValid(viewValue));
                    return viewValue;
                });

                ngModelCtrl.$formatters.unshift(function (modelValue) {  //model validation
                    ngModelCtrl.$setValidity('dateValidation', 
						ngModelCtrl.$isEmpty(modelValue) || isValid(modelValue));
                    return modelValue;
                });
            }
        };
});