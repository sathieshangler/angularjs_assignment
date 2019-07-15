mainApp.directive('fileModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    if (element[0].files.length) {
                        // if(scope.video.fileType == 1) {
                        if (element[0].files[0].type == "video/mp4") {
                            modelSetter(scope, element[0].files[0]);
                            scope.invalidMedia = false;
                        }
                        // else{
                        //     scope.alerts.push({ type: 'danger', msg: 'Invalid file format, Please choose .mp4 video' });
                        // }
                        //  }
                        // else if(scope.video.fileType == 2) {
                        else if (element[0].files[0].type == "audio/mp3" || element[0].files[0].type == "audio/wav") {
                            modelSetter(scope, element[0].files[0]);
                            scope.invalidMedia = false;
                        } else {
                            scope.invalidMedia = true;
                        }
                        //}
                    }
                });
            });
        }
    };
}]);

mainApp.directive('imageModel', ['$parse', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.imageModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

mainApp.directive('compareTo', function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});
mainApp.directive('compile', function($compile) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            element.append($compile(attr.compile)(scope));
        }
    }
})


mainApp.directive('autoResize', function($timeout) {
    return {
        restrict: 'A',
        link: function autoResizeLink(scope, element, attributes, controller) {

            element.css({ 'height': 'auto', 'overflow-y': 'auto' });
            $timeout(function() {
                element.css('height', element[0].scrollHeight + 'px');
            }, 100);

            element.on('input', function() {
                element.css({ 'height': 'auto', 'overflow-y': 'auto' });
                element.css('height', element[0].scrollHeight + 'px');

            });
        }

    }
});

mainApp.directive('translate', function($rootScope,$filter, $parse) {
    return {
        priority: 1,
        restrict: 'A',
        scope: {
            translateAttrAriaLabel: '@?', //?bind
            translateAttrPlaceholder: '<?',
            translateAttrTitle: '<?'
        },
        link: function(scope, element, attr) {

            if (attr.translateAttrPlaceholder) { //REPLACE PLACEHOLDER VALUE WITH LABEL
                var placeholderKey = attr.translateAttrPlaceholder;
                var placeholderValue = [];

                var getter = $parse(attr.translateAttrPlaceholder)(scope.$parent);
                if (getter || false) {
                    placeholderKey = $parse(attr.translateAttrPlaceholder)(scope.$parent);
                }

                if (($rootScope.LableList || []).length > 0) {
                    placeholderValue = $filter("filter")($rootScope.LableList, {
                        key: placeholderKey
                    }, true)
                }
                if(placeholderValue.length) {
                    element.context.placeholder = placeholderValue[0].alias ? placeholderValue[0].alias : placeholderValue[0].default;
                }
                return;
            }
            if (attr.translateAttrTitle) { //REPLACE PLACEHOLDER VALUE WITH LABEL
                var placeholderKey = attr.translateAttrTitle;
                var placeholderValue = [];

                var getter = $parse(attr.translateAttrTitle)(scope.$parent);
                if (getter || false) {
                    placeholderKey = $parse(attr.translateAttrTitle)(scope.$parent);
                }

                if (($rootScope.LableList || []).length > 0) {
                    placeholderValue = $filter("filter")($rootScope.LableList, {
                        key: placeholderKey
                    }, true)
                }
                if(placeholderValue.length) {
                    element.context.title = placeholderValue[0].alias ? placeholderValue[0].alias : placeholderValue[0].default;
                }
                return;
            }


            var key = attr.translateAttrAriaLabel;
            var result = [];

            / In some case we need to submit keys through js object  /
            var getter = $parse(attr.translateAttrAriaLabel)(scope.$parent);
            if (getter || false) {
                key = $parse(attr.translateAttrAriaLabel)(scope.$parent);
            }

            if (($rootScope.LableList || []).length > 0) {
                result = $filter("filter")($rootScope.LableList, {
                    key: key
                }, true)
            }
            // Update the Dom element with key
            if(result.length) {
                element.html(result[0].alias ? result[0].alias : result[0].default);
            }
        }
    };
});
mainApp.directive('floatToInt', function () {
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ctrl) {

          //  var dateFormat = attrs['date'] || 'yyyy-MM-dd';
           
            ctrl.$formatters.unshift(function (modelValue) {
                return parseInt(modelValue)
            });
        }
    };
})